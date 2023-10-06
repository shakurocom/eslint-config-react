// @ts-check
/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'simple-import-sort',
    'tailwindcss',
  ],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      officialSorting: true,
    },
  },

  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
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
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: ['enumMember', 'enum'],
        format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
      },
      {
        selector: 'property',
        format: null,
        filter: '^__html$',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^[_]*$' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['interface', 'type'],
        next: '*',
      },
      { blankLine: 'always', prev: '*', next: ['return'] },
      { blankLine: 'always', prev: 'function', next: 'function' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      {
        blankLine: 'always',
        prev: 'import',
        next: [
          'interface',
          'type',
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
          'interface',
          'type',
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
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    curly: ['error', 'multi-line'],
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
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 'error',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'warn',
    'sort-imports': 'off',
    'react/function-component-definition': "off",
    'react/jsx-curly-brace-presence': [
      2,
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-sort-props': [
      2,
      { ignoreCase: true, callbacksLast: true, shorthandLast: false, reservedFirst: true },
    ],
    'max-lines': [
      'error',
      {
        max: 300,
        skipComments: true,
      },
    ],
    'no-console': 'error',
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
    'simple-import-sort/exports': 'warn',
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-custom-classname': 'warn',
    quotes: ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
  },

  overrides: [
    {
      files: ['*js?x', '*ts?x'],
      extends: ['plugin:import/recommended', 'plugin:import/typescript'],
      rules: {
        'import/order': 'off',
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              {
                target: 'ui',
                from: 'app',
                message: 'Importing from `app` package is disallowed for architecture reasons',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.mdx', '*.md'],
      extends: 'plugin:mdx/recommended',
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/padding-line-between-statements': 'off',
        'max-lines': 'off',
        'no-unused-expressions': 'off',
        'react/self-closing-comp': 'off',
      },
    },
  ],
};
