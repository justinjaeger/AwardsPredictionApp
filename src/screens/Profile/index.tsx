import React, { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, Image } from 'react-native';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../../components/Text';
import ApiServices from '../../services/graphql';
import { useSubscriptionEffect } from '../../util/hooks';
import { GetUserQuery } from '../../API';
import { useAuth } from '../../context/UserContext';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { IconButton } from '../../components/Buttons/IconButton';
import { launchImageLibrary } from 'react-native-image-picker';
import AWSStorage from '../../services/storage';

const Profile = () => {
  const { userId, userEmail, signOutUser } = useAuth(); // later import userId
  const navigation = useNavigation();

  const [user, setUser] = useState<GetUserQuery>();
  const [loading, setLoading] = useState<boolean>(false);
  const [profileUri, setProfileUri] = useState<string | undefined>(undefined);

  // put the logout button in the top right corner
  useLayoutEffect(() => {
    if (!userId) return;
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconProps={{
            name: 'log-out-outline',
          }}
          onPress={() => {
            if (loading) return; // disable while loading
            Alert.alert('Log out', 'Are you sure you want to log out?', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  logOut();
                },
              },
            ]);
          }}
          styles={{
            width: 30,
            height: 30,
            marginRight: 10,
          }}
        />
      ),
    });
  }, []);

  useSubscriptionEffect(async () => {
    if (!userId) return;
    const { data: u } = await ApiServices.getUser(userId);
    if (u) {
      setUser(u);
    }
  }, [userId]);

  const logIn = () => {
    navigation.navigate('Authenticator');
  };

  const logOut = () => {
    setLoading(true);
    AuthServices.signOut().then((res) => {
      // sign out in context as well
      if (res.status === 'success') {
        signOutUser();
        Snackbar.success('You were signed out');
      }
      setLoading(false);
    });
  };

  // could save the local path so that we can reference it with an <Image /> component
  const onUpload = async () => {
    const result = await launchImageLibrary({
      maxWidth: 200,
      maxHeight: 200,
      mediaType: 'photo',
    });
    if (result && result.assets) {
      const { uri } = result.assets[0];
      if (uri) {
        setProfileUri(uri);
        const storageResult = await AWSStorage.pathToImageFile(uri, userEmail || '');
        console.log('storageResult', storageResult);
      }
    }
  };

  return (
    <BackgroundWrapper>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '100%' }}
      >
        <SubmitButton text={'Upload Image'} onPress={onUpload} />
        {profileUri ? (
          <Image style={{ width: 200, height: 200 }} source={{ uri: profileUri }} />
        ) : null}
        {!userId ? (
          <SubmitButton text={userEmail ? 'Log in' : 'Create Account'} onPress={logIn} />
        ) : (
          <>
            <TouchableText
              text={user?.getUser?.username ? 'Change Username' : 'Create Username'}
              onPress={() => {
                navigation.navigate('ChangeUsername', { user });
              }}
              style={{ marginTop: 30 }}
            />
            <Body style={{ marginTop: 30 }}>{JSON.stringify(user)}</Body>
          </>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Profile;
