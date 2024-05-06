import { CheckboxPropsType } from "../../../types";

export function checkboxStructure(props: CheckboxPropsType) {
  return /*HTML*/ `
    <div class="checkbox">
      <input
        type="checkbox"
        id="${props.id}"
        class="checkbox-input"
        ${props.checked ? "checked" : ""}
      />
      <label
        class="checkbox-label"
        for="${props.id}">${props.label}</label>
    </div>
  `;
}
