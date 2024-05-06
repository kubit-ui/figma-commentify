// structure
import { selectStructure } from "./selectStructure";
// types
import { SelectAction, SelectPropsType } from "../../../types";

export function select(props: SelectPropsType) {
  return /*HTML*/ `
    ${selectStructure(props)}
    <script>
      document.getElementById('${props.id}').onchange = (e) => {
        const value = e.target.value;
        parent.postMessage(
          {
            pluginMessage: {
              type: "${SelectAction.SELECT_OPTION}",
              payload: value,
            },
          },
          "*"
        );
      }
    </script>
  `;
}
