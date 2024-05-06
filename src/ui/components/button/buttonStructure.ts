import { ButtonPropsType } from "../../../types";

export function buttonStructure(props: Omit<ButtonPropsType, "action">) {
  return /*HTML*/ `
    <button
      id="${props.id}"
      class="${props.className}"
    >
      ${props.text}
    </button>
  `;
}
