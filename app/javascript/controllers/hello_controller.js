import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["name", "output"];

  greet() {
    const fretboardCode = JSON.stringify(this.generateFretboardCode());
    this.outputTarget.value = `${fretboardCode}`;
  }

  generateFretboardCode() {
    const fretboardCode = {
      id: 1,
      position: 1,
      start_fret: 1,
      end_fret: 6,
      dots: [
        {
          fret: 3,
          guitarString: 5,
          color: "red",
        },
        {
          fret: 1,
          guitarString: 3,
          color: "black",
        },
      ],
    };
    return fretboardCode;
  }
}
