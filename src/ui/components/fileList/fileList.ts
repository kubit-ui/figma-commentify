import {
  FileListAnnotationsType,
  FileSingleAnnotationType,
} from "../../../types";
import { cleanBreaklineAndSpaces } from "../../../utils/cleanBreaklineAndSpaces";
import { IconsAvailables, icon } from "../icon";
import { dotList } from "../dotList/dotList";

const annotationsAvailable = (
  dots: Omit<FileSingleAnnotationType, "nodeName">
) => {
  return Object.values(dots).reduce((acc, crr) => acc + crr, 0);
};

export function fileList(fileAnn: FileListAnnotationsType) {
  const listStructure = Object.entries(fileAnn)
    .map(([key, value]) => {
      const { nodeName, ...dots } = value;
      return /* html */ `
      <div class="file-list-container" onclick="locateAnnotation('${key}')">
        ${dotList(dots)}
        <span class="file-list-container-name">${nodeName}</span>
        <div class="file-list-container-notify">
          ${icon(IconsAvailables.DIALOG)} <span>${annotationsAvailable(
        dots
      )}</span>
        </div>
      </div>
    `;
    })
    .join("");

  return /* html */ `
    <div class="file-list">${cleanBreaklineAndSpaces(listStructure)}</div>
  `;
}
