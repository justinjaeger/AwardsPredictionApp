module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'prettier', 'sonarjs'],
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'standard',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    'no-console': 0,
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    'sonarjs/no-small-switch': 0,
    'import/namespace': 0,
    'react-native/no-inline-styles': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 0,
    'eslint-comments/no-unlimited-disable': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    'import/no-named-default': 0,
    'eslint-comments/no-unused-disable': 0,
  },
};
