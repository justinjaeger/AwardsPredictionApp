import { useNavigation } from '@react-navigation/native';
import React from 'react';
import BackgroundWrapper from '../BackgroundWrapper';
import { SubmitButton } from '../Buttons';
import { SubHeader } from '../Text';
import { MainScreenNavigationProp } from '../../navigation/types';

const SignedOutState = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

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
