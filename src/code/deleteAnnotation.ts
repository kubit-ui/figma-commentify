import { DeleteAnnotationProps, SnackbarType } from "../types";

/**
 * The `deleteAnnotation` function is responsible for deleting an annotation from a node.
 *
 * @remarks
 * This function takes an object as a parameter, which includes the node to delete the annotation from and the ID of the annotation to delete.
 * It first gets the "annotations" plugin data from the node and parses it into an array of annotations.
 * If there are annotations, it finds the index of the annotation with the given ID and removes it from the array.
 * It then sets the "annotations" plugin data of the node to the stringified array of annotations.
 * It also updates the "nodes" plugin data of the current page to reflect the deletion of the annotation.
 * If the function is successful, it returns an object with `ok` set to true and a success message for the snackbar.
 * If there are no annotations, it returns an object with `ok` set to false and an error message for the snackbar.
 *
 * @param {DeleteAnnotationProps} { node, annotationId } - The properties for the function, including the node and the annotation ID.
 */
export function deleteAnnotation({
  node,
  annotationId,
}: DeleteAnnotationProps) {
  const nodeAnnotations = JSON.parse(node.getPluginData("annotations") || "[]");
  if (nodeAnnotations.length > 0) {
    const idx = nodeAnnotations.findIndex(
      (ann: { id: string }) => ann.id === annotationId
    );

    const team = nodeAnnotations[idx].team;

    nodeAnnotations.splice(idx, 1);
    node.setPluginData("annotations", JSON.stringify(nodeAnnotations));

    const nodesWithAnnotations = JSON.parse(
      figma.currentPage.getPluginData("nodes") || "{}"
    );

    if (nodesWithAnnotations[node.id]) {
      nodesWithAnnotations[node.id][team] -= 1;
      if (nodesWithAnnotations[node.id][team] === 0) {
        delete nodesWithAnnotations[node.id][team];
      }
      if (Object.keys(nodesWithAnnotations[node.id]).length <= 1) {
        delete nodesWithAnnotations[node.id];
      }
      figma.currentPage.setPluginData(
        "nodes",
        JSON.stringify(nodesWithAnnotations)
      );
    }

    return {
      ok: true,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_SUCCESS,
        msg: "Annotation deleted",
      },
    };
  }
  return {
    ok: false,
    snackbarMsg: {
      type: SnackbarType.SNACKBAR_ERROR,
      msg: "No annotations found",
    },
  };
}
