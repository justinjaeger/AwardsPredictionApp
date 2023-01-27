import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Image,
  View,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { HeaderLight, SubHeader } from '../../components/Text';
import { useAuth } from '../../context/UserContext';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { IconButton } from '../../components/Buttons/IconButton';
import { launchImageLibrary } from 'react-native-image-picker';
import AWSStorage from '../../services/storage';
import { useNavigation } from '@react-navigation/native';
import useQueryGetUser from '../../hooks/queries/getUser';
import theme from '../../constants/theme';
import { Divider } from '@ui-kitten/components';
import ProfilePredictionsList from './ProfilePredictionsList';

const Profile = () => {
  const { userId, userEmail, signOutUser } = useAuth(); // later import userId
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { data: user } = useQueryGetUser(userId);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileUri, setProfileUri] = useState<string | undefined>(undefined);

  const isDeviceProfile = user && userId && user?.id === userId;

  const predictionSets = user?.predictionSets || [];

  useEffect(() => {
    if (!userId) {
      navigation.navigate('ChangeUsername');
    }
  }, [userId]);

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

  const proportion = 3 / 10;
  const imageContainerWidth = width * proportion;
  const usernameContainerWidth = width * (1 - proportion);

  const ProfileDivider = ({ style }: { style?: any }) => (
    <Divider
      style={{
        width: '95%',
        opacity: 0.5,
        ...style,
      }}
    />
  );

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 20,
          width: '100%',
          paddingBottom: 100,
        }}
      >
        {!userId ? (
          <SubmitButton
            style={{ marginTop: 20 }}
            text={userEmail ? 'Log in' : 'Create Account'}
            onPress={logIn}
          />
        ) : (
          <>
            <View
              style={{
                width: width,
                alignItems: 'center',
                flexDirection: 'row',
                height: 100,
                padding: theme.windowMargin,
                marginBottom: 20,
              }}
            >
              <View style={{ width: imageContainerWidth, paddingLeft: 10 }}>
                <TouchableHighlight
                  onPress={isDeviceProfile ? onUpload : undefined}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    backgroundColor: 'red',
                  }}
                >
                  <View />
                </TouchableHighlight>
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <TouchableHighlight
                  onPress={
                    isDeviceProfile
                      ? () => {
                          navigation.navigate('ChangeUsername');
                        }
                      : undefined
                  }
                  underlayColor={'transaparent'}
                >
                  <HeaderLight>
                    {user?.username ? user.username : 'No Username'}
                  </HeaderLight>
                </TouchableHighlight>
                <View style={{ width: usernameContainerWidth }}>
                  {isDeviceProfile && !user?.username ? (
                    <View onTouchEnd={() => navigation.navigate('ChangeUsername')}>
                      <SubHeader style={{ paddingRight: 20 }}>
                        {'Must create username for others to find you'}
                      </SubHeader>
                    </View>
                  ) : (
                    <View style={{ height: 20 }} />
                  )}
                </View>
              </View>
            </View>
            {profileUri ? (
              // JUST FOR TEST: REMOVE LATER
              <Image style={{ width: 200, height: 200 }} source={{ uri: profileUri }} />
            ) : null}
            <ProfileDivider />
            <HeaderLight
              style={{
                alignSelf: 'flex-start',
                marginBottom: 10,
                marginTop: 10,
                marginLeft: theme.windowMargin,
              }}
            >
              Recent Predictions:
            </HeaderLight>
            <ProfileDivider style={{ marginBottom: 20 }} />
            <ProfilePredictionsList predictionSets={predictionSets} />
          </>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Profile;
