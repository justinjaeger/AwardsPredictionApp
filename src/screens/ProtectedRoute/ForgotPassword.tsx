import React from 'react';
import { iAuthScreenProps } from './types';

// https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpassword

const ForgotPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator

  return <></>;
};

export default ForgotPassword;
