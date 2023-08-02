import { Controller } from "@hotwired/stimulus";
import Score from "../score.js";
// Connects to data-controller="score"
export default class extends Controller {
  static targets = ["title", "scoreCode"];

  initialize() {
    this.score = new Score(
      this.titleTarget.textContent,
      JSON.parse(this.scoreCodeTarget.textContent)
    );
    this.draw();
  }

  draw() {
    this.score.draw();
  }
}
