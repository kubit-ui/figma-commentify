import { AnnotationListAction, ModalAction, SnackbarType } from "../types";

type OnmessageScriptPropsType = {
  snackbarId: string;
  modalId: string;
  listId: string;
};

export function onmessageScript(props: OnmessageScriptPropsType) {
  const regex = String.raw`\n`;
  return /*html*/ `
    <script>
      onmessage = (event) => {
        const { type, payload } = event.data.pluginMessage;
        let snackbar
        let modal;

        switch (type) {
          case "${SnackbarType.SNACKBAR_SUCCESS}":
            snackbar = document.getElementById('${props.snackbarId}');
            snackbar.innerHTML = payload;
            snackbar.className = "feedback-success";
            snackbar.style.display = "block";
            break;
          case "${SnackbarType.SNACKBAR_ERROR}":
            snackbar = document.getElementById('${props.snackbarId}');
            snackbar.innerHTML = payload;
            snackbar.className = "feedback-error";
            snackbar.style.display = "block";
            break;
          case "${ModalAction.OPEN_MODAL}":
            modal = document.getElementById('${props.modalId}');
            modal.innerHTML = payload;
            modal.style.display = "flex";
            break;
          case "${ModalAction.CLOSE_MODAL}":
            modal = document.getElementById('${props.modalId}');
            modal.innerHTML = "";
            modal.style.display = "none";
            break;
          case "${AnnotationListAction.RENDER_LIST}":
            const list = document.getElementById("${props.listId}");
            list.innerHTML = payload;
            break;
          case "${AnnotationListAction.DOWNLOAD_LIST}":
            const annotationList = JSON.parse(payload);
            const csvList = [];
            annotationList.forEach((list) => {
              const csvName = list.listName;
              list.annotations.forEach((ann) => {
                const csvStructure = {
                  name: csvName,
                  teams: ann.team,
                  title: ann.title,
                  comment: ann.comment,
                  date: ann.date,
                };
                csvList.push(csvStructure);
              });
            });
            let csvHeader = Object.keys(csvList[0]).join(';');
            let csvBody = "";
            csvList.forEach((line) => {
              const formatedLine = Object.values(line).join(';');
              csvBody = csvBody.concat("${regex}", formatedLine);
            });
            const csvCompleted = csvHeader.concat(csvBody);
            const csvContent = 'data:text/csv;charset=utf-8,' + csvCompleted;
            const encodeUri = encodeURI(csvContent);
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', encodeUri);
            downloadLink.setAttribute('download', 'commentify.csv');
            downloadLink.click();
            downloadLink.remove();
            break;
        }

        if (snackbar) {
          setTimeout(() => {
            snackbar.style.display = "none";
          }, 2500);
        }
      };
    </script>
  `;
}
// const event = new MouseEvent("click");
// downloadLink.dispatchEvent(event);
