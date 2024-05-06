import { SnackbarPropsType, SnackbarType } from "../../../types";

export function snackbar({ id }: { id: string }) {
  return /*html*/ `<span id="${id}" style="display:none"></span>`;
}
