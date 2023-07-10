import { Controller } from "@hotwired/stimulus";
import Score from "../score.js";
// Connects to data-controller="score"
export default class extends Controller {
  static targets = ["title", "startFret", "endFret", "output"];
  static values = { scoreCode: [] };

  initialize() {
    this.score = new Score(this.titleTarget.value, this.scoreCodeValue);
    document
      .getElementById("scoreContainer")
      .addEventListener("fretboardDeleted", (e) => {
        this.updateScoreCode();
        this.draw();
      });
  }

  addFretboard() {
    // stageがない場合はスルー　あった場合はstageから描画済みのfretboardの情報を取得して
    // scoreCodeValue, score.scoreCode を更新する
    if (this.score.stage) {
      this.updateScoreCode();
      this.score.stage.clear();
    }

    // 追加するscoreCodeValueに追加する指板の情報を追加
    const newFretboardCode = {
      startFret: parseInt(startFret.value),
      endFret: parseInt(endFret.value),
    };

    if (!this.score.scoreCode) {
      newFretboardCode.position = 1;
      this.score.scoreCode = [newFretboardCode];
    } else {
      newFretboardCode.position = this.score.scoreCode.length + 1;
      this.score.scoreCode.push(newFretboardCode);
    }
    this.scoreCodeValue = this.score.scoreCode;

    // 更新したscoreCodeValueを使ってscore.fretboardsを更新する
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);

    // 再描画
    this.draw();
  }

  draw() {
    this.score.draw();
  }

  updateScoreCode() {
    const newScoreCode = [];
    this.score.stage.children.map((e, i) => {
      const visibleDots = e.children.filter(this.findVisibleDot);

      const dots = visibleDots.map((visibleDot) => ({
        fill: visibleDot.attrs.fill,
        fret: visibleDot.attrs.fret,
        guitarString: visibleDot.attrs.guitarString,
      }));

      const fretboardCode = {
        position: i + 1,
        startFret: e.attrs.startFret,
        endFret: e.attrs.endFret,
        dots: dots,
      };
      newScoreCode.push(fretboardCode);
    });
    this.scoreCodeValue = newScoreCode;
    this.score.scoreCode = this.scoreCodeValue;
    this.outputTarget.value = JSON.stringify(this.scoreCodeValue);
    this.score.fretboards = this.score.createFretboards(this.scoreCodeValue);
  }

  findVisibleDot(obj) {
    return obj.className === "Circle" && obj.visible() ? true : false;
  }
}
