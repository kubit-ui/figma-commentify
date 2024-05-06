import { AnnotationType } from "./components";

export type CopyNodeAnnotationsProps = {
  node: ComponentNode;
  annotations: {};
  key?: string;
};

export type GetAnnotationsProps = {
  node: ComponentNode;
  key?: string;
  annotations: {};
};

export type getChildrenAnnotationsProps = {
  node: ComponentNode;
  childrenToo?: boolean;
};

export type SaveAnnotationProps = {
  nodeId: string;
  annotation: AnnotationType;
};

export type EditAnnotationProps = {
  node: SceneNode;
  annotationId: string;
  data: {};
};

export type DeleteAnnotationProps = {
  node: SceneNode;
  annotationId: string;
};
