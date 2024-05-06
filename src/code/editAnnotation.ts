import { EditAnnotationProps, SnackbarType } from "../types";

/**
 * The `editAnnotation` function is responsible for editing an annotation in a node.
 *
 * @remarks
 * This function takes an object as a parameter, which includes the node to edit the annotation in, the ID of the annotation to edit, and the new data for the annotation.
 * It first gets the "annotations" plugin data from the node and parses it into an array of annotations.
 * If there are annotations, it finds the index of the annotation with the given ID and replaces it with the new data.
 * It then sets the "annotations" plugin data of the node to the stringified array of annotations.
 * It also updates the "nodes" plugin data of the current page to reflect the editing of the annotation.
 * If the function is successful, it returns an object with `ok` set to true and a success message for the snackbar.
 * If there are no annotations, it returns an object with `ok` set to false and an error message for the snackbar.
 *
 * @param {EditAnnotationProps} { node, annotationId, data } - The properties for the function, including the node, the annotation ID, and the new data for the annotation.
 */
export function editAnnotation({
  node,
  annotationId,
  data,
}: EditAnnotationProps) {
  const nodeAnnotation = JSON.parse(node.getPluginData("annotations") || "[]");
  if (nodeAnnotation.length > 0) {
    const idx = nodeAnnotation.findIndex(
      (ann: { id: string }) => ann.id === annotationId
    );
    const olderTeam = nodeAnnotation[idx].team;

    // @ts-ignore
    nodeAnnotation[idx] = { ...nodeAnnotation[idx], ...data };
    node.setPluginData("annotations", JSON.stringify(nodeAnnotation));

    const nodesWithAnnotations = JSON.parse(
      figma.currentPage.getPluginData("nodes") || "{}"
    );

    if (nodesWithAnnotations[node.id]) {
      // @ts-ignore
      const newTeam = data.team;
      if (olderTeam !== newTeam) {
        nodesWithAnnotations[node.id][olderTeam] -= 1;
        if (nodesWithAnnotations[node.id][olderTeam] === 0) {
          delete nodesWithAnnotations[node.id][olderTeam];
        }
        if (nodesWithAnnotations[node.id][newTeam]) {
          nodesWithAnnotations[node.id][newTeam] += 1;
        } else {
          nodesWithAnnotations[node.id][newTeam] = 1;
        }
        figma.currentPage.setPluginData(
          "nodes",
          JSON.stringify(nodesWithAnnotations)
        );
      }
    }

    return {
      ok: true,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_SUCCESS,
        msg: "Annotation updated",
      },
    };
  }
  return {
    ok: false,
    snackbarMsg: {
      type: SnackbarType.SNACKBAR_ERROR,
      msg: "No annotation found",
    },
  };
}
