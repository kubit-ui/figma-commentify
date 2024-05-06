// methods
import { annotationsListMethod } from "./annotationsListMethod";

// types
import { AnnotationListAction, AnnotationListPropsType } from "../../../types";

export function annotationsList({ id }: AnnotationListPropsType) {
  return /*html*/ `
  <ul id="${id}"></ul>
  <script>
    function editAnnotation(event, annotationId) {
      event.stopPropagation();
      parent.postMessage(
        {
          pluginMessage: {
            type: "${AnnotationListAction.EDIT_ANNOTATION}",
            payload: annotationId,
          },
        },
        "*"
      );
    }

    function locateAnnotation(nodeId) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "${AnnotationListAction.LOCATE_ANNOTATION}",
            payload: nodeId,
          },
        },
        "*"
      );
    }

    document.getElementById("${id}").onclick = (event) => {
      if (event.target.tagName === "A") {
        parent.postMessage(
          {
            pluginMessage: {
              type: "${AnnotationListAction.OPEN_URL}",
              payload: event.target.innerText,
            },
          },
          "*"
        );
      }
    }
  </script>
`;
}
