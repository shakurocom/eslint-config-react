module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'simple-import-sort'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: ['variable', 'property'],
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
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
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-duplicate-imports': 2,
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1,
    'import/order': 0,
    'sort-imports': 0,
    'react/button-has-type': 2,
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
  },

  overrides: [
    {
      files: ['*.md'],
      extends: ['plugin:mdx/overrides'],
      rules: {
        '@typescript-eslint/naming-convention': 0,
        'prettier/prettier': [
          2,
          {
            parser: 'markdown',
          },
        ],
      },
    },
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/overrides'],
      rules: {
        '@typescript-eslint/naming-convention': 0,
      },
    },
    {
      files: '**/*.{md,mdx}/**',
      extends: ['plugin:mdx/code-blocks', 'plugin:mdx/recommended'],
      rules: {
        '@typescript-eslint/naming-convention': 0,
      },
    },
  ],
};
