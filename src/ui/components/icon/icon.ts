import { ICONS } from "./lib";
import { IconsAvailables } from "./types/icons";

export function icon(icon: IconsAvailables) {
  return /*HTML*/ `${ICONS[icon]}`;
}
