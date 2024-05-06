import { ButtonAction } from "../../../../types";
import { button } from "../../../components/button/button";
import { IconsAvailables, icon } from "../../../components/icon";

export const copyPasteHeader = /*html*/ `
  <div class="copy-header">
      ${button({
        id: "back",
        text: `${icon(IconsAvailables.CHEVRON_LEFT)} Back`,
        className: "button-action",
        action: ButtonAction.ANNOTATIONS,
      })}
      <p class="copy-header-title">What do you want to do?</p>
    </div>
  `;
