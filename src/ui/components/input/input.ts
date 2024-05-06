// structure
import { inputStructure } from "./inputStructure";
// types
import { InputAction, InputPropsType } from "../../../types";

export function input(props: InputPropsType) {
  return /*HTML*/ `
    ${inputStructure(props)}
    <script>
       document.getElementById("${props.id}").onchange = (e) => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "${InputAction.TITLE_ONCHANGE}",
              payload: e.target.value,
            },
          },
          "*"
        );
      }
    </script>
  `;
}
