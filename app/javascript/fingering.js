import { Text, Rect, Circle, Image, Group, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";

export default class Fingering {
  static titleHeight = 100;
  static fretboardHeight = 250;
  // containerの最大幅1320pxからx方向のpadding 12px * 2 を引いた幅
  static stageWidth = 1296;

  constructor(title = "", fingeringCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(fingeringCode);
    this.stage = this.#generateStage();
  }

  buildFretboardShapes() {
    const fretboardShapes = this.fretboards.map((fretboard) => {
      return fretboard.build();
    });

    return fretboardShapes;
  }

  draw(fretboardArray) {
    let layer = this.stage.getChildren()[0];
    layer.destroyChildren();
    const title = this.#createTitle();
    layer.add(title);
    fretboardArray.forEach((f) => {
      layer.add(f);
    });
  }

  createFretboard(startFret, endFret, position) {
    const fretboardCode = {
      startFret: startFret,
      endFret: endFret,
      position: position,
    };
    const fretboard = new Fretboard(fretboardCode);
    this.fretboards.push(fretboard);
  }

  createFretboards(fingeringCode) {
    const fretboards = [];
    fingeringCode.forEach((e) => {
      const fretboard = new Fretboard(e);
      fretboards.push(fretboard);
    });
    return fretboards;
  }

  #generateStage() {
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

  setStageHeight() {
    const stageHeight =
      Fingering.titleHeight +
      Fingering.fretboardHeight * this.fretboards.length;
    this.stage.height(stageHeight);
  }

  #createTitle() {
    const titleContainer = new Group({
      name: "title",
    });
    const title = new Text({
      text: this.title,
      fontSize: 40,
      y: 20,
      width: Fingering.stageWidth,
      align: "center",
    });
    titleContainer.add(title);
    return titleContainer;
  }

  addClickEvent(fretboardShapes) {
    fretboardShapes.forEach((fretboardShape) => {
      this.addDotDestroyEvent(fretboardShape);
      this.addClickableArea(fretboardShape);
    });
  }

  addDotDestroyEvent(fretboardShape) {
    const dotContainers = fretboardShape.getChildren((node) => {
      return node.hasName("dotContainer");
    });
    const dots = dotContainers
      .map((node) => {
        return node.getChildren((node) => {
          return node.hasName("dot");
        });
      })
      .filter((v) => v.length)
      .flat();
    dots.forEach((dot) => {
      dot.on("click", () => {
        dot.destroy();
      });
    });
  }

  #createDot(dotProperty) {
    const dot = new Circle({
      name: "dot",
      x: dotProperty.x,
      y: dotProperty.y,
      radius: dotProperty.radius,
      fill: Fretboard.currentColor,
      fret: dotProperty.fret,
      guitarString: dotProperty.guitarString,
    });
    dot.on("click", () => {
      dot.destroy();
    });
    return dot;
  }

  addClickableArea(fretboardShape) {
    const dotContainers = fretboardShape.getChildren((node) => {
      return node.hasName("dotContainer");
    });
    // clickableAreaの追加
    dotContainers.forEach((dotContainer) => {
      const clickableArea = new Rect({
        width: 100,
        height: 30,
      });
      // dotの追加、削除を行うイベント
      clickableArea.on("click", () => {
        // dotを取得
        const dot = dotContainer.getChildren((node) => {
          return node.hasName("dot");
        });
        // dotがあれば削除、なければ追加する
        if (dot.length) {
          dot[0].destroy();
        } else {
          dotContainer.add(this.#createDot(dotContainer.attrs.dotProperty));
        }
      });
      dotContainer.add(clickableArea);
    });
  }

  addDeleteButton(fretboardArray) {
    fretboardArray.forEach((fretboard) => {
      const button = new Group({
        name: "deleteButton",
        x: 157 + 100 * (fretboard.attrs.fretNumbers.length - 1),
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
          fretboard.destroy();
          document
            .getElementById("fingeringContainer")
            .dispatchEvent(deleteEvent);
        });
      });
      fretboard.add(button);
    });
  }

  setDotColor(color) {
    Fretboard.currentColor = color;
  }
}
