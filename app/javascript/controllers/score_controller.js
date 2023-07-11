import { Controller } from "@hotwired/stimulus";
import Score from "../score.js";
// Connects to data-controller="score"
export default class extends Controller {
  static targets = ["title", "startFret", "endFret", "output"];
  static values = { scoreCode: [] };

  initialize() {
    this.score = new Score(this.titleTarget.value, this.scoreCodeValue);
    document
      .getElementById("scoreContainer")
      .addEventListener("fretboardDeleted", (e) => {
        this.updateScoreCode();
        this.draw();
      });
  }

  addFretboard() {
    if (this.score.stage) {
      this.updateScoreCode();
      this.score.stage.clear();
    }

    const newFretboardCode = {
      startFret: parseInt(startFret.value),
      endFret: parseInt(endFret.value),
    };

    if (!this.score.scoreCode) {
      newFretboardCode.position = 1;
      this.score.scoreCode = [newFretboardCode];
    } else {
      newFretboardCode.position = this.score.scoreCode.length + 1;
      this.score.scoreCode.push(newFretboardCode);
    }
    this.scoreCodeValue = this.score.scoreCode;

    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);

    this.draw();
  }

  draw() {
    this.fetchTitle();
    this.score.draw();
  }

  updateScoreCode() {
    const newScoreCode = [];

    const fretboards = this.score.stage.children.filter(this.findFretboard);
    fretboards.map((e, i) => {
      if (e.attrs.kinds === "fretboard") {
        const visibleDots = e.children.filter(this.findVisibleDot);

        const dots = visibleDots.map((visibleDot) => ({
          fill: visibleDot.attrs.fill,
          fret: visibleDot.attrs.fret,
          guitarString: visibleDot.attrs.guitarString,
        }));

        const fretboardCode = {
          position: i + 1,
          startFret: e.attrs.startFret,
          endFret: e.attrs.endFret,
          dots: dots,
        };
        newScoreCode.push(fretboardCode);
      }
    });
    this.scoreCodeValue = newScoreCode;
    this.score.scoreCode = this.scoreCodeValue;
    this.outputTarget.value = JSON.stringify(this.scoreCodeValue);
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
  }

  findVisibleDot(obj) {
    return obj.className === "Circle" && obj.visible() ? true : false;
  }

  findFretboard(obj) {
    return obj.attrs.kinds === "fretboard";
  }

  fetchTitle() {
    this.score.title = this.titleTarget.value;
  }
}
