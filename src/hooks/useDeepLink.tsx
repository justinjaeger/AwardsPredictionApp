import { useEffect } from 'react';
import { Linking } from 'react-native';

// NOTE: This prefix "oscar", if changed, must also change in Info.plist AND AndroidManifeset
// It is also part of the amplify auth configuration, and if changed, also needs to update there "amplify update auth"
export const SIGN_IN_PREFIX = 'oscar://signin/';

// urls will look like this:
// "oscar://signin/?code=1234567890"
const useDeepLink = (handleSignIn: (url: string) => void) => {
  // For links when app is ALREADY OPEN
  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      if (url.includes(SIGN_IN_PREFIX)) {
        handleSignIn(url);
      }
    });
  }, []);

  //   useInitialUrl - For links when app is NOT OPEN
  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      // Resolves to a link if one was used
      const url = await Linking.getInitialURL();
      if (url?.includes(SIGN_IN_PREFIX)) {
        handleSignIn(url);
      }
    };

    getUrlAsync();
  }, []);
};

export default useDeepLink;
