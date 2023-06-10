import { Controller } from "@hotwired/stimulus";
import { Layer, Text, Line, Circle, Stage, Rect } from "konva";

export default class extends Controller {
  static targets = ["output"];

  fetchCode() {
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

  add() {
    const black = "#555555";
    const guitarStringSpacing = 30;
    // 1弦0フレットの位置を基準にする
    const referencePoint = 34;

    // DOMとstageに渡す高さ、幅の取得
    const element = document.querySelector(".container");
    let width = element.clientWidth;
    let height = window.innerHeight;

    // stageを宣言
    // task これは初回のみ実施するようにしてそこにlayerをaddしていく感じにしたい
    let stage = new Stage({
      container: "scoreContainer",
      width: width,
      height: height,
    });

    // layerを宣言
    let layer = new Layer();

    // 想定される指板図1つ分のデータ
    const fretboardData = {
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

    // 指板の描画
    function drawFretboard(fretboardData) {
      // 開始フレットと終端フレットからフレットの数字の配列を生成
      const fretNumbers = generateFretNumbers(
        fretboardData.start_fret,
        fretboardData.end_fret
      );

      // fretのKonvaオブジェクトを生成して描画
      const frets = createFrets(fretNumbers);
      frets.forEach((e) => layer.add(e));

      // 弦のオブジェクトを生成して描画
      const guitarStrings = createGuitarStrings(fretNumbers.length);
      guitarStrings.forEach((e) => layer.add(e));

      // チューニングのオブジェクトを生成して描画
      const tunings = createTunings();
      tunings.forEach((e) => layer.add(e));

      // Dotを描画
      const dotsArray = fretboardData.dots;
      const dots = renderDots(fretNumbers, dotsArray, fretNumbers);
      dots.forEach((e) => layer.add(e));
    }

    function generateFretNumbers(startFret, endFret) {
      const fretNumbers = [...Array(endFret - startFret + 1).keys()].map(
        (value) => value + startFret
      );
      return fretNumbers;
    }

    function createFrets(fretNumbers) {
      const frets = [];
      const fretDistance = 100;
      const points = [0, 0, 0, 150];
      fretNumbers.map((e, i) => {
        // fret番号を描画する処理
        const fretNumber = new Konva.Text({
          x: 127 + fretDistance * i,
          y: 8,
          fontSize: 24,
          text: e,
        });
        // fretを描画する処理
        const fretLine = new Konva.Line({
          x: referencePoint + fretDistance * i,
          y: referencePoint,
          points: points,
          stroke: black,
          strokeWidth: 1,
        });
        frets.push(fretNumber);
        frets.push(fretLine);
      });

      // 終端フレットの線が足りないので追加
      const lastFretLine = new Konva.Line({
        x: referencePoint + fretNumbers.length * fretDistance,
        y: referencePoint,
        points: points,
        stroke: black,
        strokeWidth: 1,
      });
      frets.push(lastFretLine);
      return frets;
    }

    function createGuitarStrings(fretboardWidth) {
      const guitarStrings = [];

      for (let i = 0; i < fretboardWidth; i++) {
        const y = referencePoint + guitarStringSpacing * i;
        const guitarString = new Konva.Line({
          x: referencePoint,
          y: y,
          points: [0, 0, 100 * fretboardWidth, 0],
          stroke: black,
          strokeWidth: 1,
        });
        guitarStrings.push(guitarString);
      }
      return guitarStrings;
    }

    function createTunings() {
      const tunings = [];
      const tuningTexts = ["E", "B", "G", "D", "A", "E"];
      const x = 10;
      const yStartingPoint = referencePoint - 10;

      tuningTexts.map((e, i) => {
        const y = yStartingPoint + guitarStringSpacing * i;
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

    function renderDots(fretNumbers, dotsArray) {
      const dots = [];

      const fingerPositions = [];
      const guitarStringsArray = [1, 2, 3, 4, 5, 6];
      // 弦の配列をフレット分作る
      // [ [1,2,3,4,5,6], [1,2,3,4,5,6]...]
      for (let i = 0; i < fretNumbers.length; i++) {
        fingerPositions.push(guitarStringsArray);
      }

      fingerPositions.map((fingerPosition, i) => {
        const dotX = getDotX(i);
        const clickableAreaX = getClickableAreaX(i);

        fingerPosition.map((_, i) => {
          const dot = new Konva.Circle({
            x: dotX,
            y: 34 + i * guitarStringSpacing,
            radius: 12,
            fill: black,
            visible: false,
          });
          // dotの描画イベント発火用のする透明なrectを作る
          const clickableArea = new Konva.Rect({
            x: clickableAreaX,
            y: 17 + i * guitarStringSpacing,
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

    function getClickableAreaX(i) {
      let x = 34;
      if (i === 1) {
        x = 134;
      } else if (i === 2) {
        x = 234;
      } else if (i === 3) {
        x = 334;
      } else if (i === 4) {
        x = 434;
      } else if (i === 5) {
        x = 534;
      }
      return x;
    }

    function getDotX(i) {
      let x = 80;
      if (i === 1) {
        x = 180;
      } else if (i === 2) {
        x = 280;
      } else if (i === 3) {
        x = 380;
      } else if (i === 4) {
        x = 480;
      } else if (i === 5) {
        x = 580;
      }
      return x;
    }

    drawFretboard(fretboardData);

    stage.add(layer);
  }
}
