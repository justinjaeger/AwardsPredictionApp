module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
