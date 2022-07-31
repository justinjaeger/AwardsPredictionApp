import { CognitoUser } from 'amazon-cognito-identity-js';

// got this from documentation (https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native/#show-your-app-after-sign-in)
export type iAuthState =
  | 'signIn'
  | 'signUp'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'forgotPassword'
  | 'requireNewPassword'
  | 'verifyContact'
  | 'signedIn';

// makes up for the fact there's no typescript for the Authenticator. there could be more params on this object not listed here
export type iAuthScreenProps = {
  authState: iAuthState;
  onStateChange: (
    authState: iAuthState,
    authData: CognitoUser | any, // when the state is signedIn, it will return a CognitoUser object.
  ) => void;
};
