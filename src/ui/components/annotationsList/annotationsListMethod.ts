import { AnnotationList } from "../../../types";
import { cleanBreaklineAndSpaces } from "../../../utils/cleanBreaklineAndSpaces";
import { dot } from "../dot/dot";
import { IconsAvailables, icon } from "../icon";

export function annotationsListMethod(annotations: AnnotationList[]) {
  const verifyComment = (cmm: string) => {
    // Replace line breaks with <br> and URLs with <a> tags
    const lineBreakRegex = /(?:\r\n|\r|\n)/g;
    cmm = cmm.replace(lineBreakRegex, "<br>");
    // formmatting URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return cmm.replace(urlRegex, "<a>$1</a>");
  };

  const list = annotations
    .map((item: AnnotationList) => {
      return /*HTML*/ `
        <li class="annotation-group">
          <p class="annotation-group-name">${item.listName}</p>
          <ul class="annotation-group-list">
            ${item.annotations
              .map((ann) => {
                return /*HTML*/ `
                  <li class="annotation-group-list-card card-${ann.team}">
                    <div onclick="locateAnnotation('${item.nodeId}')">
                      <div class="annotation-group-list-card-header">
                        <span class="annotation-group-list-card-header-team">
                          ${ann.team}
                        </span>
                        <span class="annotation-group-list-card-header-date">
                          ${ann.date}
                        </span>
                        ${dot(ann.team)}
                      </div>
                      <div class="annotation-group-list-card-body">
                        ${
                          ann.title
                            ? `<p class="annotation-group-list-card-body-title">${ann.title}</p>`
                            : "\n"
                        }
                        <p class="annotation-group-list-card-body-comment">
                          ${verifyComment(ann.comment)}
                        </p>
                      </div>
                      <div class="annotation-group-list-card-footer footer-${
                        ann.team
                      }">
                        <button class="button-action" onclick="editAnnotation(event, '${
                          ann.id
                        }')">
                          Edit ${icon(IconsAvailables.PENCIL)}
                        </button>
                      </div>
                    </div>
                  </li>
                  `;
              })
              .join("")}
            </ul>
        </li>
      `;
    })
    .join("");

  return cleanBreaklineAndSpaces(list);
}
