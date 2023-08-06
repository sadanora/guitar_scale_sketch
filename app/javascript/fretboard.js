import { Text, Line, Circle, Group } from "konva";

export default class Fretboard {
  static referencePoint = 34;
  static guitarStringSpacing = 30;
  static fretDistance = 100;
  static black = "#555555";
  static currentColor = "";

  constructor(fretboardCode = {}) {
    this.position = fretboardCode.position;
    this.startFret = fretboardCode.startFret;
    this.endFret = fretboardCode.endFret;
    this.dots = fretboardCode.dots || [];
    this.fretNumbers = this.#generateFretNumbers(
      fretboardCode.startFret,
      fretboardCode.endFret
    );
  }

  build() {
    const fretboard = new Group({
      name: "fretboard",
      fretboardPosition: this.position,
      startFret: this.startFret,
      endFret: this.endFret,
      fretNumbers: this.fretNumbers,
      y: 100 + 200 * (this.position - 1),
    });
    const shapes = [
      this.#createFretNumberTexts(),
      this.#createFrets(),
      this.#createGuitarStrings(),
      ...this.#createDots(),
    ];
    shapes.forEach((s) => {
      fretboard.add(s);
    });

    return fretboard;
  }

  #generateFretNumbers(startFret, endFret) {
    const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
      (value) => value + startFret
    );
    return fretNumbers;
  }

  #createFretNumberTexts() {
    const fretNumberTexts = new Group({
      name: "fretNumberTexts",
      x: 127,
      y: 8,
    });
    this.fretNumbers.forEach((fretNumber, i) => {
      const fretNumberText = new Text({
        x: Fretboard.fretDistance * i,
        fontSize: 24,
        text: fretNumber,
      });
      fretNumberTexts.add(fretNumberText);
    });
    return fretNumberTexts;
  }

  #createFrets() {
    const points = [0, 0, 0, 150];

    const frets = new Group({
      name: "frets",
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });
    [...this.fretNumbers, this.fretNumbers.length].forEach((_fretNumber, i) => {
      const fret = new Line({
        x: Fretboard.fretDistance * i,
        points: points,
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      frets.add(fret);
    });
    return frets;
  }

  #createGuitarStrings() {
    const guitarStrings = new Group({
      name: "guitarStrings",
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });

    for (let i = 0; i < 6; i++) {
      const guitarString = new Line({
        y: Fretboard.guitarStringSpacing * i,
        points: [0, 0, 100 * this.fretNumbers.length, 0],
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      guitarStrings.add(guitarString);
    }
    return guitarStrings;
  }

  #createDots() {
    const guitarStringNumbers = [1, 2, 3, 4, 5, 6];
    const dots = [];

    // [{"fret": 1,"guitarString": 1,"fill": ""}, {"fret": 1,"guitarString": 2,"fill": ""}...]
    const fingerPositions = this.fretNumbers.flatMap((fretNumber) =>
      guitarStringNumbers.map((guitarStringNumber) => ({
        fret: fretNumber,
        guitarString: guitarStringNumber,
        fill: "",
      }))
    );

    fingerPositions.map((fingerPosition) => {
      const dotContainer = this.#createDotContainer(fingerPosition);

      // fretboard.dotsにfretとguitarStringが一致するdotが存在するか確認
      const drawnDot = this.#getDrawnDot(dotContainer);
      // fretboard.dotsにdotが存在すればdotを追加
      if (drawnDot) {
        const dot = this.#createDot(dotContainer.attrs.dotProperty);
        dot.fill(drawnDot.fill);
        dotContainer.add(dot);
      }

      dots.push(dotContainer);
    });
    return dots;
  }

  #createDotContainer(fingerPosition) {
    const x = this.#calcDotContainerX(
      fingerPosition.fret - this.fretNumbers[0]
    );
    return new Group({
      name: "dotContainer",
      x: x,
      y:
        17 +
        (fingerPosition.guitarString - 1) *
          this.constructor.guitarStringSpacing,
      width: 100,
      height: 30,
      dotProperty: {
        x: 48,
        y: 17,
        radius: 12,
        fill: Fretboard.black,
        fret: fingerPosition.fret,
        guitarString: fingerPosition.guitarString,
      },
    });
  }

  #calcDotContainerX(i) {
    let x = 34;
    if (i > 0) {
      x = 34 + 100 * i;
    }
    return x;
  }

  #createDot(dotProperty) {
    const dot = new Circle({
      name: "dot",
      x: dotProperty.x,
      y: dotProperty.y,
      radius: dotProperty.radius,
      fill: Fretboard.currentColor,
      fret: dotProperty.fret,
      guitarString: dotProperty.guitarString,
    });
    return dot;
  }

  #getDrawnDot(dotContainer) {
    return this.dots.find(
      (dot) =>
        dot.fret === dotContainer.attrs.dotProperty.fret &&
        dot.guitarString === dotContainer.attrs.dotProperty.guitarString
    );
  }
}
