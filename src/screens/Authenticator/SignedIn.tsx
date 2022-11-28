import React, { useState } from 'react';
import { View } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import { Body } from '../../components/Text';
import { useAuth } from '../../context/UserContext';

const SignedIn = () => {
  const { signOutUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const signOut = async () => {
    setLoading(true);
    AuthServices.signOut().then(() => {
      signOutUser();
    });
  };

  return (
    <View style={{ width: '100%' }}>
      <Body>You are signed in</Body>
      <SubmitButton
        text={'Sign out'}
        onPress={signOut}
        loading={loading}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default SignedIn;
