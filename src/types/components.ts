/**
 * Buttton
 */
export enum ButtonAction {
  ADD_ANNOTATION = "ADD_ANNOTATION",
  ANNOTATIONS = "ANNOTATIONS",
  CLOSE = "CLOSE",
  DOWNLOAD_CSV = "DOWNLOAD_CSV",
  IMPORT_EXPORT = "IMPORT_EXPORT",
  SUBMIT = "SUBMIT",
  EDIT = "EDIT",
  COPY = "COPY",
  DELETE = "DELETE",
  CONFIRM_DELETE = "CONFIRM_DELETE",
  CANCEL_DELETE = "CANCEL_DELETE",
  PASTE = "PASTE",
}
export type ButtonPropsType = {
  text: string;
  action: ButtonAction;
  id: string;
  className: string;
};
// button

/**
 * Select
 */
export enum SelectAction {
  SELECT_OPTION = "SELECT_OPTION",
}
export enum SelectMesssageType {
  SET_SELECT_OPTIONS = "SET_SELECT_OPTIONS",
}
export type SelectPropsType = {
  id: string;
  className: string;
  options: { value: string; text: string }[];
  currentOption: string;
};
// select

/**
 * Snackbar
 */
export enum SnackbarType {
  SNACKBAR_ERROR = "SNACKBAR_ERROR",
  SNACKBAR_SUCCESS = "SNACKBAR_SUCCESS",
}
export type SnackbarPropsType = {
  type: SnackbarType;
  msg: string;
};
// Snackbar

/**
 * Input
 */
export enum InputAction {
  TITLE_ONCHANGE = "TITLE_ONCHANGE",
}
export type InputPropsType = {
  id: string;
  className: string;
  placeholder: string;
  value: string;
};
// Input

/**
 * Textarea
 */
export enum TextareaAction {
  DESCRIPTION_ONCHANGE = "DESCRIPTION_ONCHANGE",
}
export type TextareaPropsType = {
  id: string;
  className: string;
  placeholder: string;
  value: string;
};
// Textarea

/**
 * AnnotationList
 */
export enum AnnotationListAction {
  EDIT_ANNOTATION = "EDIT_ANNOTATION",
  LOCATE_ANNOTATION = "LOCATE_ANNOTATION",
  RENDER_LIST = "RENDER_LIST",
  OPEN_URL = "OPEN_URL",
  DOWNLOAD_LIST = "DOWNLOAD_LIST",
}
export enum AnnotationMesssageType {
  RENDER_LIST = "RENDER_LIST",
}
export type AnnotationList = {
  nodeId: string;
  listName: string;
  annotations: AnnotationType[];
};
export type AnnotationType = {
  id: string;
  team: string;
  title: string;
  comment: string;
  date: string;
};
export type AnnotationListPropsType = {
  id: string;
};
// AnnotationList

/**
 *  File list Annotations
 */
export type FileSingleAnnotationType = {
  nodeName: string;
  ["Accesibility-Web"]?: number;
  ["Accesibility-App"]?: number;
  Poeditor?: number;
  Analytics?: number;
};
export type FileListAnnotationsType = {
  [nodeId: string]: FileSingleAnnotationType;
};
// File list annotations

/**
 * Checkbox
 */
export enum CheckboxAction {
  CHECKBOX_ONCHANGE = "CHECKBOX_ONCHANGE",
}
export type CheckboxPropsType = {
  id: string;
  className: string;
  checked?: boolean;
  label: string;
};
// Checkbox

/**
 * Loader !!DELETED
 */
export type LoaderPropsType = {
  msg?: string;
};
// loader

/**
 * Modal
 */
export enum ModalAction {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}
export type ModalPropsType = {
  id: string;
};
// Modal
