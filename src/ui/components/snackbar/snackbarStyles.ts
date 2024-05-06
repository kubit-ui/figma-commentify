const commonRules = `
  padding: var(--measure-12) var(--measure-16);
  text-align: center;
  font-size: var(--font-size-12);
  border-radius: var(--measure-8);
  box-shadow: 0px 2px 8px 0px rgba(132, 135, 194, 0.25);
  border-width: var(--measure-1);
  border-style: solid;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: var(--measure-4);
  width: var(--measure-max);
`;

export const snackbarStyles = /*css*/ `
.feedback-success {
  ${commonRules}
  border-color: green;
  background: rgb(232, 246, 232);
  color: green;
}
.feedback-error {
  ${commonRules}
  border-color: red;
  background: rgb(246, 232, 232);
  color: red;
}
`;
