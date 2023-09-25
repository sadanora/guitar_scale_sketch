import { Controller } from "@hotwired/stimulus";
import { Tooltip } from "bootstrap";

export default class extends Controller {
  static targets = ["tooltip"];
  connect() {
    const options = {
      title:
        "チェックを入れると、この指板図を誰でも閲覧できるようになります。<br>チェックを入れない場合、この指板図はあなたしか見れません。<br>この設定はいつでも変更できます。",
      html: true,
      placement: "top",
      customClass: "custom-tooltip",
    };
    return new Tooltip(this.tooltipTarget, options);
  }
}
