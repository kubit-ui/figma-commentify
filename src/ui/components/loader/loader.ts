import { LoaderPropsType } from "../../../types";

export function loaderTemplate({ msg }: LoaderPropsType) {
  return /*HTML*/ `
    <div class="loader"></div>
    <h4>${msg}</h4>
  `;
}
