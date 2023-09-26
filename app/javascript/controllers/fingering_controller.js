import { Controller } from "@hotwired/stimulus";
import Fingering from "../fingering.js";

export default class extends Controller {
  static targets = ["title", "fingeringCode"];

  initialize() {
    this.fingering = new Fingering(
      this.titleTarget.textContent,
      JSON.parse(this.fingeringCodeTarget.textContent),
    );
    this.render();
  }

  render() {
    const fretboardGroups = this.fingering.generateFretboardGroups();
    this.fingering.setStageHeight();
    this.fingering.render(fretboardGroups);
  }
}
