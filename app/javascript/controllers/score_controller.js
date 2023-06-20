import { Controller } from "@hotwired/stimulus";
import { Layer, Text, Line, Circle, Stage, Rect } from "konva";

// Connects to data-controller="score"
export default class extends Controller {
  static targets = ["startFret", "endFret", "output"];
  static values = { scoreCode: [] };

  static referencePoint = 34;
  static black = "#555555";
  static guitarStringSpacing = 30;

  connect() {}

  drawScore() {
    const stage = this.generateStage();
    stage.draw();
    const fretboards = [];
    this.scoreCodeValue.map((fretboardCode, i) => {
      const fretboard = this.drawFretboard(fretboardCode, i);
      fretboards.push(fretboard);
    });
    fretboards.forEach((e) => stage.add(e));
  }

  AddFretboard() {
    // 指板図のJSONをscoreCodeに追加して指板図を再描画する
    const fretboardCord = this.generateFretboardCode();
    this.pushFretboardCode(fretboardCord);
    this.drawScore();
  }

  pushFretboardCode(fretboardCode) {
    this.scoreCodeValue.push(fretboardCode);
    this.outputTarget.value = `${JSON.stringify(this.scoreCodeValue)}`;
  }

  generateFretboardCode() {
    const fretboardCode = {
      id: 1,
      position: 1,
      startFret: parseInt(startFret.value),
      endFret: parseInt(endFret.value),
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

  drawFretboard(fretboardCode, i) {
    const layer = new Layer({
      y: 200 * i,
    });

    const fretNumbers = this.generateFretNumbers(
      fretboardCode.startFret,
      fretboardCode.endFret
    );

    const frets = this.createFrets(fretNumbers);
    frets.forEach((e) => layer.add(e));

    const guitarStrings = this.createGuitarStrings(fretNumbers.length);
    guitarStrings.forEach((e) => layer.add(e));

    const tunings = this.createTunings();
    tunings.forEach((e) => layer.add(e));

    const dotsArray = fretboardCode.dots;
    const dots = this.renderDots(fretNumbers, dotsArray, fretNumbers);
    dots.forEach((e) => layer.add(e));

    return layer;
  }

  generateFretNumbers(startFret, endFret) {
    const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
      (value) => value + startFret
    );
    return fretNumbers;
  }

  createFrets(fretNumbers) {
    const frets = [];
    const fretDistance = 100;
    const points = [0, 0, 0, 150];
    fretNumbers.map((e, i) => {
      const fretNumber = new Konva.Text({
        x: 127 + fretDistance * i,
        y: 8,
        fontSize: 24,
        text: e,
      });
      const fretLine = new Konva.Line({
        x: this.constructor.referencePoint + fretDistance * i,
        y: this.constructor.referencePoint,
        points: points,
        stroke: this.constructor.black,
        strokeWidth: 1,
      });
      frets.push(fretNumber);
      frets.push(fretLine);
    });
    const lastFretLine = new Konva.Line({
      x: this.constructor.referencePoint + fretNumbers.length * fretDistance,
      y: this.constructor.referencePoint,
      points: points,
      stroke: this.constructor.black,
      strokeWidth: 1,
    });
    frets.push(lastFretLine);
    return frets;
  }

  createGuitarStrings(fretboardWidth) {
    const guitarStrings = [];

    for (let i = 0; i < 6; i++) {
      const y =
        this.constructor.referencePoint +
        this.constructor.guitarStringSpacing * i;
      const guitarString = new Konva.Line({
        x: this.constructor.referencePoint,
        y: y,
        points: [0, 0, 100 * fretboardWidth, 0],
        stroke: this.constructor.black,
        strokeWidth: 1,
      });
      guitarStrings.push(guitarString);
    }
    return guitarStrings;
  }

  createTunings() {
    const tunings = [];
    const tuningTexts = ["E", "B", "G", "D", "A", "E"];
    const x = 10;
    const yStartingPoint = this.constructor.referencePoint - 10;

    tuningTexts.map((e, i) => {
      const y = yStartingPoint + this.constructor.guitarStringSpacing * i;
      const tuning = new Konva.Text({
        x: x,
        y: y,
        fontSize: 24,
        text: e,
      });
      tunings.push(tuning);
    });
    return tunings;
  }

  renderDots(fretNumbers, dotsArray) {
    const dots = [];

    const fingerPositions = [];
    const guitarStringsArray = [1, 2, 3, 4, 5, 6];
    // 弦の配列をフレット分作る
    // [ [1,2,3,4,5,6], [1,2,3,4,5,6]...]
    for (let i = 0; i < fretNumbers.length; i++) {
      fingerPositions.push(guitarStringsArray);
    }

    fingerPositions.map((fingerPosition, i) => {
      const dotX = this.getDotX(i);
      const clickableAreaX = this.getClickableAreaX(i);

      fingerPosition.map((_, i) => {
        const dot = new Konva.Circle({
          x: dotX,
          y: 34 + i * this.constructor.guitarStringSpacing,
          radius: 12,
          fill: this.constructor.black,
          visible: false,
        });
        // dotの描画イベント発火用のする透明なrectを作る
        const clickableArea = new Konva.Rect({
          x: clickableAreaX,
          y: 17 + i * this.constructor.guitarStringSpacing,
          width: 100,
          height: 30,
        });
        // dot自身に表示/非表示をtoggleするイベントを追加
        dot.on("click", function () {
          dot.isVisible() ? dot.hide() : dot.show();
        });
        // rectにdotの表示/非表示をtoggleするイベントを追加
        clickableArea.on("click", function () {
          dot.isVisible() ? dot.hide() : dot.show();
        });
        dots.push(clickableArea);
        dots.push(dot);
      });
    });
    return dots;
  }

  getClickableAreaX(i) {
    let x = 34;
    if (i > 0) {
      x = 34 + 100 * i;
    }
    return x;
  }

  getDotX(i) {
    let x = 80;
    if (i > 0) {
      x = 80 + 100 * i;
    }
    return x;
  }

  generateStage() {
    const element = document.querySelector(".container");
    const width = element.clientWidth;
    const height = window.innerHeight;
    const stage = new Stage({
      container: "scoreContainer",
      width: width,
      height: height,
    });
    return stage;
  }
}
