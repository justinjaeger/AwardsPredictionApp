import { useEffect } from 'react';
import { Linking } from 'react-native';

// NOTE: This prefix "oscar", if changed, must also change in Info.plist AND AndroidManifeset
// It is also part of the amplify auth configuration, and if changed, also needs to update there "amplify update auth"
const URL = 'oscar://signin/';

// NOTE: None of this code is active, this is just a reference for the future if wanting to use deep links
const useDeepLink = () => {
  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      // url will look like this:
      // "oscar://signin/?code=b19d8728-adc7-44c1-9a42-78e9275bc845&state=omTFMhAaNjOtpuevv9giYbyMhE27TmWj#"
      if (url.includes(URL)) {
        handleSignIn();
      }
    });
  }, []);

  const handleSignIn = () => {
    //
  };
};

export default useDeepLink;
