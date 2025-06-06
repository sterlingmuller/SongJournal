module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@src': './src/',
            '@styles': './src/styles',
            '@dropbox': './src/services/cloudStorage/dropbox',
            '@modules': './modules/'
          },
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
