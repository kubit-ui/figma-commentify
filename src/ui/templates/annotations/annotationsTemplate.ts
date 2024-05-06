import { AnnotationTemplateProps, ButtonAction } from "../../../types";
import { button, checkbox, select } from "../../components";

export function annotationsTemplate(props: AnnotationTemplateProps) {
  const teams = [
    { value: "All", text: "All" },
    { value: "Accessibility-App", text: "Accessibility-App" },
    { value: "Accessibility-Web", text: "Accessibility-Web" },
    { value: "Analytics", text: "Analytics" },
    { value: "Poeditor", text: "Poeditor" },
  ];
  return `
    <p class="annotations-title">Selected layer: <b>${props.component}</b></p>
    ${select({
      options: teams,
      className: "",
      currentOption: props.select?.preSelected || "",
      id: "teams-available",
    })}
    ${checkbox({
      id: "childrenAnnotations",
      checked: props.checkbox?.checked,
      className: "",
      label: "Include children annotations",
    })}
    ${button({
      id: "add-annotations",
      text: "Add Annotation",
      className: "button-primary",
      action: ButtonAction.ADD_ANNOTATION,
    })}
    ${button({
      id: "manage-annotations",
      text: "Manage Annotations",
      className: "button-secondary",
      action: ButtonAction.IMPORT_EXPORT,
    })}
  `;
}
