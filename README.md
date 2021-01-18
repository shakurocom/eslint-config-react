# @shakuroinc/eslint-config-react

This package provides Shakuro's eslint and prettier as an extensible shared config.

## Usage

- install main package: ` yarn add -D @shakuroinc/eslint-config-react` or `npm i -D @shakuroinc/eslint-config-react`

- install package dependencies: `npx install-peerdeps @shakuroinc/eslint-config-react -d -Y` (if you using yarn workspaces `npx install-peerdeps @shakuroinc/eslint-config-react -d -Y --extra-args "--ignore-workspace-root-check"`)

- add `"extends": "@shakuroinc/eslint-config-react"` to your `.eslintrc` file

- extend some rules if needed

- setup prettier: `.prettierrc.js` with: `module.exports = { ...require("@shakuroinc/eslint-config-react/prettier.config") }`
