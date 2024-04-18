module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/no-unresolved': 'off',
  },
};
