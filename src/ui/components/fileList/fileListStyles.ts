export const fileListStyles = /* css */ `
  .file-list {
    display: flex;
    flex-direction: column;
    gap: var(--measure-8);
    width: var(--measure-max);
    align-items: center;
    padding-bottom: var(--measure-88);
  }
  .file-list-container {
    display: flex;
    width: var(--measure-max);
    padding: var(--measure-8);
    padding: var(--measure-16) var(--measure-24);
    gap: var(--measure-8);
    border-radius: var(--measure-24);
    border-width: var(--measure-1);
    border-style: solid;
    border-color: var(--color-primary-80);
    cursor: pointer;
  }
  .file-list-container-name {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .file-list-container-notify {
    display: flex;
    align-items: center;
    gap: var(--measure-4);
  }
`;
