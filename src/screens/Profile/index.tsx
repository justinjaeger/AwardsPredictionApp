import React, { useLayoutEffect, useState } from 'react';
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../constants/theme';
import PredictionCarousel from '../../components/PredictionCarousel';
import { ProfileParamList } from '../../navigation/types';
import useQueryGetUserWithRecentPredictions from '../../hooks/queries/getUserWithRecentPredictions';
import COLORS from '../../constants/colors';
import { useNavigateToEffect } from '../../util/hooks';
import useUpdateProfileImage from '../../hooks/mutations/updateProfileImage';
import useProfileImage from '../../hooks/useProfileImage';

const Profile = () => {
  // If we pass userId as params, it loads that user's profile. If not, it attemps to get logged in profile.
  const { params } = useRoute<RouteProp<ProfileParamList, 'Profile'>>();
  const { userId: authUserId, userEmail, signOutUser } = useAuth(); // later import userId
  const userId = params?.userId || authUserId;

  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { data: user, refetch } = useQueryGetUserWithRecentPredictions(userId);
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  const profileImage = useProfileImage(user?.image);

  // refresh the profile when we navigate to it (makes it so it updates after changing username for example)
  useNavigateToEffect(() => refetch(), []);

  const [loading, setLoading] = useState<boolean>(false);
  const [profileUri, setProfileUri] = useState<string | undefined>(undefined);

  const isDeviceProfile = user && userId && user?.id === authUserId; // signed in matches params

  const predictionSets = user?.predictionSets || [];

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
    if (!authUserId) return; // don't execute if not signed in
    const result = await launchImageLibrary({
      maxWidth: 200,
      maxHeight: 200,
      mediaType: 'photo',
    });
    if (result && result.assets) {
      const { uri } = result.assets[0];
      if (uri) {
        setProfileUri(uri);
        const key = await AWSStorage.uploadProfilePicture(uri, userEmail || '');
        // store the key as user.image
        if (key) {
          updateProfileImage({ id: authUserId, image: key });
        }
      }
    }
  };

  const proportion = 3 / 10;
  const imageContainerWidth = width * proportion;

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
                  }}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage || '' }}
                      width={200}
                      height={200}
                      style={{ width: 100, height: 100, borderRadius: 100 }}
                    />
                  ) : (
                    // TODO: load a default image
                    <View />
                  )}
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
                  style={{
                    borderRadius: theme.borderRadius,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  underlayColor={COLORS.disabled}
                >
                  <>
                    <HeaderLight>
                      {user?.name ? user.name : isDeviceProfile ? 'Add Name' : ''}
                    </HeaderLight>
                    <SubHeader style={{ marginTop: 5 }}>
                      {user?.username
                        ? '@' + user.username
                        : isDeviceProfile
                        ? 'Add Username'
                        : ''}
                    </SubHeader>
                  </>
                </TouchableHighlight>
              </View>
            </View>
            {profileUri ? (
              // JUST FOR TEST: REMOVE LATER
              <Image style={{ width: 200, height: 200 }} source={{ uri: profileUri }} />
            ) : null}
            {predictionSets.length > 0 ? (
              <>
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
                <PredictionCarousel predictionSets={predictionSets} userId={userId} />
              </>
            ) : null}
          </>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Profile;
