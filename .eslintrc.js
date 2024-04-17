module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-empty-pattern': false,
  },
};
