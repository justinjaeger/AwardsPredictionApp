import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import FormInput from '../../../components/Inputs/FormInput';
import { SubmitButton } from '../../../components/Buttons';
import ApiServices from '../../../services/graphql';

const AddTestUser = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validUsername =
    username.length >= 8 && name.length > 1 && email.includes('@') && email.includes('.');

  const createUser = async () => {
    setLoading(true);
    const { data: u } = await ApiServices.createTestUser(name, username, email);
    setLoading(false);
    if (!u) return;
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}
      >
        <View style={{ width: '80%' }}>
          <FormInput
            label={'Username'}
            value={username}
            setValue={setUsername}
            caption={'Only lowercase letters, numbers, underscores, and periods.'}
            textContentType="username"
          />
          <FormInput
            label={'Name'}
            value={name}
            setValue={setName}
            textContentType="name"
          />
          <FormInput
            label={'Email'}
            value={email}
            setValue={setEmail}
            textContentType="emailAddress"
          />
          <SubmitButton
            text={'Create'}
            onPress={createUser}
            disabled={!validUsername}
            loading={loading}
          />
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default AddTestUser;
