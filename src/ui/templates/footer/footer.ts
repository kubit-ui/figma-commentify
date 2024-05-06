import { ButtonAction } from "../../../types";
import { button } from "../../components/button/button";

export function footer() {
  return /* html */ `
    <footer>
      ${button({
        id: "closePluginButton",
        className: "button-action",
        text: "Close Plugin",
        action: ButtonAction.CLOSE,
      })}
    </footer>
  `;
}
