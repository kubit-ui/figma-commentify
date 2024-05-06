<p align="center">
  <a href="https://kubit-ui.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/cover.png" />
      <img src="./assets/cover.png" width="100%" />
    </picture>
  </a>
</p>

## Getting Started

Follow these steps to get your plugin up and running. You can also find detailed instructions in the [Figma Plugin Quickstart Guide](https://www.figma.com/plugin-docs/plugin-quickstart-guide/).

### Prerequisites

1. **Node.js and NPM**: Download and install Node.js, which includes NPM. This will allow you to install TypeScript and other libraries. You can download it from [here](https://nodejs.org/en/download/).

2. **TypeScript**: Install TypeScript globally using the following command:

```bash
npm install -g typescript
```

3. **Figma Plugin** API Type Definitions: In your plugin directory, get the latest type definitions for the Figma Plugin API by running:

```bash
npm install --save-dev @figma/plugin-typings
```

## TypeScript Overview

If you're familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code is already valid TypeScript code.

TypeScript adds type annotations to variables, which allows code editors like Visual Studio Code to provide information about the Figma API while you're writing code, and helps catch bugs you might not have noticed otherwise.

For more information, visit the [TypeScript website](https://www.typescriptlang.org/).

## Compiling TypeScript

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js) for the browser to run.

We recommend writing TypeScript code using Visual Studio Code:

1. Download Visual Studio Code if you haven't already from here.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item, then select "npm: watch". You will have to do this again every time you reopen Visual Studio Code.
   That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
