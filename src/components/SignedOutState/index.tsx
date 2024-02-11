import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SubmitButton } from '../Buttons';
import { SubHeader } from '../Text';
import { MainScreenNavigationProp } from '../../navigation/types';

const SignedOutState = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  return (
    <>
      <SubHeader style={{ marginTop: '10%', fontWeight: '700', textAlign: 'center' }}>
        Sign in to make predictions!
      </SubHeader>
      <SubmitButton
        text={'Sign in'}
        onPress={() => {
          navigation.navigate('AuthenticatorNavigator');
        }}
        style={{ marginTop: 20, maxWidth: 140 }}
      />
    </>
  );
};

export default SignedOutState;
