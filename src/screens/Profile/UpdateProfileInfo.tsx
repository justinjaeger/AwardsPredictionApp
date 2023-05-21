import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/Inputs/FormInput';
import { EvaStatus } from '@ui-kitten/components/devsupport/typings';
import { SubmitButton } from '../../components/Buttons';
import { useAuth } from '../../context/UserContext';
import { getHeaderTitle } from '../../constants';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { Body, BodyBold } from '../../components/Text';
import useUpdateUser from '../../hooks/mutations/updateUser';
import useQueryGetUser from '../../hooks/queries/getUser';
import ProfileImage from '../../components/ProfileImage';
import useUpdateProfileImage from '../../hooks/mutations/updateProfileImage';
import BackButton from '../../components/Buttons/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BIO_CHAR_LIMIT = 150;

const UpdateProfileInfo = () => {
  const { userId: authUserId, userEmail } = useAuth();
  const navigation = useNavigation();

  const { data: user } = useQueryGetUser(authUserId);
  const { mutate: updateUser, isComplete } = useUpdateUser(() => {
    Snackbar.success('Profile updated');
    navigation.goBack();
  });
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  const [name, setName] = useState<string>(user?.name || '');
  const [bio, setBio] = useState<string>(user?.bio || '');
  const [username, setUsername] = useState<string>(user?.username || '');
  const [usernameStatus, setUsernameStatus] = useState<EvaStatus | undefined>(undefined);

  const validName = name.length >= 0;
  const validUsername = username.length >= 8;
  const validBio = bio.length < 200;
  const nameBeforeEdit = user?.name || '';
  const usernameBeforeEdit = user?.username || '';
  const bioBeforeEdit = user?.bio || '';
  const enableSubmitUsername = usernameBeforeEdit !== username && validUsername;
  const enableSubmitName = nameBeforeEdit !== name && validName;
  const enableSubmitBio = bioBeforeEdit !== bio && validBio;

  const submitEnabled = enableSubmitUsername || enableSubmitName || enableSubmitBio;

  useEffect(() => {
    setName(user?.name || '');
    setUsername(user?.username || '');
    setBio(user?.bio || '');
  }, [user?.name, user?.username, user?.bio]);

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: getHeaderTitle(
        usernameBeforeEdit ? 'Update Profile' : 'Create Profile',
      ),
      headerLeft: () => (
        <BackButton
          onPress={
            submitEnabled
              ? () => {
                  Alert.alert('Discard Changes?', '', [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ]);
                }
              : undefined
          }
        />
      ),
    });
  }, [usernameBeforeEdit, navigation, submitEnabled]);

  const updateInfo = async () => {
    const un = enableSubmitUsername ? username : undefined;
    const n = enableSubmitName ? name : undefined;
    const b = enableSubmitBio ? bio : undefined;
    if (!user?.id) return;
    updateUser({ id: user?.id, username: un, name: n, bio: b });
  };

  const onUploadProfileImage = async () => {
    if (!authUserId || !userEmail) return; // don't execute if not signed in
    updateProfileImage({ userId: authUserId, userEmail });
  };

  return (
    <BackgroundWrapper>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 40,
          paddingBottom: 200,
        }}
      >
        <View style={{ width: '80%', alignItems: 'center' }}>
          <ProfileImage
            image={user?.image}
            imageSize={140}
            onPress={onUploadProfileImage}
            style={{ marginBottom: 10 }}
          />
          <Body style={{ marginBottom: 10 }}>{`Tap to ${
            user?.image ? 'change' : 'upload'
          } image`}</Body>
          <FormInput
            label={'Name'}
            value={name}
            setValue={setName}
            textContentType="name"
          />
          <FormInput
            label={'Username'}
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
          <FormInput
            label={'Bio'}
            value={bio}
            setValue={setBio}
            caption={
              bioBeforeEdit !== bio
                ? `${BIO_CHAR_LIMIT - bio.length} characters left`
                : ''
            }
            status={bio.length > BIO_CHAR_LIMIT ? 'danger' : undefined}
            style={{ marginTop: 20 }}
            multiline
          />
          {usernameBeforeEdit ? null : (
            <BodyBold style={{ textAlign: 'center', marginBottom: 20, marginTop: 20 }}>
              {'Creating a username lets\nother users find you'}
            </BodyBold>
          )}
        </View>
      </KeyboardAwareScrollView>
      <SubmitButton
        text={usernameBeforeEdit ? 'Update' : 'Create'}
        onPress={() => updateInfo()}
        disabled={!submitEnabled}
        loading={!isComplete}
        style={{ width: '90%', marginBottom: 10 }}
      />
    </BackgroundWrapper>
  );
};

export default UpdateProfileInfo;
