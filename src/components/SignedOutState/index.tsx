import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BackgroundWrapper from '../BackgroundWrapper';
import { SubmitButton } from '../Buttons';
import { SubHeader } from '../Text';

const SignedOutState = () => {
  const navigation = useNavigation();

  return (
    <BackgroundWrapper>
      <>
        <SubHeader style={{ marginTop: '10%', fontWeight: '700' }}>
          Sign in to make predictions!
        </SubHeader>
        <SubmitButton
          text={'Sign in'}
          onPress={() => {
            navigation.navigate('Authenticator');
          }}
          style={{ marginTop: 20, maxWidth: 140 }}
        />
      </>
    </BackgroundWrapper>
  );
};

export default SignedOutState;
