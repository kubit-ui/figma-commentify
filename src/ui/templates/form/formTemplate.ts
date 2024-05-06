import { formTemplateHeader } from "./fragments/formTemplateHeader";
import { button, input, select, textarea } from "../../components";
import { ButtonAction, FormTemplateProps } from "../../../types";

export function formTemplate(props?: FormTemplateProps) {
  const options = [
    { value: "Accessibility-App", text: "Accessibility-App" },
    { value: "Accessibility-Web", text: "Accessibility-Web" },
    { value: "Analytics", text: "Analytics" },
    { value: "Poeditor", text: "Poeditor" },
  ];
  return `
    ${formTemplateHeader(props?.component ?? "", props?.editMode)}
    ${select({
      id: "annotation-team",
      options,
      className: "select",
      currentOption: props?.select?.preSelected || "",
    })}
    ${input({
      id: "annotationTitle",
      placeholder: "Annotation Title",
      value: props?.input?.value || "",
      className: "input",
    })}
    ${textarea({
      id: "annotationDescription",
      placeholder: "Annotation Description",
      value: props?.textarea?.value || "",
      className: "textarea",
    })}
    ${button({
      id: "saveAnnotation",
      text: props?.editMode ? "Edit it" : "Annotate it",
      className: "button-primary",
      action: props?.editMode ? ButtonAction.EDIT : ButtonAction.SUBMIT,
    })}
    ${
      props?.editMode
        ? button({
            id: "deleteAnnotation",
            text: "Delete Annotation",
            className: "button-secondary",
            action: ButtonAction.CONFIRM_DELETE,
          })
        : ""
    }
  `;
}
