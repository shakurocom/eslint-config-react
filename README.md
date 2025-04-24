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

## Give it a try and reach us

Explore our expertise in <a href="https://shakuro.com/services/native-mobile-development/?utm_source=github&utm_medium=repository&utm_campaign=eslint">Native Mobile Development</a> and <a href="https://shakuro.com/services/ios-dev/?utm_source=github&utm_medium=repository&utm_campaign=eslint">iOS Development</a>.</p>

If you need professional assistance with your mobile or web project, feel free to <a href="https://shakuro.com/get-in-touch/?utm_source=github&utm_medium=repository&utm_campaign=eslint">contact our team</a>
