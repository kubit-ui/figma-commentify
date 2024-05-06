import { InputPropsType } from "../../../types";

export function inputStructure(props: InputPropsType) {
  return /*HTML*/ `
    <input
      id="${props.id}"
      class="${props.className}"
      placeholder="${props.placeholder}"
      value="${props.value}"
    />
  `;
}
