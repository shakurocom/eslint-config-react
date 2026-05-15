/**
 * Shared Prettier base config.
 *
 * Tailwind v4 keys (consumed by `prettier-plugin-tailwindcss`) are set to
 * sensible Shakuro defaults. Consumers usually only need to override
 * `tailwindStylesheet` to point at their own globals.css:
 *
 *   const base = require('@shakuroinc/eslint-config-react/prettier');
 *   module.exports = {
 *     ...base,
 *     tailwindStylesheet: './packages/ui/src/styles/globals.css',
 *   };
 *
 * Override `tailwindFunctions` / `tailwindAttributes` only if your project uses
 * non-default helpers (e.g. `twMerge`, custom class-name props).
 */
/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  tailwindFunctions: ['cn', 'clsx', 'cva', 'tv'],
  tailwindAttributes: ['className', 'classNames', '.*ClassName'],
};
