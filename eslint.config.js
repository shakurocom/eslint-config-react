// @ts-check
/**
 * @shakuroinc/eslint-config-react — flat config for ESLint 9+.
 *
 * Usage:
 *   // eslint.config.js
 *   const shakuroConfig = require('@shakuroinc/eslint-config-react');
 *
 *   module.exports = shakuroConfig({
 *     tailwindStylesheet: './src/styles/globals.css',
 *     ignores: ['custom/**'],
 *   });
 *
 * You can also spread the result and append your own blocks:
 *   module.exports = [
 *     ...shakuroConfig(),
 *     { rules: { 'no-console': 'off' } },
 *   ];
 */

// @ts-ignore
const tseslint = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tailwindcss = require('eslint-plugin-tailwindcss');
const reactHooks = require('eslint-plugin-react-hooks');
const mdx = require('eslint-plugin-mdx');
const globals = require('globals');

const DEFAULT_IGNORES = [
  '**/node_modules/**',
  '**/public/**',
  '**/dist/**',
  '**/dist_keycloak/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/coverage/**',
  '**/storybook-static/**',
  '**/next-env.d.ts',
  '**/*.json.ts',
  '**/importMap.js',
];

const DEFAULT_TAILWIND_CALLEES = ['cn', 'clsx', 'cva', 'tv'];

const DEFAULT_TAILWIND_WHITELIST = [
  'pf-.*',
  'g-recaptcha',
  'cn-input-otp',
  '-?translate-x-\\[[-]?50%\\]',
];

/** Shared lint rules (TypeScript + React + a11y + tailwind + prettier). */
const sharedRules = {
  // typescript-eslint relaxations
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
    },
  ],
  'no-unused-vars': 'off',

  // Naming conventions
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'default',
      format: ['PascalCase', 'camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: ['variable'],
      format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: ['property'],
      format: null,
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: ['default', 'variable', 'property'],
      format: null,
      leadingUnderscore: 'allow',
      filter: '^[_]*$',
    },
    // Allow leading underscore on parameters to mark them as intentionally
    // unused — consistent with `argsIgnorePattern: '^_'` on no-unused-vars.
    // Also covers placeholder names like `_`, `__`, `___` used to skip earlier
    // positional args.
    {
      selector: 'parameter',
      format: null,
      leadingUnderscore: 'allow',
      filter: '^[_]',
    },
    { selector: 'typeLike', format: ['PascalCase'] },
    {
      selector: ['enumMember', 'enum'],
      format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
    },
    { selector: 'property', format: null, filter: '^__html$' },
  ],

  // Statement spacing
  // NOTE: stock `padding-line-between-statements` does not support TS-only types
  // like `interface`/`type`/`multiline-const`. We keep the rule on common
  // statement kinds; consumers who want the TS-specific selectors can layer
  // `@stylistic/padding-line-between-statements` on top.
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: ['return'] },
    { blankLine: 'always', prev: 'function', next: 'function' },
    {
      blankLine: 'always',
      prev: 'import',
      next: [
        'block',
        'block-like',
        'case',
        'class',
        'const',
        'export',
        'expression',
        'for',
        'function',
        'if',
        'let',
        'return',
        'throw',
        'try',
        'while',
      ],
    },
    {
      blankLine: 'always',
      prev: [
        'import',
        'block',
        'block-like',
        'case',
        'class',
        'const',
        'expression',
        'for',
        'function',
        'if',
        'let',
        'return',
        'throw',
        'try',
        'while',
      ],
      next: 'export',
    },
    { blankLine: 'always', prev: 'directive', next: '*' },
  ],

  // Core JS
  curly: ['error', 'multi-line'],
  'no-console': 'error',
  'no-duplicate-imports': 'error',
  'no-restricted-imports': [
    'error',
    {
      paths: ['ui'],
      patterns: [
        {
          group: ['@sh/app', '@sh/app/*'],
          message: 'Importing from `app` package is disallowed for architecture reasons',
        },
      ],
    },
  ],
  quotes: ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
  'sort-imports': 'off',

  // a11y
  'jsx-a11y/anchor-is-valid': [
    'error',
    {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    },
  ],

  // react
  'react/button-has-type': 'error',
  'react/display-name': 'off',
  'react/function-component-definition': 'off',
  'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
  'react/jsx-sort-props': [
    2,
    { ignoreCase: true, callbacksLast: true, shorthandLast: false, reservedFirst: true },
  ],
  'react/no-unescaped-entities': 'off',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/self-closing-comp': 'warn',

  // react-hooks (v7 introduces new rules; we enable the classic ones explicitly)
  'react-hooks/exhaustive-deps': 'error',
  'react-hooks/rules-of-hooks': 'error',
  // Informational only — React Compiler flags components that touch libraries
  // it cannot compile (react-hook-form, tanstack/react-table, tanstack/react-virtual…).
  // The runtime behaviour is unaffected; turning it off until upstream libs gain support.
  'react-hooks/incompatible-library': 'off',

  // simple-import-sort
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': [
    1,
    {
      groups: [
        ['^\\u0000'],
        ['^react', '^next', '^[^.]'],
        ['^@shakuroinc/', '^@sh/'],
        ['^@/', '^~/', '^#/', '^libs$', '^libs/', '^features/'],
        ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ['^.+\\.s?css$'],
      ],
    },
  ],

  // tailwindcss
  // Class order is handled by prettier-plugin-tailwindcss.
  'tailwindcss/classnames-order': 'off',
  'tailwindcss/no-contradicting-classname': 'error',
  // Consumers override the whitelist via factory options.
  'tailwindcss/no-custom-classname': ['warn', { whitelist: DEFAULT_TAILWIND_WHITELIST }],

  // Misc
  'max-lines': ['error', { max: 300, skipComments: true }],
};

