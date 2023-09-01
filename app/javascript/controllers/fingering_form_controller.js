import { Controller } from "@hotwired/stimulus";
import Fingering from "../fingering.js";

export default class extends Controller {
  static targets = ["title", "startFret", "endFret", "output"];
  static values = {
    fingeringCode: [],
    dotColor: { type: String, default: "#555555" },
  };

  initialize() {
    if (this.outputTarget.value) {
      this.fingering = new Fingering(
        this.titleTarget.value,
        JSON.parse(this.outputTarget.value),
      );
    } else {
      this.fingering = new Fingering(this.titleTarget.value);
    }
    this.draw();
    document
      .getElementById("fingeringContainer")
      .addEventListener("fretboardDeleted", () => {
        this.updateFingeringCode();
        this.draw();
      });
  }

  addFretboard() {
    this.updateFingeringCode();
    this.#addFretboardCode();
    this.fingeringCodeValue = this.fingering.fingeringCode;
    this.fingering.fretboards = this.fingering.createFretboards(
      this.fingeringCodeValue,
    );
    this.draw();
  }

  #addFretboardCode() {
    const fretboardCode = {
      startFret: parseInt(this.startFretTarget.value),
      endFret: parseInt(this.endFretTarget.value),
    };
    if (!this.fingering.fingeringCode) {
      fretboardCode.position = 1;
      this.fingering.fingeringCode = [fretboardCode];
    } else {
      fretboardCode.position = this.fingering.fingeringCode.length + 1;
      this.fingering.fingeringCode.push(fretboardCode);
    }
  }

  updateFingeringCode() {
    if (this.fingering.fretboards.length === 0) {
      return;
    } else {
      const fretboards = this.fingering.stage
        .getLayers()[0]
        .getChildren((node) => {
          return node.hasName("fretboard");
        });
      const newFingeringCode = fretboards.map((fretboard, i) => {
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

      this.fingeringCodeValue = this.fingering.fingeringCode = newFingeringCode;
      this.outputTarget.value = JSON.stringify(this.fingeringCodeValue);
      this.fingering.fretboards = this.fingering.createFretboards(
        this.fingeringCodeValue,
      );
    }
  }

  draw() {
    this.fetchTitle();
    this.fingering.setStageHeight();
    const fretboardShapes = this.fingering.buildFretboardShapes();
    this.fingering.addClickEvent(fretboardShapes, this.fingeringCode);
    this.fingering.addDeleteButton(fretboardShapes);
    this.fingering.draw(fretboardShapes);
  }

  fetchTitle() {
    this.fingering.title = this.titleTarget.value;
  }

  fetchDotColor(event) {
    this.dotColorValue = event.currentTarget.id;
  }

  dotColorValueChanged() {
    this.fingering.setDotColor(this.dotColorValue);
  }
}
