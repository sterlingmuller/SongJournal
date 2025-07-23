// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', 'build/*', '*.config.js'],
    plugins: ['react-compiler'],
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
]);
