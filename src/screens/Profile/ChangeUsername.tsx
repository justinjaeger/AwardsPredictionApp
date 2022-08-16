import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { updateUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/Inputs/FormInput';
import { EvaStatus } from '@ui-kitten/components/devsupport/typings';
import { SubmitButton } from '../../components/Buttons';
import ApiServices from '../../services/graphql';

const ChangeUsername = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState<string>(user?.username || '');
  const [usernameStatus, setUsernameStatus] = useState<EvaStatus | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const validUsername = username.length >= 8;
  const currentUsername = user?.username;

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: currentUsername ? 'Update Username' : 'Create Username',
    });
  }, [currentUsername, navigation]);

  // NOTE: Instead of doing 2 chained functions, make a Lambda func for this (see docs)
  // NOTE: Observe how at the end we update redux. Instead, we should update the DataStore after we configure that (and look into it in general)
  const updateUsername = () => {
    if (!user) return;
    setLoading(true);
    ApiServices.getUsersByFilter({ filter: { username: { eq: username } } }).then(
      (res) => {
        if (res.status === 'success' && res.data) {
          if (res.data?.length && res.data.length > 0) {
            setLoading(false);
            return Snackbar.error('This username is taken');
          } else {
            ApiServices.updateUsername({ input: { id: user.id, username } }).then(
              (res) => {
                if (res.status === 'success') {
                  const user = res.data;
                  if (user) {
                    dispatch(updateUser(user));
                    Snackbar.success('Username updated');
                    navigation.goBack();
                  }
                  setLoading(false);
                }
              },
            );
          }
        }
      },
    );
  };

  if (!user) navigation.goBack();

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
          text={currentUsername ? 'Update' : 'Create'}
          onPress={updateUsername}
          disabled={!validUsername || currentUsername === username}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

export default ChangeUsername;
