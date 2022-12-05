/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'tailwindcss'],

  extends: [
    '@shakuroinc/eslint-config-base',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      officialSorting: true,
    },
  },

  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
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
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
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
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandLast: false,
        reservedFirst: true,
      },
    ],
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
