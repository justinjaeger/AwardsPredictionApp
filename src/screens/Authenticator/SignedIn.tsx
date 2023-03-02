import React, { useState } from 'react';
import { View } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import { Body } from '../../components/Text';
import { useAuth } from '../../context/UserContext';
import COLORS from '../../constants/colors';
import LoadingStatue from '../../components/LoadingStatue';

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
    <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
      <View style={{ alignSelf: 'center' }}>
        <Body style={{ textAlign: 'center' }}>Just a moment...</Body>
        <LoadingStatue />
      </View>
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
