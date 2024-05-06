import { AnnotationType, FileListAnnotationsType } from "../types";

/**
 * This function counts the occurrences of each team in an array of annotations.
 *
 * @param annotations - An array of `AnnotationType` objects.
 *
 * @remarks
 * The function uses the `reduce` method to iterate over the `annotations` array.
 * For each annotation, it checks if the annotation's team is already a key in the `counts` object.
 * If it is, it increments the count for that team.
 * If it's not, it adds the team as a key to the `counts` object with a count of 1.
 *
 * @returns An object where the keys are team names and the values are the counts of each team's occurrences in the `annotations` array.
 */
function countTeams(annotations: AnnotationType[]) {
  return annotations.reduce((counts, annotation) => {
    if (counts[annotation.team]) {
      counts[annotation.team]++;
    } else {
      counts[annotation.team] = 1;
    }
    return counts;
  }, {} as { [key: string]: number });
}

/**
 * This function retrieves all document annotations.
 *
 * @remarks
 * The function first finds all nodes in the current Figma page.
 * It then iterates over each node, retrieving the "annotations" plugin data (if any) for each node.
 * If a node has annotation data, the function parses the data into an array of `AnnotationType` objects.
 * If the parsed data array is not empty, the function counts the occurrences of each team in the annotations using the `countTeams` function.
 * It then adds an entry to the `nodeList` object with the node's ID as the key and an object containing the node's name and the team counts as the value.
 * Finally, the function returns the `nodeList` object, which maps node IDs to their corresponding annotation data.
 *
 * @returns {FileListAnnotationsType} An object mapping node IDs to their corresponding annotation data.
 */
export function getAllDocumentAnnotations() {
  const allNodes = figma.currentPage.findAll();
  const nodeList: FileListAnnotationsType = {};

  for (let node of allNodes) {
    const data = node.getPluginData("annotations");
    if (data && data.length > 0) {
      const nodeData: AnnotationType[] = JSON.parse(data);
      if (nodeData.length > 0) {
        nodeList[node.id] = { nodeName: node.name, ...countTeams(nodeData) };
      }
    }
  }

  return nodeList;
}
