import { GetAnnotationsProps, SnackbarType } from "../types";

/**
 * The `pasteNodeAnnotations` function is responsible for pasting the annotations to a node.
 *
 * @remarks
 * This function takes a `ComponentNode` as a parameter.
 * It first gets the "kubitCopy" data from the Figma client storage and parses it into an `annotations` object.
 * If there are no annotations, it returns an object with `ok` set to false and an error message for the snackbar.
 * It then calls the `setAllAnnotations` function with the node and the `annotations` object to set the annotations to the node and its children.
 * It also sets the "kubitCopy" data in the Figma client storage to an empty object.
 * If the function is successful, it returns an object with `ok` set to true and a success message for the snackbar.
 * If the function encounters an error, it returns an object with `ok` set to false and an error message for the snackbar.
 *
 * @param {ComponentNode} node - The node to paste the annotations to.
 */
export async function pasteNodeAnnotations(node: ComponentNode) {
  try {
    const annotations = JSON.parse(
      (await figma.clientStorage.getAsync("kubitCopy")) || "{}"
    );
    if (Object.keys(annotations).length === 0) {
      return {
        ok: false,
        snackbarMsg: {
          type: SnackbarType.SNACKBAR_ERROR,
          msg: "No annotations to import",
        },
      };
    }
    setAllAnnotations({ node, annotations });
    await figma.clientStorage.setAsync("kubitCopy", "{}");
    return {
      ok: true,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_SUCCESS,
        msg: "Annotations imported",
      },
    };
  } catch (error) {
    return {
      ok: false,
      snackbarMsg: {
        type: SnackbarType.SNACKBAR_ERROR,
        msg: "Error importing annotations",
      },
    };
  }
}

/**
 * The `setAllAnnotations` function is a helper function for `pasteNodeAnnotations` that sets the annotations to a node and its children.
 *
 * @remarks
 * This function takes an object as a parameter, which includes the node to set the annotations to, a key to identify the node, and an annotations object.
 * It first checks if the annotations for the node with the given key exist and are not empty.
 * If the annotations exist, it sets the "annotations" plugin data of the node to the annotations.
 * If the node has children, it calls itself recursively for each child, with a new key that includes the index of the child.
 *
 * @param {GetAnnotationsProps} { node, key, annotations } - The properties for the function, including the node, the key, and the annotations object.
 */
function setAllAnnotations({
  node,
  key = "0",
  annotations,
}: GetAnnotationsProps) {
  // @ts-ignore
  const hasValue = JSON.parse(annotations[key]).length > 0;

  if (hasValue) {
    //@ts-ignore
    node?.setPluginData("annotations", annotations[key]);
  }
  if (node.children && node.children.length > 0) {
    node.children.forEach((ch, idx) => {
      const lvKey = `${key}:${idx}`;
      setAllAnnotations({ node: ch as ComponentNode, key: lvKey, annotations });
    });
  }
}
