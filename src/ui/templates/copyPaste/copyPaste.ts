import { ButtonAction } from "../../../types";
import { button, checkbox } from "../../components";
import { IconsAvailables, icon } from "../../components/icon";
import { copyPasteHeader } from "./fragments/copyPasteHeader";

export function copyPasteTemplate() {
  return `
    ${copyPasteHeader}
    ${checkbox({
      id: "childrenAnnotations",
      checked: undefined,
      className: "",
      label: "Include children annotations",
    })}
    ${button({
      id: "copyAnnotations",
      text: "Export Annotations",
      className: "button-primary",
      action: ButtonAction.COPY,
    })}
    ${button({
      id: "pasteAnnotations",
      text: "Import Annotations",
      className: "button-secondary",
      action: ButtonAction.PASTE,
    })}
    ${button({
      id: "downloadAnnotations",
      text: `Download CSV ${icon(IconsAvailables.DOWNLOAD)}`,
      className: "button-action",
      action: ButtonAction.DOWNLOAD_CSV,
    })}
  `;
}
