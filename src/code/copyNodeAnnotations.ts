import { SnackbarType, CopyNodeAnnotationsProps } from "../types";

/**
 * The `copyNodeAnnotations` function is responsible for copying the annotations from a node and its children.
 *
 * @remarks
 * This function takes a `ComponentNode` as a parameter.
 * It first creates an empty `annotations` object.
 * It then calls the `getAnnotations` function with the node and the `annotations` object to get the annotations from the node and its children.
 * It stores the stringified `annotations` object in the Figma client storage with the key "kubitCopy".
 * If the function is successful, it returns an object with `ok` set to true and a success message for the snackbar.
 * If the function encounters an error, it returns an object with `ok` set to false and an error message for the snackbar.
 *
 * @param {ComponentNode} node - The node to copy the annotations from.
 */
export async function copyNodeAnnotations(node: ComponentNode) {
  try {
    const annotations = {};
    getAnnotations({ node, annotations });
    await figma.clientStorage.setAsync(
      "kubitCopy",
      JSON.stringify(annotations)
    );
    return {
      ok: true,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_SUCCESS,
        msg: "Annotations prepared for export",
      },
    };
  } catch (e) {
    return {
      ok: false,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_ERROR,
        msg: "Error exporting annotations",
      },
    };
  }
}

/**
 * The `getAnnotations` function is responsible for getting the annotations from a node and its children.
 *
 * @remarks
 * This function takes an object as a parameter, which includes the node to get the annotations from, a key to identify the node, and an annotations object to store the annotations.
 * It first gets the "annotations" plugin data from the node and stores it in the annotations object with the key.
 * If the node has children, it calls the `getAnnotations` function recursively for each child, with a new key that includes the index of the child.
 *
 * @param {CopyNodeAnnotationsProps} param0 - The properties for the function, including the node, the key, and the annotations object.
 */
function getAnnotations({
  node,
  key = "0",
  annotations = {},
}: CopyNodeAnnotationsProps): void {
  //@ts-ignore
  annotations[key] = node.getPluginData("annotations") || "[]";
  if (node.children && node.children.length > 0) {
    node.children.forEach((ch, idx) => {
      const lvKey = `${key}:${idx}`;
      getAnnotations({ node: ch as ComponentNode, key: lvKey, annotations });
    });
  }
}
