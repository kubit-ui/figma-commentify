import { SaveAnnotationProps, SnackbarType } from "../types";
/**
 * Asynchronous function to save an annotation to a specific node.
 *
 * @param {Object} { nodeId, annotation } - An object containing the node ID and the annotation.
 * @param {string} nodeId - The ID of the node where the annotation will be saved.
 * @param {Object} annotation - The annotation to be saved. It should contain a `comment` field.
 *
 * @returns {Promise<Object>} An object indicating whether the operation was successful and a message to display in a notification bar.
 * If `annotation.comment` is empty, the function will return an object with `ok: false` and an error message.
 * If the node is not found, the function will return an object with `ok: false` and an error message.
 * If the annotation is saved successfully, the function will return an object with `ok: true`.
 */
export async function saveAnnotation({
  nodeId,
  annotation,
}: SaveAnnotationProps) {
  if (!annotation.comment || annotation.comment === "") {
    return {
      ok: false,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_ERROR,
        msg: "Comment is required",
      },
    };
  }

  const node = (await figma.getNodeByIdAsync(nodeId)) as SceneNode;

  if (!node) {
    return {
      ok: false,
      snackbarMsg: { type: SnackbarType.SNACKBAR_ERROR, msg: "Node not found" },
    };
  }

  const nodeAnnotations = JSON.parse(node.getPluginData("annotations") || "[]");

  annotation.id = `${nodeId}--${nodeAnnotations.length + 1}`;

  const addedNodeAnnotations = [...nodeAnnotations, annotation];
  node.setPluginData("annotations", JSON.stringify(addedNodeAnnotations));

  const nodesWithAnnotations = JSON.parse(
    figma.currentPage.getPluginData("nodes") || "{}"
  );

  if (Object.keys(nodesWithAnnotations).includes(nodeId)) {
    if (!nodesWithAnnotations[nodeId][annotation.team]) {
      nodesWithAnnotations[nodeId][annotation.team] = 1;
    } else {
      nodesWithAnnotations[nodeId][annotation.team] += 1;
    }
    figma.currentPage.setPluginData(
      "nodes",
      JSON.stringify(nodesWithAnnotations)
    );
  } else {
    nodesWithAnnotations[nodeId] = {
      [annotation.team]: 1,
      nodeName: node.name,
    };
    figma.currentPage.setPluginData(
      "nodes",
      JSON.stringify(nodesWithAnnotations)
    );
  }

  return {
    ok: true,
    snackbarMsg: {
      type: SnackbarType.SNACKBAR_SUCCESS,
      msg: "Annotation saved",
    },
  };
}
