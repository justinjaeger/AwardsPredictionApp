import React from 'react';
import { SubmitButton } from '../../../components/Buttons';
import AuthServices from '../../../services/auth';

const GoogleOauthButton = () => {
  return (
    <SubmitButton
      text={'Google Sign In'}
      onPress={() => {
        AuthServices.googleSignIn();
      }}
    />
  );
};

export default GoogleOauthButton;
