import { AnnotationList, getChildrenAnnotationsProps } from "../types";

/**
 * The `getNodeAnnotations` function is responsible for getting the annotations from a node and optionally its children.
 *
 * @remarks
 * This function takes an object as a parameter, which includes the ID of the node to get the annotations from and a boolean indicating whether to get the annotations from the node's children.
 * It first creates an empty `annotations` array.
 * It then calls the `getEveryNodeAnnotation` function with the node ID, the `annotations` array, and the `childrenToo` boolean.
 * It returns the `annotations` array.
 *
 * @param {getChildrenAnnotationsProps} { nodeId, childrenToo } - The properties for the function, including the node ID and the `childrenToo` boolean.
 */
export function getNodeAnnotations({
  node,
  childrenToo,
}: getChildrenAnnotationsProps) {
  const annotations: AnnotationList[] = [];
  getEveryNodeAnnotation(node, annotations, childrenToo);
  return annotations;
}

/**
 * The `getEveryNodeAnnotation` function is a helper function for `getNodeAnnotations` that gets the annotations from a node and optionally its children.
 *
 * @remarks
 * This function takes a node ID, an `annotations` array, and optionally a `childrenToo` boolean as parameters.
 * It first finds the node with the given ID in the current page.
 * If the node exists, it gets the "annotations" plugin data from the node and parses it into an array of annotations.
 * If there are annotations, it pushes an object with the node ID, the node name, and the annotations to the `annotations` array.
 * If the node has children, the `childrenToo` boolean is true, and the function calls itself recursively for each child.
 *
 * @param {string} nodeId - The ID of the node to get the annotations from.
 * @param {AnnotationList[]} annotations - The array to store the annotations in.
 * @param {boolean} [childrenToo] - Whether to get the annotations from the node's children.
 */
function getEveryNodeAnnotation(
  node: ComponentNode,
  annotations: AnnotationList[],
  childrenToo?: boolean
) {
  if (!node) {
    return;
  }

  const nodeAnnotation = JSON.parse(node.getPluginData("annotations") || "[]");
  if (nodeAnnotation.length > 0) {
    annotations.push({
      nodeId: node.id,
      listName: node.name,
      annotations: nodeAnnotation,
    });
  }

  if (node.children && node.children.length > 0 && childrenToo) {
    node.children.forEach((ch) => {
      getEveryNodeAnnotation(ch as ComponentNode, annotations, childrenToo);
    });
  }
}
