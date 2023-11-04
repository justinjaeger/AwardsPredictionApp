import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

global.Buffer = require('buffer').Buffer;

AppRegistry.registerComponent(appName, () => App);
