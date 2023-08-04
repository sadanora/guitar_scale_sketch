import { Text, Group, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";

export default class Score {
  constructor(title = "", scoreCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(scoreCode);
    this.stage = this.#generateStage();
  }

  draw() {
    let layer = this.stage.getChildren()[0];
    layer.destroyChildren();
    const title = this.#createTitle();
    layer.add(title);

    this.fretboards.map((fretboard) => {
      layer.add(fretboard.draw());
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

  createFretboards(scoreCode) {
    const fretboards = [];
    // this.fretboards = [];
    scoreCode.forEach((e) => {
      const fretboard = new Fretboard(e);
      fretboards.push(fretboard);
    });
    return fretboards;
  }

  #generateStage() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;
    const height = width * Math.sqrt(2);
    const stage = new Stage({
      container: "scoreContainer",
      width: width,
      height: height,
    });
    const layer = new Layer();
    stage.add(layer);

    return stage;
  }

  #createTitle() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;
    const titleContainer = new Group({
      name: "title",
    });
    const title = new Text({
      text: this.title,
      fontSize: 24,
      y: 20,
      width: width,
      align: "center",
    });
    titleContainer.add(title);
    return titleContainer;
  }

  setDotColor(color) {
    Fretboard.currentColor = color;
  }
}
