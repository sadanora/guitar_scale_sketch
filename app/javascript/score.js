import { Text, Group, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";

export default class Score {
  constructor(title = "", scoreCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(scoreCode);
  }

  draw() {
    this.stage = this.#generateStage();
    const layer = new Layer();
    this.stage.add(layer);
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
    return stage;
  }

  #createTitle() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;
    const titleContainer = new Group({
      kinds: "title",
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
