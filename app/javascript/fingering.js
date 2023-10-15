import { Text, Rect, Circle, Image, Group, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";
import { generateDot } from "./generateDot.js";

export default class Fingering {
  static titleHeight = 100;
  static fretboardHeight = 250;
  // containerの最大幅1320pxからx方向のpadding 12px * 2 を引いた幅
  static stageWidth = 1296;
  static dotColors = [
    "#555555",
    "#C7243A",
    "#EDAD0B",
    "#A4C520",
    "#009250",
    "#007FB1",
    "#5D639E",
  ];

  constructor(title = "", fingeringCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(fingeringCode);
    this.stage = this.#initializeStage();
  }

  createFretboards(fingeringCode) {
    return fingeringCode.map((code) => new Fretboard(code));
  }

  addKonvaObjectsToLayer(KonvaObjects) {
    const layer = this.stage.getChildren()[0];
    layer.destroyChildren();
    layer.add(this.#generateTitleText());
    KonvaObjects.forEach((obj) => layer.add(obj));
    // KonvaObjectsより手前に配置しないとcolorpickerをクリックできないため最後に追加する
    const colorPicker = this.#generateColorPicker();
    layer.add(colorPicker);
  }

  generateFretboardGroups() {
    const fretboardGroups = this.fretboards.map((fretboard) => {
      return fretboard.generateFretboardGroup();
    });

    return fretboardGroups;
  }

  setStageHeight() {
    const stageHeight =
      Fingering.titleHeight +
      Fingering.fretboardHeight * this.fretboards.length;
    this.stage.height(stageHeight);
  }

  addClickEvent(fretboardGroups) {
    fretboardGroups.forEach((fretboardGroup) => {
      const dotContainers = this.#getChildrenByName(
        fretboardGroup,
        "dotContainer",
      );
      this.#addDotDestroyEvent(dotContainers);
      this.#addClickableArea(dotContainers);
    });
  }

  addDeleteButton(fretboardGroups) {
    fretboardGroups.forEach((fretboardGroup) => {
      const button = new Group({
        name: "deleteButton",
        x: 157 + 100 * (fretboardGroup.attrs.fretNumbers.length - 1),
        y: Fretboard.referencePoint + Fretboard.guitarStringSpacing * 4,
        width: 30,
        height: 30,
      });

      Image.fromURL("/trash-fill.svg", (imageNode) => {
        button.add(imageNode);
        imageNode.setAttrs({
          width: 30,
          height: 30,
        });
        button.on("click", () => {
          const deleteEvent = new CustomEvent("fretboardDeleted", {
            bubbles: true,
          });
          fretboardGroup.destroy();
          document
            .getElementById("fingeringContainer")
            .dispatchEvent(deleteEvent);
        });
      });
      fretboardGroup.add(button);
    });
  }

  setDotColor(color) {
    Fretboard.currentColor = color;
  }

  #initializeStage() {
    const height = Fingering.titleHeight + Fingering.fretboardHeight;
    const stage = new Stage({
      container: "fingeringContainer",
      width: Fingering.stageWidth,
      height: height,
    });
    const layer = new Layer();
    stage.add(layer);

    return stage;
  }

  #addDotDestroyEvent(dotContainers) {
    const dots = dotContainers
      .map((node) => this.#getChildrenByName(node, "dot"))
      .filter((v) => v.length)
      .flat();
    dots.forEach((dot) => {
      this.#bindDestroyEventToDot(dot);
    });
  }

  #addClickableArea(dotContainers) {
    dotContainers.forEach((dotContainer) => {
      const clickableArea = new Rect({
        width: 100,
        height: 30,
      });
      clickableArea.on("click", () =>
        this.#handleClickableAreaEvent(dotContainer),
      );
      dotContainer.add(clickableArea);
    });
  }

  #handleClickableAreaEvent(dotContainer) {
    const dot = this.#getChildrenByName(dotContainer, "dot");
    if (dot.length) {
      dot[0].destroy();
    } else {
      const newDot = generateDot(
        dotContainer.attrs.dotProperty,
        Fretboard.currentColor,
      );
      this.#bindDestroyEventToDot(newDot);
      dotContainer.add(newDot);
    }
  }

  #bindDestroyEventToDot(dot) {
    dot.on("click", () => {
      dot.destroy();
    });
  }

  #generateTitleText() {
    const titleText = new Text({
      text: this.title,
      fontSize: 40,
      y: 20,
      width: Fingering.stageWidth,
      align: "center",
    });
    return titleText;
  }

  #generateColorPicker() {
    const colorPicker = new Group({
      name: "colorPicker",
      x: Fretboard.referencePoint,
      visible: false,
    });
    this.#bindShowEventsToColorPicker(colorPicker);
    this.#addColorButtonsToPicker(colorPicker);
    return colorPicker;
  }

  #bindShowEventsToColorPicker(colorPicker) {
    colorPicker.on("mouseenter", () => {
      colorPicker.show();
    });
  }

  #addColorButtonsToPicker(colorPicker) {
    Fingering.dotColors.forEach((color, i) => {
      const button = this.#generateColorButton(color, i);
      colorPicker.add(button);
    });
  }

  #generateColorButton(color, index) {
    const columnWidth = 45;
    const colorButton = new Circle({
      x: 20 + columnWidth * index,
      radius: 18,
      fill: color,
      stroke: `${color === Fretboard.currentColor ? "blue" : color}`,
    });
    this.#bindMouseEventsToColorButton(colorButton, color);
    return colorButton;
  }

  #bindMouseEventsToColorButton(colorButton, color) {
    this.#bindCursorStyleEvents(colorButton);

    colorButton.on("click", () => {
      Fretboard.currentColor = color;

      const parent = colorButton.getParent();
      if (parent) {
        const colorButtons = parent.getChildren();
        // 枠線のリセット
        colorButtons.forEach((button) => {
          button.stroke(button.fill());
        });
      }
      colorButton.stroke("blue");
    });
  }

  addShowColorPickerArea(fretboardGroups) {
    fretboardGroups.forEach((fretboardGroup) => {
      const showColorPickerArea = this.#createShowColorPickerArea();
      this.#bindMouseEventsToFretboardGroup(fretboardGroup);
      fretboardGroup.add(showColorPickerArea);
      showColorPickerArea.setZIndex(0);
    });
  }

  #createShowColorPickerArea() {
    return new Rect({
      name: "showColorPickerArea",
      width: 1200,
      height: 250,
    });
  }

  #bindMouseEventsToFretboardGroup(fretboardGroup) {
    fretboardGroup.on("mouseenter", () => {
      const colorPicker = this.#getColorPicker(fretboardGroup);
      this.#setColorPickerPosition(colorPicker, fretboardGroup);
      colorPicker.show();
    });
    fretboardGroup.on("mouseleave", () => {
      const colorPicker = this.#getColorPicker(fretboardGroup);
      colorPicker.hide();
    });
  }

  #getColorPicker(group) {
    return this.#getChildrenByName(group.getParent(), "colorPicker")[0];
  }

  #setColorPickerPosition(colorPicker, fretboardGroup) {
    const y = fretboardGroup.y() + 220;
    colorPicker.y(y);
  }

  #getChildrenByName(parent, name) {
    return parent.getChildren((node) => node.hasName(name));
  }

  #bindCursorStyleEvents(element) {
    element.on("mouseenter", () => {
      document.body.style.cursor = "pointer";
    });
    element.on("mouseleave", () => {
      document.body.style.cursor = "default";
    });
  }
}
