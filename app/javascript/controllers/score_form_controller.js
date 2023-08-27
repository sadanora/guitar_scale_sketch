import { Controller } from "@hotwired/stimulus";
import Score from "../score.js";

// Connects to data-controller="score-form"
export default class extends Controller {
  static targets = ["title", "startFret", "endFret", "output"];
  static values = {
    scoreCode: [],
    dotColor: { type: String, default: "#555555" },
  };

  initialize() {
    if (this.outputTarget.value) {
      this.score = new Score(
        this.titleTarget.value,
        JSON.parse(this.outputTarget.value),
      );
    } else {
      this.score = new Score(this.titleTarget.value);
    }
    this.draw();
    document
      .getElementById("scoreContainer")
      .addEventListener("fretboardDeleted", () => {
        this.updateScoreCode();
        this.draw();
      });
  }

  addFretboard() {
    this.updateScoreCode();
    this.#addFretboardCode();
    this.scoreCodeValue = this.score.scoreCode;
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
    this.draw();
  }

  #addFretboardCode() {
    const fretboardCode = {
      startFret: parseInt(this.startFretTarget.value),
      endFret: parseInt(this.endFretTarget.value),
    };
    if (!this.score.scoreCode) {
      fretboardCode.position = 1;
      this.score.scoreCode = [fretboardCode];
    } else {
      fretboardCode.position = this.score.scoreCode.length + 1;
      this.score.scoreCode.push(fretboardCode);
    }
  }

  updateScoreCode() {
    if (this.score.fretboards.length === 0) {
      return;
    } else {
      const fretboards = this.score.stage.getLayers()[0].getChildren((node) => {
        return node.hasName("fretboard");
      });
      const newScoreCode = fretboards.map((fretboard, i) => {
        const dotContainers = fretboard.getChildren((node) => {
          return node.hasName("dotContainer");
        });
        const dots = dotContainers
          .map((dotContainer) => {
            return dotContainer.getChildren((node) => {
              return node.getClassName() === "Circle";
            });
          })
          .filter((v) => v.length)
          .flat();
        const dotCodes = dots.map((dot) => ({
          fill: dot.attrs.fill,
          fret: dot.attrs.fret,
          guitarString: dot.attrs.guitarString,
        }));
        const fretboardCode = {
          position: i + 1,
          startFret: fretboard.attrs.startFret,
          endFret: fretboard.attrs.endFret,
          dots: dotCodes,
        };
        return fretboardCode;
      });

      this.scoreCodeValue = this.score.scoreCode = newScoreCode;
      this.outputTarget.value = JSON.stringify(this.scoreCodeValue);
      this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
    }
  }

  draw() {
    this.fetchTitle();
    this.score.setStageHeight();
    const fretboardShapes = this.score.buildFretboardShapes();
    this.score.addClickEvent(fretboardShapes, this.scoreCode);
    this.score.addDeleteButton(fretboardShapes);
    this.score.draw(fretboardShapes);
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
