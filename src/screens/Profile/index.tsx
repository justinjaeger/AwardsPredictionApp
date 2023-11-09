import React from 'react';
import { View, TouchableHighlight, ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import { Body, BodyBold, HeaderLight, SubHeader } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import {
  RouteProp,
  useNavigation,
  useRoute,
  StackActions,
} from '@react-navigation/native';
import theme from '../../constants/theme';
import PredictionCarousel from '../../components/PredictionCarousel';
import COLORS from '../../constants/colors';
import { useNavigateToEffect, useTypedNavigation } from '../../util/hooks';
import ProfileImage from '../../components/ProfileImage';
import FollowButton from '../../components/FollowButton';
import FollowCountButton from '../../components/FollowCountButton';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import EventList from '../Predictions/Event/EventList';
import { MainScreenNavigationProp, PredictionsParamList } from '../../navigation/types';
import useProfileUser from './useProfileUser';
import useProfileHeader from './useProfileHeader';
import ProfileSkeleton from '../../components/Skeletons/ProfileSkeleton';

const Profile = () => {
  // If we pass userId as params, it loads that user's profile. If not, it attemps to get logged in profile.
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Profile'>>();
  const { userId: authUserId, isNewUser } = useAuth();
  const userId = params?.userId || authUserId;

  const globalNavigation = useNavigation<MainScreenNavigationProp>();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { data: events, isLoading: isLoadingAllEvents } = useQueryGetAllEvents();

  const { isLoading, setIsLoading, user, authUserIsFollowing, isFollowingAuthUser } =
    useProfileUser(userId);

  // handles the header (and logout button)
  useProfileHeader(userId, isLoading, setIsLoading);

  const iterableEvents = events ? Object.values(events) || [] : [];
  const userEvents = Object.values(iterableEvents)?.filter((event) =>
    Object.keys(user?.eventsPredicting ?? {})?.includes(event._id),
  );
  const predictionSets = user?.recentPredictionSets || [];
  const isAuthUser = user && userId && user?._id === authUserId;

  useNavigateToEffect(() => {
    if (isAuthUser && !user.username) {
      navigation.navigate('UpdateProfileInfo');
    }
  }, [user?.username]);

  const logIn = () => {
    globalNavigation.navigate('Authenticator');
  };

  const onPressProfileInfo = () => isAuthUser && navigation.navigate('UpdateProfileInfo');

  return (
    <BackgroundWrapper>
      {isLoading ? (
        <ProfileSkeleton />
      ) : !userId ? (
        <>
          <SubHeader style={{ marginTop: '10%', fontWeight: '700' }}>
            {isNewUser
              ? 'Create profile and make predictions!'
              : 'Log in to make predictions!'}
          </SubHeader>
          <SubmitButton
            style={{ marginTop: 20 }}
            text={isNewUser ? 'Create Account' : 'Log in'}
            onPress={logIn}
          />
        </>
      ) : (
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 20,
            width: '100%',
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: theme.windowMargin,
              }}
            >
              <ProfileImage
                image={user?.image}
                onPress={isAuthUser ? () => onPressProfileInfo() : undefined}
                style={{ marginLeft: 10, marginRight: 15 }}
              />
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <TouchableHighlight
                  onPress={isAuthUser ? () => onPressProfileInfo() : undefined}
                  style={{
                    borderRadius: theme.borderRadius,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  underlayColor={COLORS.disabled}
                >
                  <>
                    <HeaderLight>
                      {user?.name || (isAuthUser ? 'Add Name' : '')}
                    </HeaderLight>
                    <SubHeader style={{ marginTop: 5 }}>
                      {user?.username
                        ? '@' + user?.username
                        : isAuthUser
                        ? 'Add Username'
                        : ''}
                    </SubHeader>
                  </>
                </TouchableHighlight>
              </View>
            </View>
            {user?.bio ? (
              <TouchableHighlight
                onPress={isAuthUser ? () => onPressProfileInfo() : undefined}
                style={{
                  padding: 10,
                  margin: 20,
                  marginTop: 0,
                  borderRadius: theme.borderRadius,
                }}
                underlayColor={COLORS.disabled}
              >
                <Body>{user.bio || ''}</Body>
              </TouchableHighlight>
            ) : (
              <View style={{ marginTop: 20 }} />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: theme.windowMargin + 10,
              }}
            >
              <FollowCountButton
                onPress={() => {
                  if (user?.followerCount === 0) return;
                  navigation.dispatch(
                    StackActions.push('Followers', { userId, type: 'followers' }),
                  );
                }}
                text={`${user?.followerCount || 0} Followers`}
                loading={user?.followerCount === undefined}
              />
              <FollowCountButton
                onPress={() => {
                  if (user?.followingCount === 0) return;
                  navigation.dispatch(
                    StackActions.push('Followers', { userId, type: 'following' }),
                  );
                }}
                text={`${user?.followingCount} Following`}
                loading={user?.followingCount === undefined}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: theme.windowMargin + 10,
                marginTop: 10,
              }}
            >
              {user ? (
                <FollowButton
                  authUserIsFollowing={authUserIsFollowing || false}
                  profileUserId={user._id}
                />
              ) : null}
              {isFollowingAuthUser ? (
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
                    marginTop: 40,
                    marginLeft: theme.windowMargin,
                  }}
                >
                  Recent Predictions:
                </HeaderLight>
                <PredictionCarousel
                  predictionSets={predictionSets}
                  userId={userId}
                  userInfo={{
                    name: user?.name || '',
                    image: user?.image || '',
                  }}
                  style={{ marginTop: 10, minHeight: 10 }}
                />
              </>
            ) : null}
            {!isLoadingAllEvents && user && userEvents.length > 0 ? (
              <>
                <HeaderLight
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                    marginLeft: theme.windowMargin,
                  }}
                >
                  {(isAuthUser ? 'My' : user.name ? `${user.name}'s` : 'All') +
                    ' Predictions'}
                </HeaderLight>
                <EventList user={user} events={userEvents} isProfile={true} />
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
    </BackgroundWrapper>
  );
};

export default Profile;
