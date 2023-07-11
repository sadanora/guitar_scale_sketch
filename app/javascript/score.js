import { Text, Layer, Stage } from "konva";
import Fretboard from "./fretboard.js";

export default class Score {
  constructor(title = "", scoreCode = []) {
    this.title = title;
    this.fretboards = this.createFretboards(scoreCode);
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

  draw() {
    this.stage = this.generateStage();
    const title = this.createTitle();

    this.fretboards.map((e) => {
      const renderdFretboard = e.render();
      this.stage.add(renderdFretboard);
      this.stage.add(title);
    });
  }

  generateStage() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;
    const height = window.innerHeight;
    const stage = new Stage({
      container: "scoreContainer",
      width: width,
      height: height,
    });
    return stage;
  }

  createFretboards(scoreCode) {
    const fretboards = [];
    scoreCode.forEach((e) => {
      const fretboard = new Fretboard(e);
      fretboards.push(fretboard);
    });
    return fretboards;
  }

  createTitle() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;

    const layer = new Layer({
      kinds: "title",
    });
    const text = new Text({
      text: this.title,
      fontSize: 24,
      y: 20,
      width: width,
      align: "center",
    });
    layer.add(text);
    return layer;
  }
}
