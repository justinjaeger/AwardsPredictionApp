import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

// Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsconfig);

AppRegistry.registerComponent(appName, () => App);
