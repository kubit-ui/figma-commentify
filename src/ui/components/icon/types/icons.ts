export enum IconsAvailables {
  CHEVRON_DOWN = "CHEVRON_DOWN",
  CHEVRON_LEFT = "CHEVRON_LEFT",
  LAYER = "LAYER",
  DIALOG = "DIALOG",
  PENCIL = "PENCIL",
  DOWNLOAD = "DOWNLOAD",
}

export type IconType = {
  [I in IconsAvailables]: string;
};
