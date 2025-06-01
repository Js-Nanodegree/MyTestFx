module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@screens': './app',
            '@constants': './constants',
            '@hooks': './hooks',
            '@utils': './utils',
            '@assets': './assets',
            '@FeatureStyleDesign': './components/FeatureStyleDesign',
            '@Solid': './components/Solid',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
