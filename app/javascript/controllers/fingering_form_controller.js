import { Controller } from "@hotwired/stimulus";
import Fingering from "../fingering.js";

export default class extends Controller {
  static targets = [
    "title",
    "startFret",
    "endFret",
    "fingeringCode",
    "fretWidthErrorMessage",
    "appendFretboardButton",
  ];
  static values = {
    fingeringCode: [],
    dotColor: { type: String, default: "#555555" },
  };

  initialize() {
    this.fingering = new Fingering(
      this.titleTarget.value,
      this.fingeringCodeTarget.value
        ? JSON.parse(this.fingeringCodeTarget.value)
        : [],
    );
    this.render();
    document
      .getElementById("fingeringContainer")
      .addEventListener("fretboardDeleted", () => {
        this.updateFingeringCode();
        this.render();
      });
  }

  render() {
    this.#updateTitle();
    this.fingering.setStageHeight();
    const fretboardGroups = this.fingering.generateFretboardGroups();
    this.fingering.addClickEvent(fretboardGroups);
    this.fingering.addDeleteButton(fretboardGroups);
    this.fingering.addShowColorPickerArea(fretboardGroups);
    this.fingering.addKonvaObjectsToLayer(fretboardGroups);
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
    if (this.fingering.fretboards.length === 0) return;
    const newFingeringCode = this.#generateNewFingeringCode();
    this.fingeringCodeValue = this.fingering.fingeringCode = newFingeringCode;
    this.fingeringCodeTarget.value = JSON.stringify(this.fingeringCodeValue);
    this.fingering.fretboards = this.fingering.createFretboards(
      this.fingeringCodeValue,
    );
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

    if (endFretNumber < startFretNumber) {
      this.#displayFretWidthError(
        "終端フレットは開始フレット以上の値にしてください",
      );
    } else if (endFretNumber - startFretNumber > 11) {
      this.#displayFretWidthError("指板の幅は12フレット以下にしてください");
    } else {
      this.#clearFretWidthError();
    }
  }

  #updateTitle() {
    this.fingering.title = this.titleTarget.value;
  }

  #generateNewFingeringCode() {
    const fretboardGroups = this.fingering.stage
      .getLayers()[0]
      .getChildren((node) => {
        return node.hasName("fretboard");
      });

    return fretboardGroups.map((fretboardGroup, i) => {
      const dotContainers = fretboardGroup.getChildren((node) => {
        return node.hasName("dotContainer");
      });
      const dots = dotContainers
        .map((dotContainer) => {
          return dotContainer.getChildren((node) => {
            return node.hasName("dot");
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
        startFret: fretboardGroup.attrs.startFret,
        endFret: fretboardGroup.attrs.endFret,
        dots: dotCodes,
      };
      return fretboardCode;
    });
  }

  #appendFretboardCode() {
    const fretboardCode = {
      startFret: parseInt(this.startFretTarget.value),
      endFret: parseInt(this.endFretTarget.value),
      position: this.fingering.fingeringCode
        ? this.fingering.fingeringCode.length + 1
        : 1,
    };
    this.fingering.fingeringCode = (this.fingering.fingeringCode || []).concat(
      fretboardCode,
    );
  }

  #displayFretWidthError(message) {
    this.appendFretboardButtonTarget.setAttribute("disabled", "");
    this.fretWidthErrorMessageTarget.classList.add("invalid-feedback", "mb-3");
    this.fretWidthErrorMessageTarget.style.display = "block";
    this.fretWidthErrorMessageTarget.textContent = message;
  }

  #clearFretWidthError() {
    this.appendFretboardButtonTarget.removeAttribute("disabled");
    this.fretWidthErrorMessageTarget.classList.remove(
      "invalid-feedback",
      "mb-3",
    );
    this.fretWidthErrorMessageTarget.innerHTML = "";
  }
}
