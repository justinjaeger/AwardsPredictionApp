import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  View,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { BodyBold, HeaderLight, SubHeader } from '../../components/Text';
import { useAuth } from '../../context/UserContext';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { IconButton } from '../../components/Buttons/IconButton';
import { launchImageLibrary } from 'react-native-image-picker';
import AWSStorage from '../../services/storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../constants/theme';
import PredictionCarousel from '../../components/PredictionCarousel';
import { ProfileParamList } from '../../navigation/types';
import useQueryGetUserProfile from '../../hooks/queries/getUserProfile';
import COLORS from '../../constants/colors';
import { useNavigateToEffect, useTypedNavigation } from '../../util/hooks';
import useUpdateProfileImage from '../../hooks/mutations/updateProfileImage';
import ProfileImage from '../../components/ProfileImage';
import FollowButton from '../../components/FollowButton';

const Profile = () => {
  // If we pass userId as params, it loads that user's profile. If not, it attemps to get logged in profile.
  const { params } = useRoute<RouteProp<ProfileParamList, 'Profile'>>();
  const { userId: authUserId, userEmail, signOutUser } = useAuth();
  const userId = params?.userId || authUserId;

  const navigation = useNavigation();
  const friendNavigation = useTypedNavigation<ProfileParamList>();
  const { width } = useWindowDimensions();

  const { data: user, refetch } = useQueryGetUserProfile(userId, authUserId);
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  // refresh the profile when we navigate to it (makes it so it updates after changing username for example)
  useNavigateToEffect(() => refetch(), []);

  const [loading, setLoading] = useState<boolean>(false);

  const isDeviceProfile = user && userId && user?.id === authUserId; // signed in matches params

  const predictionSets = user?.predictionSets || [];

  // put the logout button in the top right corner
  useLayoutEffect(() => {
    if (!userId || !isDeviceProfile) return; // don't set logout header if someone else's profile
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
  const onUploadProfileImage = async () => {
    if (!authUserId) return; // don't execute if not signed in
    const result = await launchImageLibrary({
      maxWidth: 200,
      maxHeight: 200,
      mediaType: 'photo',
    });
    if (result && result.assets) {
      const { uri } = result.assets[0];
      if (uri) {
        const key = await AWSStorage.uploadProfilePicture(uri, userEmail || '');
        // store the key as user.image
        if (key) {
          updateProfileImage({ id: authUserId, image: key });
        }
      }
    }
  };

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
                marginBottom: 20,
                marginLeft: theme.windowMargin,
              }}
            >
              <ProfileImage
                image={user?.image}
                onPress={isDeviceProfile ? onUploadProfileImage : undefined}
                style={{ marginLeft: 10, marginRight: 15 }}
              />
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: theme.windowMargin + 20,
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  friendNavigation.navigate('Followers', { userId, type: 'followers' });
                }}
                style={{
                  alignItems: 'center',
                  backgroundColor: COLORS.secondaryDark,
                  padding: 10,
                  borderRadius: theme.borderRadius,
                }}
                underlayColor={COLORS.secondary}
              >
                <BodyBold>{'XX Followers'}</BodyBold>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  friendNavigation.navigate('Followers', { userId, type: 'following' });
                }}
                style={{
                  alignItems: 'center',
                  backgroundColor: COLORS.secondaryDark,
                  padding: 10,
                  borderRadius: theme.borderRadius,
                  marginLeft: 10,
                }}
                underlayColor={COLORS.secondary}
              >
                <BodyBold>{'XX Following'}</BodyBold>
              </TouchableHighlight>
              {user?.isFollowingAuthUser ? (
                <BodyBold style={{ marginLeft: 10, color: 'rgba(255,255,255,0.8)' }}>
                  Follows You
                </BodyBold>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: theme.windowMargin + 20,
              }}
            >
              {user && !isDeviceProfile ? (
                <FollowButton
                  authUserIsFollowing={user.authUserIsFollowing || false}
                  profileUserId={user.id}
                />
              ) : null}
              {user?.isFollowingAuthUser ? (
                <BodyBold style={{ marginLeft: 10, color: 'rgba(255,255,255,0.8)' }}>
                  Follows You
                </BodyBold>
              ) : null}
            </View>
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
