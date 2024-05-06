import {
  AnnotationListAction,
  ButtonAction,
  CheckboxAction,
  InputAction,
  SelectAction,
  SendMessagePropsType,
  SnackbarType,
  TextareaAction,
} from "./src/types";
import { templateManager } from "./manager";

const manager = templateManager();

figma.loadAllPagesAsync();

/**
 * This function is an event listener for changes in the Figma document's selection.
 *
 * @remarks
 * The function is called asynchronously whenever the selection changes.
 * It first gets the current selection from the current page of the Figma document.
 * If there is more than one node selected, it shows a snackbar with an error message and returns.
 * If there is no node selected, it calls the `startedTemplate` method of the `manager` object and returns.
 * If there is exactly one node selected, it calls the `mainMenu` method of the `manager` object with the selected node.
 */
figma.on("selectionchange", async () => {
  const selection = figma.currentPage.selection;
  if (selection.length > 1) {
    manager.showSnackbar({
      type: SnackbarType.SNACKBAR_ERROR,
      msg: "Select only one layer",
    });
    return;
  } else if (selection[0] === undefined) {
    manager.startedTemplate();
    return;
  }

  manager.mainMenu(selection[0]);
});

/**
 * This function is an event listener for messages from the Figma UI.
 *
 * @remarks
 * The function takes an object as a parameter, which includes the type of the action and the payload.
 * It uses a switch statement to handle different types of actions.
 * Depending on the type of the action, it calls a different method of the `manager` object.
 * For some actions, it also passes the payload to the method.
 * The actions include showing the main menu, requesting a form, downloading a CSV file, showing the copy/paste menu, closing the plugin, annotating, editing, confirming deletion, cancelling deletion, deleting, copying annotations, pasting annotations, selecting an option, changing the title, changing the description, editing an annotation, locating an annotation, opening a URL, and changing a checkbox.
 *
 * @param {SendMessagePropsType} { type, payload } - The properties for the function, including the type of the action and the payload.
 */
figma.ui.onmessage = async ({ type, payload }: SendMessagePropsType) => {
  switch (type) {
    case ButtonAction.ANNOTATIONS:
      manager.mainMenu(figma.currentPage.selection[0]);
      break;
    case ButtonAction.ADD_ANNOTATION:
      manager.requestForm();
      break;
    case ButtonAction.DOWNLOAD_CSV:
      manager.downloadCsvFile();
      break;
    case ButtonAction.IMPORT_EXPORT:
      manager.copyPasteMenu();
      break;
    case ButtonAction.CLOSE:
      figma.closePlugin();
      break;
    case ButtonAction.SUBMIT:
      await manager.annotateIt();
      break;
    case ButtonAction.EDIT:
      await manager.editIt();
      break;
    case ButtonAction.CONFIRM_DELETE:
      manager.confirmDelete();
      break;
    case ButtonAction.CANCEL_DELETE:
      manager.cancelDelete();
      break;
    case ButtonAction.DELETE:
      manager.deleteIt();
      break;
    case ButtonAction.COPY:
      manager.copyAnnotations();
      break;
    case ButtonAction.PASTE:
      manager.pasteAnnotations();
      break;
    case SelectAction.SELECT_OPTION:
      manager.setTeamSelected(payload as string);
      break;
    case InputAction.TITLE_ONCHANGE:
      manager.setTitleValue(payload || "");
      break;
    case TextareaAction.DESCRIPTION_ONCHANGE:
      manager.setCommentValue(payload as string);
      break;
    case AnnotationListAction.EDIT_ANNOTATION:
      manager.requestForm(payload as string);
      break;
    case AnnotationListAction.LOCATE_ANNOTATION:
      manager.locateAnnotationNode(payload as string);
      break;
    case AnnotationListAction.OPEN_URL:
      figma.openExternal(payload as string);
      break;
    case CheckboxAction.CHECKBOX_ONCHANGE:
      manager.setChildrenAnnotations(payload as unknown as boolean);
      break;
  }
};
