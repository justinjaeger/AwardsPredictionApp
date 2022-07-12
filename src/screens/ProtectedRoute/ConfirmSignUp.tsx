import React from 'react';
import { iAuthScreenProps } from './types';

// Where user enters the confirmation code
// it can display a message "check your email for the code" and have a code input below
// I got one of these emails
// aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignup

const ConfirmSignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator

  return <></>;
};

export default ConfirmSignUp;
