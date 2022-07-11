import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

/**
 * withAuthenticator only lets signed-in users access the app
 * routing for login pages and giving access to App is managed automatically
 */

Amplify.configure(awsconfig);

AppRegistry.registerComponent(appName, () => App);
