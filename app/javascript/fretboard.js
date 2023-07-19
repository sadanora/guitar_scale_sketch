import { Text, Line, Circle, Rect, Group, Image } from "konva";

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
  }

  draw() {
    const fretboard = new Group({
      kinds: "fretboard",
      fretboardPosition: this.position,
      startFret: this.startFret,
      endFret: this.endFret,
      y: 100 + 200 * (this.position - 1),
    });
    const fretNumbers = this.#generateFretNumbers(this.startFret, this.endFret);
    const fretboardsParts = [
      this.#createFretNumberTexts(fretNumbers),
      this.#createFrets(fretNumbers),
      this.#createGuitarStrings(fretNumbers.length),
      ...this.#createDots(fretNumbers),
      this.#createDeleteButton(fretNumbers.length),
    ];
    fretboardsParts.forEach((parts) => {
      fretboard.add(parts);
    });

    return fretboard;
  }

  #generateFretNumbers(startFret, endFret) {
    const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
      (value) => value + startFret
    );
    return fretNumbers;
  }

  #createFretNumberTexts(fretNumbers) {
    const fretNumberTexts = new Group({
      x: 127,
      y: 8,
    });
    fretNumbers.forEach((fretNumber, i) => {
      const fretNumberText = new Text({
        x: Fretboard.fretDistance * i,
        fontSize: 24,
        text: fretNumber,
      });
      fretNumberTexts.add(fretNumberText);
    });
    return fretNumberTexts;
  }

  #createFrets(fretNumbers) {
    const points = [0, 0, 0, 150];

    const frets = new Group({
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });
    [...fretNumbers, fretNumbers.length].forEach((_fretNumber, i) => {
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

  #createGuitarStrings(fretboardWidth) {
    const guitarStrings = new Group({
      x: Fretboard.referencePoint,
      y: Fretboard.referencePoint,
    });

    for (let i = 0; i < 6; i++) {
      const guitarString = new Line({
        y: Fretboard.guitarStringSpacing * i,
        points: [0, 0, 100 * fretboardWidth, 0],
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      guitarStrings.add(guitarString);
    }
    return guitarStrings;
  }

  #createDeleteButton(fretboardWidth) {
    const button = new Group({
      x: 157 + 100 * (fretboardWidth - 1),
      y: Fretboard.referencePoint + Fretboard.guitarStringSpacing * 4,
      width: 30,
      height: 30,
    });

    Image.fromURL("/trash-fill.svg", (imageNode) => {
      button.add(imageNode);
      imageNode.setAttrs({
        width: 30,
        height: 30,
      });
      button.on("click", function () {
        const fretboard = this.getParent();
        const deleteEvent = new CustomEvent("fretboardDeleted", {
          bubbles: true,
        });
        fretboard.destroy();
        document.getElementById("scoreContainer").dispatchEvent(deleteEvent);
      });
    });
    return button;
  }

  #createDots(fretNumbers) {
    const guitarStringNumbers = [1, 2, 3, 4, 5, 6];
    const dots = [];

    // [{"fret": 1,"guitarString": 1,"fill": ""}, {"fret": 1,"guitarString": 2,"fill": ""}...]
    const fingerPositions = fretNumbers.flatMap((fretNumber) =>
      guitarStringNumbers.map((guitarStringNumber) => ({
        fret: fretNumber,
        guitarString: guitarStringNumber,
        fill: "",
      }))
    );

    fingerPositions.map((fingerPosition) => {
      const dotContainer = this.#generateDotContainer(
        fretNumbers,
        fingerPosition
      );
      const clickableArea = new Rect({
        width: 100,
        height: 30,
      });
      // dotの追加、削除を行うイベント
      clickableArea.on("click", () => {
        // dotを取得
        const dot = this.#getDot(dotContainer);
        // dotがあれば削除、なければ追加する
        if (dot.length) {
          dot[0].destroy();
        } else {
          dotContainer.add(this.#generateDot(dotContainer.attrs.dotProperty));
        }
      });
      dotContainer.add(clickableArea);

      // fretboard.dotsにfretとguitarStringが一致するdotが存在するか確認
      const drawnDot = this.#getDrawnDot(dotContainer);
      // fretboard.dotsにdotが存在すればdotを追加
      if (drawnDot) {
        const dot = this.#generateDot(dotContainer.attrs.dotProperty);
        dot.fill(drawnDot.fill);
        dotContainer.add(dot);
      }

      dots.push(dotContainer);
    });
    return dots;
  }

  #generateDotContainer(fretNumbers, fingerPosition) {
    const dotContainerX = this.#calcDotContainerX(
      fingerPosition.fret - fretNumbers[0]
    );
    return new Group({
      x: dotContainerX,
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

  #getDot(parent) {
    return parent.getChildren((node) => {
      return node.getClassName() === "Circle";
    });
  }

  #generateDot(dotProperty) {
    const dot = new Circle({
      x: dotProperty.x,
      y: dotProperty.y,
      radius: dotProperty.radius,
      fill: Fretboard.currentColor,
      fret: dotProperty.fret,
      guitarString: dotProperty.guitarString,
    });
    dot.on("click", () => {
      dot.destroy();
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
