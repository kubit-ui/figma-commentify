export const annotationListStyles = /*css*/ `
  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
  }
  ul li {
    width: 100%;
    margin: 0px;
    list-style: none;
  }
  .annotation-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .annotation-group:last-child {
    padding-bottom: var(--measure-88);
  }
  .annotation-group-name {
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-700);
    margin-bottom: var(--measure-24);
    margin-top: var(--measure-24);
  }
  .annotation-group-list {
    gap: var(--measure-16);
  }
  .annotation-group-list-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-width: var(--measure-1);
    border-style: solid;
    border-radius: var(--measure-24);
    cursor: pointer;
    overflow: hidden;
  }
  .card-accessibility-app {
    border-color: var(--color-decorative-a-100);
    box-shadow: var(--shadow-1) var(--color-decorative-a-10);
  }
  .card-accessibility-web {
    border-color: var(--color-decorative-b-100);
    box-shadow: var(--shadow-1) var(--color-decorative-b-10)
  }
  .card-analytics {
    border-color: var(--color-decorative-c-100);
    box-shadow: var(--shadow-1) var(--color-decorative-c-10)
  }
  .card-poeditor {
    border-color: var(--color-decorative-d-100);
    box-shadow: var(--shadow-1) var(--color-decorative-d-10)
  }
  .annotation-group-list-card-header{
    width: var(--measure-max);
    display: flex;
    gap: var(--measure-8);
    padding: var(--measure-24);
    padding-bottom: var(--measure-8);
    align-items: center;
  }
  .annotation-group-list-card-header-team {
    font-size: var(--font-size-18);
    line-height: var(--measure-24);
    font-weight: var(--font-weight-700);
    flex: 1;
  }
  .annotation-group-list-card-header-date {
    font-size: var(--font-size-12);
    line-height: var(--measure-24);
    color: var(--color-primary-80);
  }
  .annotation-group-list-card-body{
    width: var(--measure-max);
    display: flex;
    flex-direction: column;
    gap: var(--measure-8);
    padding: var(--measure-24);
    padding-top: var(--measure-16);
  }
  .annotation-group-list-card-body-title{
    font-size: var(--font-size-14);
    line-height: var(--measure-20);
    font-weight: var(--font-weight-700);
  }
  .annotation-group-list-card-body-comment{
    font-size: var(--font-size-14);
    line-height: var(--measure-20);
    color: var(--color-primary-80);
    font-weight: var(--font-weight-400);
  }
  .annotation-group-list-card-footer{
    width: var(--measure-max);
    padding: var(--measure-24);
  }
  .footer-accessibility-app {
    background-color: var(--color-decorative-a-10);
  }
  .footer-accessibility-web {
    background-color: var(--color-decorative-b-10);
  }
  .footer-analytics {
    background-color: var(--color-decorative-c-10);
  }
  .footer-poeditor {
    background-color: var(--color-decorative-d-10);
  }
  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    word-break: break-word;
    color: #18A0FB;
  }
`;
