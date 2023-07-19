import { Controller } from "@hotwired/stimulus";
import Score from "../score.js";
// Connects to data-controller="score"
export default class extends Controller {
  static targets = ["title", "startFret", "endFret", "output"];
  static values = {
    scoreCode: [],
    dotColor: { type: String, default: "#555555" },
  };

  initialize() {
    this.score = new Score(this.titleTarget.value, this.scoreCodeValue);
    document
      .getElementById("scoreContainer")
      .addEventListener("fretboardDeleted", () => {
        this.#updateScoreCode();
        this.draw();
      });
  }

  addFretboard() {
    if (this.score.stage) {
      this.#updateScoreCode();
    }
    this.#addFretboardCode();
    this.scoreCodeValue = this.score.scoreCode;
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
    this.draw();
  }

  #addFretboardCode() {
    const fretboardCode = {
      startFret: parseInt(startFret.value),
      endFret: parseInt(endFret.value),
    };
    if (!this.score.scoreCode) {
      fretboardCode.position = 1;
      this.score.scoreCode = [fretboardCode];
    } else {
      fretboardCode.position = this.score.scoreCode.length + 1;
      this.score.scoreCode.push(fretboardCode);
    }
  }

  #updateScoreCode() {
    const fretboards = this.score.stage.children[0].children.filter(
      this.#isFretboard
    );
    const newScoreCode = fretboards.map((fretboard, i) => {
      const dotContainers = fretboard.getChildren((node) => {
        return node.getClassName() === "Group";
      });
      const dots = dotContainers
        .map((dotContainer) => {
          return dotContainer.getChildren((node) => {
            return node.getClassName() === "Circle";
          });
        })
        .filter((v) => v.length)
        .flat();
      const dotCodes = dots.map((dotCode) => ({
        fill: dotCode.attrs.fill,
        fret: dotCode.attrs.fret,
        guitarString: dotCode.attrs.guitarString,
      }));
      const fretboardCode = {
        position: i + 1,
        startFret: fretboard.attrs.startFret,
        endFret: fretboard.attrs.endFret,
        dots: dotCodes,
      };
      return fretboardCode;
    });

    this.scoreCodeValue = newScoreCode;
    this.score.scoreCode = this.scoreCodeValue;
    this.outputTarget.value = JSON.stringify(this.scoreCodeValue);
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
  }

  #isFretboard(group) {
    return group.attrs.kinds === "fretboard";
  }

  draw() {
    this.fetchTitle();
    this.score.draw();
  }

  fetchTitle() {
    this.score.title = this.titleTarget.value;
  }

  setBlack() {
    this.dotColorValue = "#555555";
  }

  setRed() {
    this.dotColorValue = "#C7243A";
  }

  setYellow() {
    this.dotColorValue = "#EDAD0B";
  }

  setLightGreen() {
    this.dotColorValue = "#A4C520";
  }

  setGreen() {
    this.dotColorValue = "#009250";
  }

  setBlue() {
    this.dotColorValue = "#007FB1";
  }

  setViolet() {
    this.dotColorValue = "#5D639E";
  }

  dotColorValueChanged() {
    this.score.setDotColor(this.dotColorValue);
  }
}
