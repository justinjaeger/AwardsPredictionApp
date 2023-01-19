import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/Inputs/FormInput';
import { EvaStatus } from '@ui-kitten/components/devsupport/typings';
import { SubmitButton } from '../../components/Buttons';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../context/UserContext';
import { getHeaderTitle } from '../../constants';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { BodyBold } from '../../components/Text';
import useQueryGetUser from '../../hooks/queries/getUser';

const ChangeUsername = () => {
  const { userId } = useAuth();
  const navigation = useNavigation();

  const { data: user } = useQueryGetUser(userId);
  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<EvaStatus | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const validUsername = username.length >= 8;
  const usernameBeforeEdit = user?.username || undefined;

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: getHeaderTitle(
        usernameBeforeEdit ? 'Update Username' : 'Create Username',
      ),
    });
  }, [usernameBeforeEdit, navigation]);

  const updateUsername = async () => {
    setLoading(true);
    if (!user?.id) return;
    const { data: u } = await ApiServices.updateUsername(user?.id, username);
    setLoading(false);
    if (!u) return;
    Snackbar.success('Username updated');
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
            label={usernameBeforeEdit ? 'New Username' : 'Username'}
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
          {usernameBeforeEdit ? null : (
            <BodyBold style={{ textAlign: 'center', marginBottom: 20 }}>
              {'You MUST create a username \n so other users can find you'}
            </BodyBold>
          )}
          <SubmitButton
            text={usernameBeforeEdit ? 'Update' : 'Create'}
            onPress={updateUsername}
            disabled={!validUsername || usernameBeforeEdit === username}
            loading={loading}
          />
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default ChangeUsername;
