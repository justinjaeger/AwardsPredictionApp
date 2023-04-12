import { AppRegistry, Linking } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports.js';
// import InAppBrowser from 'react-native-inappbrowser-reborn';

// responsible for amplify oauth opening in an in-app browser, which is required from app store
// async function urlOpener(url, redirectUrl) {
//   try {
//     if (await InAppBrowser.isAvailable()) {
//       InAppBrowser.openAuth(url, redirectUrl, {
//         // iOS Properties
//         ephemeralWebSession: false,
//         // Android Properties
//         showTitle: false,
//         enableUrlBarHiding: true,
//         enableDefaultShare: false,
//       }).then((response) => {
//         if (response.type === 'success' && response.url) {
//           Linking.openURL(response.url);
//         }
//       });
//     } else Linking.openURL(url);
//   } catch (error) {
//     Linking.openURL(url);
//   }
// }

// Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure({
  ...awsconfig,
  //   oauth: {
  //     ...awsconfig.oauth,
  //     urlOpener,
  //   },
});

AppRegistry.registerComponent(appName, () => App);
