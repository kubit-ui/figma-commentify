// UI
import {
  annotationsList,
  annotationsTemplate,
  confirmTemplate,
  copyPasteTemplate,
  footer,
  formTemplate,
  loaderTemplate,
  modalTemplate,
  snackbar,
  snackbarContent,
  startedTemplate,
} from "./src/ui";
// CODE
import {
  copyNodeAnnotations,
  deleteAnnotation,
  editAnnotation,
  getAllDocumentAnnotations,
  getNodeAnnotations,
  pasteNodeAnnotations,
  saveAnnotation,
} from "./src/code";
// TYPES
import {
  AnnotationList,
  AnnotationListAction,
  AnnotationTemplateProps,
  AnnotationType,
  FileListAnnotationsType,
  FormTemplateProps,
  ModalAction,
  SnackbarPropsType,
  SnackbarType,
  TemplatesAvailables,
} from "./src/types";
// METHODS
import { annotationsListMethod } from "./src/ui/components/annotationsList/annotationsListMethod";
// STYLES
import { pluginStyles } from "./src/styles/pluginStyles";
// ONMESSAGE
import { onmessageScript } from "./src/scripts/onmessageScript";

type TemplateSelectorArgs = {
  form: FormTemplateProps;
  annotation: AnnotationTemplateProps;
  fileAnnotations: FileListAnnotationsType;
};

type templateSelectorProps = {
  template: TemplatesAvailables;
  args: TemplateSelectorArgs;
};

/**
 * The `templateSelector` function selects a template based on the value of `template`.
 *
 * @remarks
 * This function takes an object with the `template` and `args` properties as a parameter.
 * `template` is a string indicating the template to select, and `args` is an object
 * which contains the arguments needed for the templates.
 *
 * The function uses a `switch` statement to select the template based on the value of `template`.
 * If `template` is `TemplatesAvailables.ANNOTATIONS`, select the annotation template.
 * If `template` is `TemplatesAvailables.INPUT_ANNOTATION`, select the form template.
 * If `template` is `TemplatesAvailables.COPY_PASTE`, select the copy and paste template.
 * If `template` is none of the above, select the initial template.
 *
 * @param {templateSelectorProps} { template, args } - An object with the `template` and `args` properties.
 * @returns {string} The selected template.
 */
function templateSelector({ template, args }: templateSelectorProps) {
  let templateSelected = "";
  switch (template) {
    case TemplatesAvailables.ANNOTATIONS:
      templateSelected = annotationsTemplate(args.annotation);
      break;
    case TemplatesAvailables.INPUT_ANNOTATION:
      templateSelected = formTemplate(args.form);
      break;
    case TemplatesAvailables.COPY_PASTE:
      templateSelected = copyPasteTemplate();
      break;

    default:
      templateSelected = startedTemplate(args.fileAnnotations);
      break;
  }
  return templateSelected;
}

/**
 * The `templateManager` function is responsible for managing the templates in the application.
 *
 * @remarks
 * This function does not take any parameters.
 * It uses a switch statement to handle different template actions based on the current template state.
 * Each case in the switch statement corresponds to a different template action, such as setting the template, getting the template, updating the template, etc.
 * The function returns the new template state after the action has been performed.
 * @returns {Object} Returns an object with functions that manage different aspects of the template.
 */
