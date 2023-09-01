import { Controller } from "@hotwired/stimulus";
import Fingering from "../fingering.js";

export default class extends Controller {
  static targets = ["title", "fingeringCode"];

  initialize() {
    this.fingering = new Fingering(
      this.titleTarget.textContent,
      JSON.parse(this.fingeringCodeTarget.textContent),
    );
    this.draw();
  }

  draw() {
    const fretboardShapes = this.fingering.buildFretboardShapes();
    this.fingering.setStageHeight();
    this.fingering.draw(fretboardShapes);
  }
}
