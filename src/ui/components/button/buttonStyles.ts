export const buttonStyles = /* css */ `
    button {
      width: var(--measure-max);
      padding: var(--measure-8);
      cursor: pointer;
      border-radius: var(--measure-40);
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
    /* BUTTON PRIMARY */
    .button-primary {
      background-color: var(--color-primary-100);
      color: var(--color-primary-20);
    }
    .button-primary:hover {
      background-color: var(--color-primary-100);
      color: var(--color-primary-10);
    }
    .button-primary:active {
      background-color: var(--color-primary-80);
      color: var(--color-primary-10);
    }

    /* BUTTON SECONDARY */
    .button-secondary {
      background-color: var(--color-primary-10);
      color: var(--color-primary-100);
      border: var(--measure-1) solid var(--color-primary-60);
    }
    .button-secondary:hover {
      background-color: var(--color-primary-20);
      color: var(--color-primary-80);
      border: var(--measure-1) solid var(--color-primary-60);
    }
    .button-secondary:active {
      background-color: var(--color-primary-40);
      color: var(--color-primary-80);
      border: var(--measure-1) solid var(--color-primary-60);
    }

    /* BUTTON ACTION */
    .button-action {
      background-color: transparent;
      color: var(--color-primary-100);
      text-decoration: underline;
      width: fit-content;
      padding: 0;
      border-radius: 0;
      gap: var(--measure-8);
    }
    .button-action:hover {
      text-decoration: none;
    }
    .button-action:active {
      background-color: var(--color-primary-20);
      text-decoration: none;
    }
  `;
