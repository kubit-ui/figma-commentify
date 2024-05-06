import { SnackbarType, AnnotationList } from "./components";

export enum TemplatesAvailables {
  // ACTION = "ACTION",
  STARTED = "STARTED",
  ANNOTATIONS = "ANNOTATIONS",
  INPUT_ANNOTATION = "INPUT_ANNOTATION",
  COPY_PASTE = "COPY_PASTE",
}

export type TemplateArgsType = {
  template: TemplatesAvailables;
  list?: AnnotationList[];
  loaderMsg?: string;
  snackbarMsg?: { type: SnackbarType; msg: string };
};

export type FormTemplateProps = {
  component: string;
  select?: {
    preSelected: string;
  };
  input?: { value: string };
  textarea?: { value: string };
  editMode?: boolean;
};

export type AnnotationTemplateProps = {
  component: string;
  select?: {
    preSelected: string;
  };
  checkbox?: { checked: boolean };
};
