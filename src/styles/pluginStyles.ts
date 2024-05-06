// foundations
import { FOUNDATIONS } from "./foundations";
// components
import {
  buttonStyles,
  selectStyles,
  inputStyles,
  fileListStyles,
  dotStyles,
  dotListStyles,
  annotationListStyles,
  textareaStyles,
  checkboxStyles,
  modalStyles,
  snackbarStyles,
  loaderStyles,
} from "../ui/components/stylesIndex";
// templates
import {
  annotationsTemplateStyles,
  confirmTemplateStyles,
  copyPasteTemplateStyles,
  footerStyles,
  formTemplateStyles,
  startedTemplateStyles,
} from "../ui/templates/stylesIndex";

export function pluginStyles() {
  return /*html*/ `
    <style>
      /* Foundations */
      ${FOUNDATIONS}
      /* Components styles */
      ${annotationListStyles}
      ${buttonStyles}
      ${checkboxStyles}
      ${dotStyles}
      ${dotListStyles}
      ${fileListStyles}
      ${inputStyles}
      ${loaderStyles}
      ${snackbarStyles}
      ${selectStyles}
      ${modalStyles}
      ${textareaStyles}
      
      /* Template Styles */
      ${annotationsTemplateStyles}
      ${confirmTemplateStyles}
      ${copyPasteTemplateStyles}
      ${formTemplateStyles}
      ${startedTemplateStyles}
      ${footerStyles}
    </style>
  `;
}
