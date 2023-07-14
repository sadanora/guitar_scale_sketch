import { Layer, Text, Line, Circle, Rect, Group, Image } from "konva";

export default class Fretboard {
  static referencePoint = 34;
  static black = "#555555";
  static guitarStringSpacing = 30;
  static currentColor = "#555555";

  constructor(fretboardCode = {}) {
    this.position = fretboardCode.position;
    this.startFret = fretboardCode.startFret;
    this.endFret = fretboardCode.endFret;
    this.dots = fretboardCode.dots || [];
  }

  render() {
    const layer = new Layer({
      kinds: "fretboard",
      fretboardPosition: this.position,
      startFret: this.startFret,
      endFret: this.endFret,
      y: 100 + 200 * (this.position - 1),
    });

    const fretNumbers = this.#generateFretNumbers(this.startFret, this.endFret);

    const fretboardsParts = [];
    fretboardsParts.push(this.#createFrets(fretNumbers));
    fretboardsParts.push(this.#createGuitarStrings(fretNumbers.length));

    const dots = this.#renderDots(fretNumbers);
    fretboardsParts.push(dots);

    const deleteButton = [this.#generateDeleteButton(fretNumbers.length)];

    fretboardsParts.push(deleteButton);

    fretboardsParts.forEach((e) => {
      e.forEach((e) => layer.add(e));
    });

    return layer;
  }

  #generateDeleteButton(x) {
    const button = new Group({
      x: 157 + 100 * (x - 1),
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
      button.getLayer();
      button.on("click", function () {
        const layer = this.getLayer();
        const deleteEvent = new CustomEvent("fretboardDeleted", {
          detail: { layerId: layer._id },
          bubbles: true,
        });
        layer.destroy();
        document.getElementById("scoreContainer").dispatchEvent(deleteEvent);
      });
    });
    return button;
  }

  #generateFretNumbers(startFret, endFret) {
    const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
      (value) => value + startFret
    );
    return fretNumbers;
  }

  #createFrets(fretNumbers) {
    const frets = [];
    const fretDistance = 100;
    const points = [0, 0, 0, 150];
    fretNumbers.map((e, i) => {
      const fretNumber = new Text({
        x: 127 + fretDistance * i,
        y: 8,
        fontSize: 24,
        text: e,
      });
      const fretLine = new Line({
        x: Fretboard.referencePoint + fretDistance * i,
        y: Fretboard.referencePoint,
        points: points,
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      frets.push(fretNumber);
      frets.push(fretLine);
    });
    const lastFretLine = new Line({
      x: Fretboard.referencePoint + fretNumbers.length * fretDistance,
      y: Fretboard.referencePoint,
      points: points,
      stroke: Fretboard.black,
      strokeWidth: 1,
    });
    frets.push(lastFretLine);
    return frets;
  }

  #createGuitarStrings(fretboardWidth) {
    const guitarStrings = [];

    for (let i = 0; i < 6; i++) {
      const y = Fretboard.referencePoint + Fretboard.guitarStringSpacing * i;
      const guitarString = new Line({
        x: Fretboard.referencePoint,
        y: y,
        points: [0, 0, 100 * fretboardWidth, 0],
        stroke: Fretboard.black,
        strokeWidth: 1,
      });
      guitarStrings.push(guitarString);
    }
    return guitarStrings;
  }

  #renderDots(fretNumbers) {
    const dots = [];
    const guitarStringNumbers = [1, 2, 3, 4, 5, 6];
    const dotCodes = fretNumbers.flatMap((fretNumber) =>
      guitarStringNumbers.map((guitarStringNumber) => ({
        fret: fretNumber,
        guitarString: guitarStringNumber,
        fill: "",
      }))
    );

    dotCodes.map((dotCode) => {
      const dotX = this.#getDotX(dotCode.fret - fretNumbers[0]);
      const clickableAreaX = this.#getClickableAreaX(
        dotCode.fret - fretNumbers[0]
      );

      const existingDot = this.dots.find(
        (dot) =>
          dot.fret === dotCode.fret && dot.guitarString === dotCode.guitarString
      );
      const visibleStatus = existingDot ? existingDot.visible : false;

      dotCode.fill ??= this.constructor.black;
      console.log(dotCode.fill);

      const dot = new Circle({
        x: dotX,
        y:
          34 +
          (dotCode.guitarString - 1) * this.constructor.guitarStringSpacing,
        radius: 12,
        fill: dotCode.fill,
        visible: visibleStatus,
        fret: dotCode.fret,
        guitarString: dotCode.guitarString,
      });
      // dotの描画イベント発火用の透明なrectを作る
      const clickableArea = new Rect({
        x: clickableAreaX,
        y:
          17 +
          (dotCode.guitarString - 1) * this.constructor.guitarStringSpacing,
        width: 100,
        height: 30,
      });

      dot.on("click", function () {
        dot.fill(Fretboard.currentColor);
        dot.isVisible() ? dot.hide() : dot.show();
      });

      clickableArea.on("click", function () {
        dot.fill(Fretboard.currentColor);
        dot.isVisible() ? dot.hide() : dot.show();
      });

      dots.push(clickableArea);
      dots.push(dot);
    });
    return dots;
  }

  #getClickableAreaX(i) {
    let x = 34;
    if (i > 0) {
      x = 34 + 100 * i;
    }
    return x;
  }

  #getDotX(i) {
    let x = 80;
    if (i > 0) {
      x = 80 + 100 * i;
    }
    return x;
  }
}
