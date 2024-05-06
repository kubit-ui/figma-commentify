// structure
import { checkboxStructure } from "./checkboxStructure";
// types
import { CheckboxAction, CheckboxPropsType } from "../../../types/components";

export function checkbox(props: CheckboxPropsType) {
  return /*HTML*/ `
    ${checkboxStructure(props)}
    <script>
      document.getElementById('${props.id}').onchange = (e) => {
        const value = e.target.checked;
        parent.postMessage(
          {
            pluginMessage: {
              type: "${CheckboxAction.CHECKBOX_ONCHANGE}",
              payload: value,
            },
          },
          "*"
        );
      }
    </script>
  `;
}
