import { icon, IconsAvailables } from "../../../components/icon";

export function startedTemplateHeader() {
  return /* html */ `
    <div class="started-header">
      ${icon(IconsAvailables.LAYER)}
      <p>Select a Layer to start</p>
    </div>
  `;
}
