import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Navigation from './navigation';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_AUTH_CLIENT_ID } from './config';
import { useForceUpdate } from './hooks/useForceUpdate';
import { Alert, Linking } from 'react-native';
import BackgroundWrapper from './components/BackgroundWrapper';
import useDevice from './util/device';

const queryClient = new QueryClient();

// https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md
GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/userinfo.email'], // default is email and profile so shouldn't need this
  iosClientId: GOOGLE_AUTH_CLIENT_ID, // only for iOS
});

const App = () => {
  const forceUpdate = useForceUpdate();
  const { isAndroid } = useDevice();

  if (forceUpdate) {
    // alert users that they need to upgrade - link them to app store OR play store (in future)
    Alert.alert(
      'Please upgrade to the latest version of the app to continue using it.',
      '',
      [
        {
          text: 'Upgrade',
          onPress: () => {
            const url = isAndroid
              ? 'https://play.google.com/store/apps/details?id=com.awardspredictionapp'
              : 'https://apps.apple.com/us/app/award-expert/id6446135720';
            Linking.openURL(url);
          },
        },
      ],
    );
    return (
      <BackgroundWrapper>
        <></>
      </BackgroundWrapper>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...theme }}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
