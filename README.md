# @shakuroinc/eslint-config-react

[Shakuro](https://shakuro.com/) shared ESLint + Prettier config for React projects.

**v7** is a flat-config rewrite targeting:

- ESLint 9 / 10 (flat config only — `eslint.config.js`)
- React 19
- Tailwind CSS v4 (`eslint-plugin-tailwindcss@4.x` beta)
- `eslint-plugin-react-hooks@7`
- `typescript-eslint@8`
- Prettier 3 with `prettier-plugin-tailwindcss@0.8`

> Upgrading from v6? See [Migration from v6](#migration-from-v6) below.

## Install

```sh
pnpm add -D @shakuroinc/eslint-config-react
```

Install the peer dependencies. The config does not bundle plugins — your project
owns the versions, so updating a plugin doesn't require a new release of this
package.

```sh
pnpm add -D \
  eslint \
  eslint-config-prettier \
  eslint-mdx \
  eslint-plugin-mdx \
  eslint-plugin-prettier \
  eslint-plugin-react-hooks \
  eslint-plugin-simple-import-sort \
  eslint-plugin-tailwindcss@4.0.0-beta.0 \
  globals \
  prettier \
  prettier-plugin-tailwindcss \
  typescript-eslint
```

## Configure ESLint

The package exports a **factory function**. Call it with your project options
and spread the result into your flat config.

```js
// eslint.config.js
const { resolve } = require('node:path');
const shakuroConfig = require('@shakuroinc/eslint-config-react');

module.exports = shakuroConfig({
  tailwindStylesheet: resolve(__dirname, 'packages/ui/src/styles/globals.css'),
});
```

### Composing with other configs

`shakuroConfig()` returns an array, so you can prepend or append your own
blocks. A typical Next.js setup looks like this:

```js
/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
const { resolve } = require('node:path');

const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const shakuroConfig = require('@shakuroinc/eslint-config-react');

module.exports = [
  ...nextCoreWebVitals,
  ...shakuroConfig({
    tailwindStylesheet: resolve(__dirname, 'packages/ui/src/styles/globals.css'),
  }),
];
```

### Factory options

| Option               | Type                  | Default                                              | Description                                                                                                                            |
| -------------------- | --------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `tailwindStylesheet` | `string`              | `undefined`                                          | Absolute path to your Tailwind v4 entry CSS file. Forwarded to the plugin's `config` setting.                                          |
| `tailwindCallees`    | `string[]`            | `['cn', 'clsx', 'cva', 'tv']`                        | Function names whose string arguments contain Tailwind class names.                                                                    |
| `tailwindWhitelist`  | `string[]`            | See [Default whitelist](#default-tailwind-whitelist) | Regex patterns ignored by `tailwindcss/no-custom-classname`.                                                                           |
| `ignores`            | `string[]`            | `[]`                                                 | Extra globs appended to the default ignore list.                                                                                       |
| `reactVersion`       | `string`              | `'19.0'`                                             | Pinned React version for `eslint-plugin-react`. **Do not set to `'detect'`** — it's broken under ESLint 10 in current plugin versions. |
| `next`               | `{ rootDir: string }` | `undefined`                                          | Forwarded to `settings.next` for `eslint-plugin-next`.                                                                                 |

### Default ignores

```text
**/node_modules/**
**/public/**
**/dist/**
**/dist_keycloak/**
**/.next/**
**/.turbo/**
**/coverage/**
**/storybook-static/**
**/next-env.d.ts
**/*.json.ts
**/importMap.js
```

Append more via the `ignores` option.

### Default Tailwind whitelist

```text
pf-.*
g-recaptcha
cn-input-otp
-?translate-x-\\[[-]?50%\\]
```

### Named exports

The factory is also available under several named exports for advanced use:

```js
const shakuroConfig = require('@shakuroinc/eslint-config-react');

const {
  sharedRules, // The rule map applied to JS/TS/JSX/TSX files.
  mdxRuleOverrides, // Rule overrides applied to .md/.mdx blocks.
  DEFAULT_IGNORES,
  DEFAULT_TAILWIND_CALLEES,
  DEFAULT_TAILWIND_WHITELIST,
} = shakuroConfig;
```

This is useful if you want to drop the rule set into your own custom flat-config
block instead of using the factory.

## Configure Prettier

Most projects only need to point `tailwindStylesheet` at their own globals.css:

```js
// prettier.config.js
module.exports = {
  ...require('@shakuroinc/eslint-config-react/prettier'),
  tailwindStylesheet: './src/styles/globals.css',
};
```

The base config sets:

```js
{
  arrowParens: 'avoid',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  // prettier-plugin-tailwindcss (v4):
  tailwindFunctions: ['cn', 'clsx', 'cva', 'tv'],
  tailwindAttributes: ['className', 'classNames', '.*ClassName'],
}
```

## What's included

- `typescript-eslint`'s `recommended` flat preset.
- `eslint-plugin-react-hooks` (legacy + v7 rules — only the classic ones are
  pinned; v7 introduces new rules like `react-hooks/refs` and
  `react-hooks/set-state-in-effect`, which are inherited at their plugin
  defaults and surface real issues you should fix).
- `eslint-plugin-simple-import-sort` with the Shakuro import grouping
  (`react`/`next` → vendors → `@shakuroinc`/`@sh` → project aliases → relative
  → side-effect CSS).
- `eslint-plugin-tailwindcss@4` with class-order disabled (Prettier handles
  ordering) and `no-contradicting-classname` enabled.
- `eslint-plugin-prettier` + `eslint-config-prettier` so formatting violations
  surface as lint errors.
- MDX support via `eslint-plugin-mdx` (optional peer).
- A `padding-line-between-statements` rule preserving the previous Shakuro
  spacing conventions.

## Migration from v6

| v6 (legacy)                                                        | v7 (flat config)                                                                                                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `.eslintrc.js` with `extends: ['@shakuroinc/eslint-config-react']` | `eslint.config.js` calling `shakuroConfig({ ... })` (see above)                                                           |
| `main: '.eslintrc.js'`                                             | `main: 'eslint.config.js'`, named export `./prettier`                                                                     |
| ESLint ≥ 8.29                                                      | ESLint ≥ 9                                                                                                                |
| `eslint-plugin-react@7.31.11`, `react-hooks@4`                     | `eslint-plugin-react@^7.37` (inherited from your config), `react-hooks@7`                                                 |
| `tailwindcss@3.x` plugin, class-order on                           | `tailwindcss@4.x` plugin, class-order off (Prettier handles it)                                                           |
| `@typescript-eslint/padding-line-between-statements`               | Stock `padding-line-between-statements` (TS-only selectors dropped — install `@stylistic/eslint-plugin` if you need them) |
| `prettier-plugin-tailwindcss@0.2`                                  | `prettier-plugin-tailwindcss@0.8` with `tailwindStylesheet` for v4                                                        |

### Breaking rule changes

- `tailwindcss/classnames-order` is **off** — Prettier sorts classes via
  `prettier-plugin-tailwindcss`. Run prettier `--write` once on the codebase
  before enforcing.
- Legacy `eslint-plugin-import` overrides are dropped. If your project uses
  `eslint-config-next`, the import plugin comes along for the ride; otherwise
  add it yourself in a follow-up block.
- `naming-convention` no longer flags string-literal object keys or numeric
  keys — pre-existing `// eslint-disable-next-line @typescript-eslint/naming-convention`
  comments above those constructs will be reported as unused.
- `@typescript-eslint/no-var-requires` was renamed to
  `@typescript-eslint/no-require-imports`. Update any local disable comments.

## Give it a try and reach us

Explore our expertise in <a href="https://shakuro.com/services/native-mobile-development/?utm_source=github&utm_medium=repository&utm_campaign=eslint">Native Mobile Development</a> and <a href="https://shakuro.com/services/ios-dev/?utm_source=github&utm_medium=repository&utm_campaign=eslint">iOS Development</a>.</p>

If you need professional assistance with your mobile or web project, feel free to <a href="https://shakuro.com/get-in-touch/?utm_source=github&utm_medium=repository&utm_campaign=eslint">contact our team</a>
Override `tailwindFunctions` or `tailwindAttributes` only if your project uses
non-default helpers (e.g. `twMerge`) or custom class-name prop names.

## License

MIT
