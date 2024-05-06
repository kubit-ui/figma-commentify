// structure
import { buttonStructure } from "./buttonStructure";
// types
import { ButtonPropsType } from "../../../types";

export function button({ action, ...props }: ButtonPropsType) {
  return /*HTML*/ `
    ${buttonStructure(props)}
    <script>
      document.getElementById('${props.id}').onclick = (e) => {
        e.stopPropagation();
        parent.postMessage(
          {
            pluginMessage: {
              type: "${action}",
            },
          },
          "*"
        );
      } 
    </script>
  `;
}
