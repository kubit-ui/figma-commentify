import { FileSingleAnnotationType } from "../../../types";
import { dot } from "../dot/dot";

export function dotList(teams: Omit<FileSingleAnnotationType, "nodeName">) {
  const teamsAvailable = Object.keys(teams);

  const containerWidth = 16 + (teamsAvailable.length - 1) * 8;

  const dotOrdered = teamsAvailable
    .map((team, idx) => {
      const translate = `transform: translateX(-${idx * 50}%);`;
      return /*html*/ `<span style="${translate}">${dot(team)}</span>`;
    })
    .join("");

  return /*html*/ `
    <div class="dot-list" style="width:${containerWidth}px">
      ${dotOrdered}
    </div>
  `;
}
