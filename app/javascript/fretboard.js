import { Text, Line, Group } from "konva";
import { generateDot } from "./generateDot.js";

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
      fretboardCode.endFret,
    );
  }

  generateFretboardGroup() {
    // KonvaのGroupオブジェクトを生成
    const fretboardGroup = new Group({
      name: "fretboard",
      fretboardPosition: this.position,
      startFret: this.startFret,
      endFret: this.endFret,
      fretNumbers: this.fretNumbers,
      y: 100 + 250 * (this.position - 1),
    });
    const fletboardElements = [
      this.#generateFretNumberLabels(),
      this.#generateFretLines(),
      this.#generateGuitarStringLines(),
      ...this.#generateDotContainers(),
    ];
    fletboardElements.forEach((element) => {
      fretboardGroup.add(element);
    });

    return fretboardGroup;
  }

  #generateFretNumbers(startFret, endFret) {
    const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
      (value) => value + startFret,
    );
    return fretNumbers;
  }

  #generateFretNumberLabels() {
    const fretNumberLabels = new Group({
      name: "fretNumberLabels",
      x: 127,
      y: 8,
    });
    this.fretNumbers.forEach((fretNumber, i) => {
      const fretNumberLabel = new Text({
        x: Fretboard.fretDistance * i,
        fontSize: 24,
        text: fretNumber,
      });
      fretNumberLabels.add(fretNumberLabel);
    });
    return fretNumberLabels;
  }

  #generateFretLines() {
    const points = [0, 0, 0, 150];

    const fretLines = new Group({
      name: "fretLines",
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });
    [...this.fretNumbers, this.fretNumbers.length].forEach((_fretNumber, i) => {
      const fretLine = new Line({
        x: Fretboard.fretDistance * i,
        points: points,
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      fretLines.add(fretLine);
    });
    return fretLines;
  }

  #generateGuitarStringLines() {
    const guitarStringLines = new Group({
      name: "guitarStringLines",
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });

    for (let i = 0; i < 6; i++) {
      const guitarStringLine = new Line({
        y: Fretboard.guitarStringSpacing * i,
        points: [0, 0, 100 * this.fretNumbers.length, 0],
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      guitarStringLines.add(guitarStringLine);
    }
    return guitarStringLines;
  }

  #generateDotContainers() {
    const guitarStringNumbers = [1, 2, 3, 4, 5, 6];
    const dotContainers = [];

    // [{"fret": 1,"guitarString": 1,"fill": ""}, {"fret": 1,"guitarString": 2,"fill": ""}...]
    const fingerPositions = this.fretNumbers.flatMap((fretNumber) =>
      guitarStringNumbers.map((guitarStringNumber) => ({
        fret: fretNumber,
        guitarString: guitarStringNumber,
        fill: "",
      })),
    );

    fingerPositions.map((fingerPosition) => {
      const dotContainer = this.#generateDotContainer(fingerPosition);

      // fretとguitarStringが一致するdotが存在するか確認
      const matchedDot = this.#findDot(dotContainer);
      // dotが存在すればdotを追加
      if (matchedDot) {
        const dot = generateDot(
          dotContainer.attrs.dotProperty,
          this.currentColor,
        );
        dot.fill(matchedDot.fill);
        dotContainer.add(dot);
      }

      dotContainers.push(dotContainer);
    });
    return dotContainers;
  }

  #generateDotContainer(fingerPosition) {
    const x = this.#calcDotContainerX(
      fingerPosition.fret - this.fretNumbers[0],
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

  #findDot(dotContainer) {
    return this.dots.find(
      (dot) =>
        dot.fret === dotContainer.attrs.dotProperty.fret &&
        dot.guitarString === dotContainer.attrs.dotProperty.guitarString,
    );
  }
}
