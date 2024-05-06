import { FileListAnnotationsType } from "../../../../types";
import { fileList } from "../../../components";

export function startedTemplateContent(fileAnn: FileListAnnotationsType) {
  return /* html */ `
    <div class="started-content">
      <p>Nodes with annotations:</p>
      ${fileList(fileAnn)}
    </div>
  `;
}
