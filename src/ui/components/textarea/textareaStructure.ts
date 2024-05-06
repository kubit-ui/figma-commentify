import { TextareaPropsType } from "../../../types";

export function textareaStructure(props: TextareaPropsType) {
  return /*HTML*/ `
    <textarea
      id="${props.id}"
      class="${props.className}"
      placeholder="${props.placeholder}"
    >${props.value}</textarea>
  `;
}
