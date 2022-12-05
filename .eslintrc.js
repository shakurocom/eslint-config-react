module.exports = {
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
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
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
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: ['variable', 'property'],
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
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
        filter: '^__html$',
        format: null,
      },
    ],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
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
    'import/order': 0,
    'no-duplicate-imports': 2,
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
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
    'react/button-has-type': 2,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1,
    'sort-imports': 0,
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
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
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          ['^\\u0000'],
          ['^react', '^next', '^[^.]'],
          ['^@shakuroinc/', '^@sh/'],
          ['^libs$', '^libs/', '^features/'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 1,
    'tailwindcss/classnames-order': 2,
    'tailwindcss/no-contradicting-classname': 2,
    'tailwindcss/no-custom-classname': 1,
  },

  overrides: [
    {
      files: ['*.mdx', '*.md'],
      extends: 'plugin:mdx/recommended',
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        '@next/next/no-img-element': 0,
        '@typescript-eslint/naming-convention': 0,
        'max-lines': 0,
        'no-unused-expressions': 0,
        'react/self-closing-comp': 0,
      },
    },
  ],
};
