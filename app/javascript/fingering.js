import { Text, Rect, Image, Group, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";
import { generateDot } from "./generateDot.js";

export default class Fingering {
  static titleHeight = 100;
  static fretboardHeight = 250;
  // containerの最大幅1320pxからx方向のpadding 12px * 2 を引いた幅
  static stageWidth = 1296;

  constructor(title = "", fingeringCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(fingeringCode);
    this.stage = this.#initializeStage();
  }

  createFretboards(fingeringCode) {
    const fretboards = [];
    fingeringCode.forEach((e) => {
      const fretboard = new Fretboard(e);
      fretboards.push(fretboard);
    });
    return fretboards;
  }

  addKonvaObjectsToLayer(KonvaObjects) {
    let layer = this.stage.getChildren()[0];
    layer.destroyChildren();
    const titleText = this.#generateTitleText();
    layer.add(titleText);
    KonvaObjects.forEach((obj) => {
      layer.add(obj);
    });
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
      this.addDotDestroyEvent(fretboardGroup);
      this.addClickableArea(fretboardGroup);
    });
  }

  addDotDestroyEvent(fretboardGroup) {
    const dotContainers = fretboardGroup.getChildren((node) => {
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

  addClickableArea(fretboardGroup) {
    const dotContainers = fretboardGroup.getChildren((node) => {
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
          const newDot = generateDot(
            dotContainer.attrs.dotProperty,
            Fretboard.currentColor,
          );
          newDot.on("click", () => {
            dot.destroy();
          });
          dotContainer.add(newDot);
        }
      });
      dotContainer.add(clickableArea);
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
}
