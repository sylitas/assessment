module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    quotes: ['error', 'single'],
    'no-underscore-dangle': [2, { allow: ['_parseUrl'] }],
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-return-await': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-promise-executor-return': 'off',
    'no-unused-expressions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'default-case': 'off',
  },
  ignorePatterns: ['node_modules/', '**/node_modules/', '/**/node_modules/*', 'src/public/*'],
};