export function templateManager() {
  let _template: TemplatesAvailables = TemplatesAvailables.STARTED;
  let _nodeSelected: SceneNode | undefined;
  let _nodeAnnotations: AnnotationList[] = [];
  let _fileAnnotations: FileListAnnotationsType = {};
  let _annotationSelected: AnnotationType | undefined;
  let _editMode: boolean = false;
  let _teamSelected: string;
  let _titleValue: string = "";
  let _commentValue: string;
  const listId = "nodeAnnotations";
  const modalId = "pluginModal";
  const snackbarId = "pluginSnackbar";

  /**
   * The `printTemplate` function is responsible for rendering the plugin UI in Figma.
   *
   * @remarks
   * This function first prepares the arguments for the templates, including the form, annotation, and file annotations.
   * It then constructs the HTML for the plugin UI, which includes the styles, snackbar, root div, modal, and onmessage script.
   * The root div contains the selected template, the annotations list, and the footer.
   * The selected template is determined by the `_template` variable and the prepared arguments.
   * Finally, it displays the constructed HTML in Figma using the `figma.showUI` method.
   *
   * @internal
   */
  function printTemplate() {
    const args: TemplateSelectorArgs = {
      form: {
        component: _nodeSelected?.name || "",
        select: { preSelected: _teamSelected },
        input: { value: _titleValue },
        textarea: { value: _commentValue },
        editMode: _editMode,
      },
      annotation: {
        component: _nodeSelected?.name || "",
        select: { preSelected: _teamSelected },
      },
      fileAnnotations: _fileAnnotations,
    };
    const html = `
      ${pluginStyles()}
      ${snackbar({ id: snackbarId })}
      <div id="root">
        ${templateSelector({ template: _template, args })}
        ${annotationsList({ id: listId })}
        ${footer()}
      </div>
      ${modalTemplate({ id: modalId })}
      ${onmessageScript({ snackbarId, modalId, listId })}
      `;

    figma.showUI(html);
  }

  /**
   * The `findAnnotations` function is responsible for finding annotations for a given node.
   *
   * @remarks
   * This function takes an object with `nodeId` and `childrenToo` properties as a parameter.
   * `nodeId` is a string that represents the ID of the node for which to find annotations.
   * `childrenToo` is an optional boolean that, if true, also finds annotations for the children of the node.
   *
   * The function returns a promise that resolves after a delay of 250 milliseconds.
   * During this delay, it sets `_nodeAnnotations` to the result of the `getNodeAnnotations` function with the given parameters.
   * If `_nodeAnnotations` contains any annotations, it then calls the `renderAnnotations` function.
   *
   * @param {Object} { nodeId, childrenToo } - An object with `nodeId` and `childrenToo` properties.
   * @returns {Promise<void>} A promise that resolves after the annotations have been found and rendered.
   */
  async function findAnnotations({
    node,
    childrenToo,
  }: {
    node: ComponentNode;
    childrenToo?: boolean;
  }) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        _nodeAnnotations = getNodeAnnotations({
          node,
          childrenToo,
        });
        resolve();
        if (_nodeAnnotations.length > 0) {
          renderAnnotations();
        }
      }, 250);
    });
  }

  /**
   * The `filterAnnotations` function is responsible for filtering annotations based on the selected team.
   *
   * @remarks
   * This function checks if `_teamSelected` is "All" or not defined. If so, it returns all `_nodeAnnotations`.
   * If `_teamSelected` is defined and not "All", it creates a new array `filtered` and iterates over `_nodeAnnotations`.
   * For each annotation in `_nodeAnnotations`, it filters the annotations for the selected team and adds them to `filtered`.
   * The function returns the `filtered` array of annotations.
   *
   * @returns {AnnotationList[]} An array of filtered annotations.
   */
  function filterAnnotations() {
    if (_teamSelected === "All" || !_teamSelected) {
      return _nodeAnnotations;
    }
    const filtered: AnnotationList[] = [];
    _nodeAnnotations.forEach((ann) => {
      const filteredAnn = ann.annotations.filter(
        (a) => a.team === _teamSelected
      );
      if (filteredAnn.length > 0) {
        filtered.push({
          listName: ann.listName,
          nodeId: ann.nodeId,
          annotations: filteredAnn,
        });
      }
    });
    return filtered;
  }

  /**
   * The `renderAnnotations` function is responsible for rendering the list of annotations.
   *
   * @remarks
   * This function first calls the `filterAnnotations` function to get the filtered list of annotations.
   * It then calls the `annotationsListMethod` function with the filtered annotations to get the annotations to render.
   * Finally, it sends a message to the Figma UI to render the list of annotations.
   * The message has a `type` of `AnnotationListAction.RENDER_LIST` and a `payload` of the annotations to render.
   *
   * @internal
   */
  function renderAnnotations() {
    const annotationsFiltered = filterAnnotations();
    const annotationsRender = annotationsListMethod(annotationsFiltered);
    figma.ui.postMessage({
      type: AnnotationListAction.RENDER_LIST,
      payload: annotationsRender,
    });
  }

  /**
   * The `showSnackbar` function is responsible for displaying a snackbar message in the Figma UI.
   *
   * @remarks
   * This function takes a `SnackbarPropsType` object as a parameter, which includes a `msg` property for the message to display,
   * and a `type` property for the type of the message.
   * It first calls the `snackbarContent` function with the `msg` property to get the content of the snackbar.
   * It then sends a message to the Figma UI to display the snackbar.
   * The message has a `type` of the `type` property from the parameter, and a `payload` of the snackbar content.
   *
   * @param {SnackbarPropsType} snackbarMsg - An object with `msg` and `type` properties for the snackbar message.
   */
  function showSnackbar(snackbarMsg: SnackbarPropsType) {
    const content = snackbarContent({ msg: snackbarMsg.msg });
    figma.ui.postMessage({
      type: snackbarMsg.type,
      payload: content,
    });
  }

  /**
   * The `showLoader` function is responsible for displaying or hiding a loader in the Figma UI.
   *
   * @remarks
   * This function takes a string or undefined as a parameter, which represents the loader message.
   * It first calls the `loaderTemplate` function with the `loaderMsg` to get the loader content.
   * It then sends a message to the Figma UI to either display or hide the loader.
   * If `loaderMsg` is defined, it sends a message with a `type` of `ModalAction.OPEN_MODAL` and a `payload` of the loader content.
   * If `loaderMsg` is undefined, it sends a message with a `type` of `ModalAction.CLOSE_MODAL` and an empty `payload`.
   *
   * @param {string | undefined} loaderMsg - The loader message.
   */
  function showLoader(loaderMsg: string | undefined) {
    const loader = loaderTemplate({ msg: loaderMsg });
    figma.ui.postMessage({
      type: loaderMsg ? ModalAction.OPEN_MODAL : ModalAction.CLOSE_MODAL,
      payload: loaderMsg ? loader : "",
    });
  }

  /**
   * The `setTemplate` function is responsible for setting the current template and re-rendering the UI.
   *
   * @remarks
   * This function takes a `TemplatesAvailables` enum value as a parameter, which represents the template to set.
   * It first sets the `_template` variable to the `template` parameter.
   * It then calls the `printTemplate` function to re-render the UI with the new template.
   *
   * @param {TemplatesAvailables} template - The template to set.
   */
  function setTemplate(template: TemplatesAvailables) {
    _template = template;
    printTemplate();
  }

  /**
   * The `setNodeSelected` function is responsible for setting the currently selected node.
   *
   * @remarks
   * This function takes a `SceneNode` or `undefined` as a parameter, which represents the node to set as selected.
   * It sets the `_nodeSelected` variable to the `nodeSelected` parameter.
   *
   * @param {SceneNode | undefined} nodeSelected - The node to set as selected.
   */
  function setNodeSelected(nodeSelected: SceneNode | undefined) {
    _nodeSelected = nodeSelected;
  }

  /**
   * The `locateAnnotationNode` function is responsible for locating a node in the Figma page by its ID and setting it as the current selection.
   *
   * @remarks
   * This function takes a string as a parameter, which represents the ID of the node to locate.
   * It first calls the `findOne` method on the current Figma page with a callback that checks if the node's ID matches the `nodeId` parameter.
   * If a node is found, it scrolls and zooms the viewport into the found node, sets the current selection to the found node, and sets the `_nodeSelected` variable to the found node.
   *
   * @param {string} nodeId - The ID of the node to locate.
   */
  function locateAnnotationNode(nodeId: string) {
    const node = figma.currentPage.findOne((nd) => nd.id === nodeId);
    if (node) {
      node && figma.viewport.scrollAndZoomIntoView([node]);
      figma.currentPage.selection = [node];
      _nodeSelected = node;
    }
  }

  /**
   * The `setTeamSelected` function is responsible for setting the currently selected team and re-rendering the annotations if necessary.
   *
   * @remarks
   * This function takes a string as a parameter, which represents the team to set as selected.
   * It sets the `_teamSelected` variable to the `teamSelected` parameter.
   * If the current template is `TemplatesAvailables.ANNOTATIONS`, it then calls the `renderAnnotations` function to re-render the annotations.
   *
   * @param {string} teamSelected - The team to set as selected.
   */
  function setTeamSelected(teamSelected: string) {
    _teamSelected = teamSelected;
    if (_template === TemplatesAvailables.ANNOTATIONS) {
      renderAnnotations();
    }
  }

  /**
   * The `setTitleValue` function is responsible for setting the title value.
   *
   * @remarks
   * This function takes a string as a parameter, which represents the title value to set.
   * It sets the `_titleValue` variable to the `titleValue` parameter.
   *
   * @param {string} titleValue - The title value to set.
   */
  function setTitleValue(titleValue: string) {
    _titleValue = titleValue;
  }

  /**
   * The `setCommentValue` function is responsible for setting the comment value.
   *
   * @remarks
   * This function takes a string as a parameter, which represents the comment value to set.
   * It sets the `_commentValue` variable to the `commentValue` parameter.
   *
   * @param {string} commentValue - The comment value to set.
   */
  function setCommentValue(commentValue: string) {
    _commentValue = commentValue;
  }

  /**
   * The `setChildrenAnnotations` function is responsible for finding and rendering annotations for the selected node and its children.
   *
   * @remarks
   * This function takes a boolean as a parameter, which indicates whether to include the children of the selected node in the search for annotations.
   * It first shows a loader with the message "Loading annotations...".
   * It then calls the `findAnnotations` function with an object that includes the ID of the selected node and the `childrenAnnotations` parameter.
   * After the annotations have been found, it calls the `renderAnnotations` function to render the annotations.
   * Finally, it hides the loader.
   *
   * @param {boolean} childrenAnnotations - Whether to include the children of the selected node in the search for annotations.
   */
  async function setChildrenAnnotations(childrenAnnotations: boolean) {
    showLoader("Loading annotations...");

    await findAnnotations({
      node: _nodeSelected as ComponentNode,
      childrenToo: childrenAnnotations,
    });
    renderAnnotations();

    showLoader(undefined);
  }

  /**
   * The `mainMenu` function is responsible for setting the selected node, updating the Figma page selection, setting the template, and finding annotations for the selected node.
   *
   * @remarks
   * This function takes a `SceneNode` as a parameter, which represents the node to set as selected.
   * It first calls the `setNodeSelected` function with the `node` parameter to set the selected node.
   * It then updates the Figma page selection to the `node`.
   * It sets the template to `TemplatesAvailables.ANNOTATIONS`.
   * Finally, it calls the `findAnnotations` function with an object that includes the ID of the `node` to find annotations for the `node`.
   *
   * @param {SceneNode} node - The node to set as selected.
   */
  function mainMenu(node: SceneNode) {
    setNodeSelected(node);
    figma.currentPage.selection = [node];
    setTemplate(TemplatesAvailables.ANNOTATIONS);
    findAnnotations({ node: node as ComponentNode });
  }

  /**
   * The `copyPasteMenu` function is responsible for setting the template to `TemplatesAvailables.COPY_PASTE` and re-rendering the annotations.
   *
   * @remarks
   * This function does not take any parameters.
   * It first calls the `setTemplate` function with `TemplatesAvailables.COPY_PASTE` to set the template.
   * It then calls the `renderAnnotations` function to re-render the annotations.
   */
  function copyPasteMenu() {
    setTemplate(TemplatesAvailables.COPY_PASTE);
    renderAnnotations();
  }

  /**
   * This function is called when the plugin is started.
   *
   * @remarks
   * The function first gets all document annotations by calling the `getAllDocumentAnnotations` function and stores the result in the `_fileAnnotations` variable.
   * Then it sets the current template to the "STARTED" template by calling the `setTemplate` function with `TemplatesAvailables.STARTED` as the argument.
   */
  function startedTemplate() {
    _fileAnnotations = getAllDocumentAnnotations();
    setTemplate(TemplatesAvailables.STARTED);
  }

  /**
   * The `requestForm` function is responsible for preparing the form for creating or editing an annotation.
   *
   * @remarks
   * This function takes an optional string as a parameter, which represents the ID of the annotation to edit.
   * If the `id` parameter is provided, it sets `_editMode` to true, finds the parent node and the annotation with the `id`, and loads the annotation data into the form.
   * If the `id` parameter is not provided, it sets `_editMode` to false and resets the form values.
   * Finally, it sets the template to `TemplatesAvailables.INPUT_ANNOTATION`.
   *
   * @param {string | undefined} id - The ID of the annotation to edit.
   */
  function requestForm(id?: string) {
    if (id) {
      _editMode = true;
      const parentNodeId = id.split("--")[0];
      _nodeSelected = figma.currentPage.findOne(
        (nd) => nd.id === parentNodeId
      ) as SceneNode;
      // @ts-ignore
      _annotationSelected = _nodeAnnotations
        .find((a) => a.nodeId === parentNodeId)
        .annotations.find((b) => b.id === id) as AnnotationType;
      // load annotation data to form
      _titleValue = _annotationSelected.title;
      _commentValue = _annotationSelected.comment;
      _teamSelected = _annotationSelected.team;
    } else {
      _editMode = false;
      _titleValue = "";
      _commentValue = "";
      if (_teamSelected === undefined || _teamSelected === "All") {
        _teamSelected = "Accessibility-App";
      }
    }
    setTemplate(TemplatesAvailables.INPUT_ANNOTATION);
  }

  /**
   * The `confirmDelete` function is responsible for opening a confirmation modal before deleting an item.
   *
   * @remarks
   * This function does not take any parameters.
   * It first calls the `confirmTemplate` function to get the modal configuration.
   * It then sends a message to the Figma UI with the type `ModalAction.OPEN_MODAL` and the modal configuration as the payload.
   */
  function confirmDelete() {
    const modal = confirmTemplate();
    figma.ui.postMessage({
      type: ModalAction.OPEN_MODAL,
      payload: modal,
    });
  }

  /**
   * The `cancelDelete` function is responsible for closing the confirmation modal without deleting an item.
   *
   * @remarks
   * This function does not take any parameters.
   * It sends a message to the Figma UI with the type `ModalAction.CLOSE_MODAL` and an empty string as the payload.
   */
  function cancelDelete() {
    figma.ui.postMessage({
      type: ModalAction.CLOSE_MODAL,
      payload: "",
    });
  }

  /**
   * The `annotateIt` function is responsible for creating a new annotation and saving it.
   *
   * @remarks
   * This function does not take any parameters.
   * It first shows a loader with the message "Saving annotation...".
   * It then creates a new annotation with the current date, the selected node ID, and the form values.
   * It calls the `saveAnnotation` function with the new annotation and awaits the result.
   * After the annotation has been saved, it hides the loader and shows a snackbar with the result message.
   * If the save was successful, it resets the form values and calls the `mainMenu` function with the selected node.
   */
  async function annotateIt() {
    showLoader("Saving annotation...");
    const toDay = new Date();
    const date = `${toDay.getDate()}/${
      toDay.getMonth() + 1
    }/${toDay.getFullYear()}`;

    const annotation = {
      nodeId: _nodeSelected?.id as string,
      annotation: {
        id: "", // temporary id
        title: _titleValue,
        comment: _commentValue,
        team: _teamSelected || "Accessibility",
        date,
      },
    };
    const { ok, snackbarMsg } = await saveAnnotation(annotation);

    showLoader(undefined);
    showSnackbar(snackbarMsg);
    if (ok) {
      _titleValue = "";
      _commentValue = "";
      mainMenu(_nodeSelected as SceneNode);
    }
  }

  /**
   * The `editIt` function is responsible for editing an existing annotation and saving the changes.
   *
   * @remarks
   * This function does not take any parameters.
   * It first shows a loader with the message "Editing annotation...".
   * It then creates an edit object with the selected node ID, the selected annotation ID, and the form values.
   * It calls the `editAnnotation` function with the selected node, the selected annotation ID, and the edit data, and awaits the result.
   * After the annotation has been edited, it hides the loader.
   * If the edit was successful, it calls the `mainMenu` function with the selected node and shows a snackbar with the result message.
   */
  async function editIt() {
    showLoader("Editing annotation...");

    const edit = {
      nodeId: _nodeSelected?.id as string,
      annotationId: _annotationSelected?.id as string,
      data: {
        title: _titleValue,
        comment: _commentValue,
        team: _teamSelected,
      },
    };
    const { ok, snackbarMsg } = editAnnotation({
      node: _nodeSelected as SceneNode,
      annotationId: _annotationSelected?.id as string,
      data: edit.data,
    });

    showLoader(undefined);
    if (ok) {
      mainMenu(_nodeSelected as SceneNode);
      showSnackbar(snackbarMsg as SnackbarPropsType);
    }
  }

  /**
   * The `deleteIt` function is responsible for deleting an existing annotation.
   *
   * @remarks
   * This function does not take any parameters.
   * It first shows a loader with the message "Deleting annotation...".
   * It then calls the `deleteAnnotation` function with the selected node and the selected annotation ID.
   * After the annotation has been deleted, it hides the loader.
   * If the deletion was successful, it calls the `mainMenu` function with the selected node and shows a snackbar with the result message.
   */
  async function deleteIt() {
    showLoader("Deleting annotation...");

    const { ok, snackbarMsg } = deleteAnnotation({
      node: _nodeSelected as SceneNode,
      annotationId: _annotationSelected?.id as string,
    });

    showLoader(undefined);
    if (ok) {
      mainMenu(_nodeSelected as SceneNode);
      showSnackbar(snackbarMsg);
    }
  }

  /**
   * The `downloadCsvFile` function is responsible for downloading the annotations as a CSV file.
   *
   * @remarks
   * This function does not take any parameters.
   * It first checks if there are any annotations in the `_nodeAnnotations` array.
   * If there are no annotations, it shows a snackbar with the message "No annotations to download" and returns.
   * If there are annotations, it sends a message to the Figma UI with the type `AnnotationListAction.DOWNLOAD_LIST` and the stringified `_nodeAnnotations` array as the payload.
   */
  function downloadCsvFile() {
    if (_nodeAnnotations.length === 0) {
      showSnackbar({
        type: SnackbarType.SNACKBAR_ERROR,
        msg: "No annotations to download",
      });
      return;
    }
    figma.ui.postMessage({
      type: AnnotationListAction.DOWNLOAD_LIST,
      payload: JSON.stringify(_nodeAnnotations),
    });
  }

  /**
   * The `copyAnnotations` function is responsible for copying annotations from the selected node.
   *
   * @remarks
   * This function does not take any parameters.
   * It first shows a loader with the message "Copying annotations...".
   * It then calls the `copyNodeAnnotations` function with the selected node as a parameter and awaits the result.
   * After the annotations have been copied, it hides the loader.
   * If the copy was successful, it calls the `copyPasteMenu` function.
   * Finally, it shows a snackbar with the result message.
   */
  async function copyAnnotations() {
    showLoader("Copying annotations...");
    const { ok, snackbarMsg } = await copyNodeAnnotations(
      _nodeSelected as ComponentNode
    );
    showLoader(undefined);
    if (ok) {
      copyPasteMenu();
    }
    showSnackbar(snackbarMsg);
  }

  /**
   * The `pasteAnnotations` function is responsible for pasting annotations to the selected node.
   *
   * @remarks
   * This function does not take any parameters.
   * It first shows a loader with the message "Pasting annotations...".
   * It then calls the `pasteNodeAnnotations` function with the selected node as a parameter and awaits the result.
   * After the annotations have been pasted, it hides the loader.
   * If the paste was successful, it calls the `copyPasteMenu` function.
   * Finally, it shows a snackbar with the result message.
   */
  async function pasteAnnotations() {
    showLoader("Pasting annotations...");
    const { ok, snackbarMsg } = await pasteNodeAnnotations(
      _nodeSelected as ComponentNode
    );
    showLoader(undefined);
    if (ok) {
      copyPasteMenu();
    }
    showSnackbar(snackbarMsg);
  }

  // Initial render
  startedTemplate();

  return {
    setNodeSelected,
    locateAnnotationNode,
    setTeamSelected,
    setTitleValue,
    setCommentValue,
    setChildrenAnnotations,
    requestForm,
    mainMenu,
    copyPasteMenu,
    startedTemplate,
    confirmDelete,
    cancelDelete,
    showSnackbar,
    annotateIt,
    editIt,
    deleteIt,
    downloadCsvFile,
    copyAnnotations,
    pasteAnnotations,
  };
}
