import { ButtonAction } from "../../../../types";
import { button } from "../../../components/button/button";
import { IconsAvailables, icon } from "../../../components/icon";

export function formTemplateHeader(component: string, editMode?: boolean) {
  const titleSelected = editMode
    ? `Edit Annotation for: <b>${component}</b>`
    : `Add Annotation for: <b>${component}</b>`;
  return /*html*/ `
    <div class="form-header">
      ${button({
        id: "back",
        text: `${icon(IconsAvailables.CHEVRON_LEFT)} Back`,
        className: "button-action",
        action: ButtonAction.ANNOTATIONS,
      })}
      <p class="form-header-title">${titleSelected}</p>
    </div>
  `;
}
