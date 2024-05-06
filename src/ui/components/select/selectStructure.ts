import { SelectPropsType } from "../../../types";
import { cleanBreaklineAndSpaces } from "../../../utils/cleanBreaklineAndSpaces";
import { icon } from "../icon/icon";
import { IconsAvailables } from "../icon/types/icons";

export function selectStructure(props: SelectPropsType) {
  const options = props.options
    .map(
      (option) => /*HTML*/ `
        <option 
          value="${option.value}"
          ${props.currentOption === option.value ? "selected" : ""}
        >
          ${option.text}
        </option>
      `
    )
    .join("");

  return /*HTML*/ `
    <div class="select-container">
      <span class="select-icon">${icon(IconsAvailables.CHEVRON_DOWN)}</span>
      <select
        id="${props.id}"
        class="${props.className}"
      >
        ${options}
      </select>
    </div>
  `;
}