const mdxRuleOverrides = {
  '@next/next/no-img-element': 'off',
  '@typescript-eslint/naming-convention': 'off',
  // MDX imports are often consumed by JSX in the document body
  // (e.g. <Meta of={...} />), which the rule does not see.
  '@typescript-eslint/no-unused-vars': 'off',
  'no-unused-vars': 'off',
  'padding-line-between-statements': 'off',
  'max-lines': 'off',
  'no-unused-expressions': 'off',
  'react/self-closing-comp': 'off',
};

/**
 * Build the flat config array.
 *
 * @param {object} [options]
 * @param {string} [options.tailwindStylesheet]  Path to the Tailwind CSS entry file (Tailwind v4).
 * @param {string[]} [options.tailwindCallees]   Function names that accept Tailwind class strings.
 * @param {string[]} [options.tailwindWhitelist] Patterns to whitelist for `no-custom-classname`.
 * @param {string[]} [options.ignores]           Extra ignore patterns appended to the defaults.
 * @param {string}   [options.reactVersion]      Pinned React version for `eslint-plugin-react`.
 * @param {{ rootDir?: string }} [options.next]  Settings forwarded to `eslint-plugin-next`.
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
function shakuroConfig(options = {}) {
  const {
    tailwindStylesheet,
    tailwindCallees = DEFAULT_TAILWIND_CALLEES,
    tailwindWhitelist = DEFAULT_TAILWIND_WHITELIST,
    ignores = [],
    reactVersion = '19.0',
    next: nextSettings,
  } = options;

  /** @type {import('eslint').Linter.FlatConfig[]} */
  const config = [
    { ignores: [...DEFAULT_IGNORES, ...ignores] },

    // typescript-eslint flat presets
    ...tseslint.configs.recommended,

    {
      files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
      plugins: {
        'simple-import-sort': simpleImportSort,
        tailwindcss,
        'react-hooks': reactHooks,
        prettier: prettierPlugin,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: { ecmaFeatures: { jsx: true } },
        globals: { ...globals.browser, ...globals.node, ...globals.es2024 },
      },
      settings: {
        react: { version: reactVersion },
        ...(nextSettings ? { next: nextSettings } : {}),
        tailwindcss: {
          callees: tailwindCallees,
          ...(tailwindStylesheet ? { config: tailwindStylesheet } : {}),
          officialSorting: true,
        },
      },
      rules: {
        ...sharedRules,
        'tailwindcss/no-custom-classname': ['warn', { whitelist: tailwindWhitelist }],
        ...prettierConfig.rules,
        'prettier/prettier': 'error',
      },
    },

    // MDX
    {
      files: ['**/*.{md,mdx}'],
      ...mdx.flat,
      rules: {
        ...(mdx.flat.rules ?? {}),
        ...mdxRuleOverrides,
      },
    },
  ];

  return config;
}

module.exports = shakuroConfig;
module.exports.default = shakuroConfig;
module.exports.sharedRules = sharedRules;
module.exports.mdxRuleOverrides = mdxRuleOverrides;
module.exports.DEFAULT_IGNORES = DEFAULT_IGNORES;
module.exports.DEFAULT_TAILWIND_CALLEES = DEFAULT_TAILWIND_CALLEES;
module.exports.DEFAULT_TAILWIND_WHITELIST = DEFAULT_TAILWIND_WHITELIST;
