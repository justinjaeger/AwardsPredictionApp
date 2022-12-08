import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BackgroundWrapper from '../BackgroundWrapper';
import { SubmitButton } from '../Buttons';
import { BodyBold } from '../Text';

const SignedOutState = () => {
  const navigation = useNavigation();

  return (
    <BackgroundWrapper>
      <>
        <BodyBold style={{ marginTop: '10%', fontWeight: '400' }}>
          Sign in to make predictions.
        </BodyBold>
        <SubmitButton
          text={'Sign in'}
          onPress={() => {
            navigation.navigate('Authenticator');
          }}
          style={{ marginTop: 20 }}
        />
      </>
    </BackgroundWrapper>
  );
};

export default SignedOutState;
