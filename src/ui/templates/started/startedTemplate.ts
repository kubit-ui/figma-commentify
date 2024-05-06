import { FileListAnnotationsType } from "../../../types";
import { startedTemplateHeader, startedTemplateContent } from "./fragments";

export function startedTemplate(fileAnn: FileListAnnotationsType) {
  return `
    ${startedTemplateHeader()}
    ${Object.keys(fileAnn).length > 0 ? startedTemplateContent(fileAnn) : ""}
  `;
}
