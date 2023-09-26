import { Controller } from "@hotwired/stimulus";
import Fingering from "../fingering.js";

export default class extends Controller {
  static targets = [
    "title",
    "startFret",
    "endFret",
    "output",
    "fretWidthErrorMessage",
    "appendFretboardButton",
  ];
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
    this.render();
    document
      .getElementById("fingeringContainer")
      .addEventListener("fretboardDeleted", () => {
        this.updateFingeringCode();
        this.render();
      });
  }

  render() {
    this.updateTitle();
    this.fingering.setStageHeight();
    const fretboardGroups = this.fingering.generateFretboardGroups();
    this.fingering.addClickEvent(fretboardGroups, this.fingeringCode);
    this.fingering.addDeleteButton(fretboardGroups);
    this.fingering.render(fretboardGroups);
  }

  updateTitle() {
    this.fingering.title = this.titleTarget.value;
  }

  appendFretboard() {
    this.updateFingeringCode();
    this.#appendFretboardCode();
    this.fingeringCodeValue = this.fingering.fingeringCode;
    this.fingering.fretboards = this.fingering.createFretboards(
      this.fingeringCodeValue,
    );
    this.render();
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

  #appendFretboardCode() {
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

  updateDotColor(event) {
    this.dotColorValue = event.currentTarget.id;
  }

  dotColorValueChanged() {
    this.fingering.setDotColor(this.dotColorValue);
  }

  validateFretWidth() {
    const startFretNumber = parseInt(this.startFretTarget.value);
    const endFretNumber = parseInt(this.endFretTarget.value);
    const errorMessage = this.fretWidthErrorMessageTarget;
    const appendFretboardButton = this.appendFretboardButtonTarget;
    if (endFretNumber < startFretNumber) {
      this.displayFretWidthError(
        appendFretboardButton,
        errorMessage,
        "終端フレットは開始フレット以上の値にしてください",
      );
    } else if (endFretNumber - startFretNumber > 11) {
      this.displayFretWidthError(
        appendFretboardButton,
        errorMessage,
        "指板の幅は12フレット以下にしてください",
      );
    } else {
      appendFretboardButton.removeAttribute("disabled");
      errorMessage.classList.remove("invalid-feedback", "mb-3");
      errorMessage.innerHTML = "";
    }
  }

  displayFretWidthError(disabledTarget, messageTarget, message) {
    disabledTarget.setAttribute("disabled", "");
    messageTarget.classList.add("invalid-feedback", "mb-3");
    messageTarget.style.display = "block";
    messageTarget.textContent = message;
  }
}
