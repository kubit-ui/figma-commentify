import { ModalPropsType } from "../../../types";

export function modalTemplate({ id }: ModalPropsType) {
  return /*html*/ `
    <div id="${id}" class="modal" style="display:none"></div>
    <script>
      document.getElementById('${id}').onclick = (e) => {
        if (e.target.id === 'yesButton') {
          parent.postMessage(
            {
              pluginMessage: {
                type: "DELETE",
              },
            },
            "*"
          );
        } else if (e.target.id === 'noButton') {
          parent.postMessage(
            {
              pluginMessage: {
                type: "CANCEL_DELETE",
              },
            },
            "*"
          );
        }
      }
    </script>
  `;
}
