/**
 * The `locateNodeSelected` function is responsible for locating and selecting a node in the Figma document.
 *
 * @remarks
 * This function takes a node ID as a parameter.
 * It first calls the `getNodeByIdAsync` function from the Figma API with the node ID to get the node asynchronously.
 * It then calls the `scrollAndZoomIntoView` function from the Figma API with the node to scroll and zoom the viewport to the node.
 * Finally, it sets the `selection` of the current page to an array with the node to select the node.
 *
 * @param {string} nodeId - The ID of the node to locate and select.
 */
export async function locateNodeSelected(nodeId: string) {
  const node = (await figma.getNodeByIdAsync(nodeId)) as SceneNode;
  figma.viewport.scrollAndZoomIntoView([node]);
  figma.currentPage.selection = [node];
}
