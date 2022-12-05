# @shakuroinc/eslint-config-react

[Shakuro](https://shakuro.com/) eslint (with React and tailwindcss support) and prettier extensible basic config.

## Usage

### Install package:

`yarn add -D @shakuroinc/eslint-config-react`

### Install package dependencies:

`npx install-peerdeps @shakuroinc/eslint-config-react -d -Y`

> if you using yarn workspaces `npx install-peerdeps @shakuroinc/eslint-config-react -d -Y --extra-args "--ignore-workspace-root-check"`

### Configure `eslint`:

```js
// .eslintrc.js
module.exports = {
  extends: ['@shakuroinc/eslint-config-react'],
  // extend config if needed
};
```

### Configure prettier:

```js
// .prettierrc.js
module.exports = { ...require('@shakuroinc/eslint-config-react/prettier.config') };
```
