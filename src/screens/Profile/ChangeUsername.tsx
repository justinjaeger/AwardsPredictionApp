import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/Inputs/FormInput';
import { EvaStatus } from '@ui-kitten/components/devsupport/typings';
import { SubmitButton } from '../../components/Buttons';
import ApiServices from '../../services/graphql';
import { useAsyncEffect } from '../../util/hooks';
import { GetUserQuery } from '../../API';

const ChangeUsername = () => {
  const { userId } = useAuth();
  const navigation = useNavigation();

  const [user, setUser] = useState<GetUserQuery>();
  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<EvaStatus | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const validUsername = username.length >= 8;
  const usernameBeforeEdit = user?.getUser?.username || undefined;

  useAsyncEffect(async () => {
    if (userId) {
      ApiServices.getUser(userId).then(({ data: u }) => {
        setUser(u);
        setUsername(u?.getUser?.username || '');
      });
      setUser(undefined);
    }
  }, [userId]);

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: usernameBeforeEdit ? 'Update Username' : 'Create Username',
    });
  }, [usernameBeforeEdit, navigation]);

  const updateUsername = async () => {
    setLoading(true);
    if (!user?.getUser?.id) return;
    const { data: u } = await ApiServices.updateUsername(user?.getUser?.id, username);
    setLoading(false);
    if (!u) return;
    Snackbar.success('Username updated');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <View style={{ width: '80%' }}>
        <FormInput
          label="Username"
          value={username}
          setValue={setUsername}
          caption={
            usernameStatus === 'danger'
              ? 'Must contain at least 8 characters. \nOnly lowercase letters, numbers, underscores, and periods.'
              : 'Only lowercase letters, numbers, underscores, and periods.'
          }
          textContentType="username"
          status={usernameStatus}
          onBlur={() => {
            if (username.length > 0 && !validUsername) {
              setUsernameStatus('danger');
            } else {
              setUsernameStatus(undefined);
            }
          }}
        />
        <SubmitButton
          text={usernameBeforeEdit ? 'Update' : 'Create'}
          onPress={updateUsername}
          disabled={!validUsername || usernameBeforeEdit === username}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

export default ChangeUsername;
