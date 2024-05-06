export const selectStyles = /* css */ `
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: var(--color-primary-10);
    appearance: none;
    width: var(--measure-max);
    padding: var(--measure-8) var(--measure-16);
    padding-right: var(--measure-32);
    color: var(--color-primary-100);
    border-radius: var(--measure-8);
    cursor: pointer;
    border-width: var(--measure-1);
    border-style: solid;
    border-color: var(--color-primary-60);
  }
  select:focus {
    border-color: var(--color-primary-100);
    color: var(--color-primary-60);
  }

  .select-icon {
    position: absolute;
    right: var(--measure-16);
    top: 50%;
    transform: translateY(-50%);
  }
  .select-container {
    position: relative;
    width: var(--measure-max);
  }
`;
