import { IconType, IconsAvailables } from "../types/icons";

import { chevronLeft } from "./chevron-left";
import { chevronDown } from "./chevron-down";
import { layer } from "./layer";
import { dialog } from "./dialog";
import { pencil } from "./pencil";
import { download } from "./download";

export const ICONS: IconType = {
  [IconsAvailables.CHEVRON_DOWN]: chevronDown,
  [IconsAvailables.CHEVRON_LEFT]: chevronLeft,
  [IconsAvailables.LAYER]: layer,
  [IconsAvailables.DIALOG]: dialog,
  [IconsAvailables.PENCIL]: pencil,
  [IconsAvailables.DOWNLOAD]: download,
};
