// structure
import { textareaStructure } from "./textareaStructure";
// types
import { TextareaAction, TextareaPropsType } from "../../../types";

export function textarea(props: TextareaPropsType) {
  return /*HTML*/ `
    ${textareaStructure(props)}
    <script>
      document.getElementById("${props.id}").onchange = (e) => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "${TextareaAction.DESCRIPTION_ONCHANGE}",
              payload: e.target.value,
            },
          },
          "*"
        );
      }
    </script>
  `;
}
