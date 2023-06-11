import React from 'react';
import { View, TouchableHighlight, Animated } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import { Body, BodyBold, HeaderLight, SubHeader } from '../../components/Text';
import { useAuth } from '../../context/UserContext';
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
import { useTypedNavigation } from '../../util/hooks';
import ProfileImage from '../../components/ProfileImage';
import FollowButton from '../../components/FollowButton';
import FollowCountButton from '../../components/FollowCountButton';
import useQueryAllEvents from '../../hooks/queries/getAllEvents';
import EventList from '../Predictions/Event/EventList';
import { MainScreenNavigationProp, PredictionsParamList } from '../../navigation/types';
import LoadingStatue from '../../components/LoadingStatue';
import { useLoading } from '../../hooks/animatedState/useLoading';
import useProfileUser from './useProfileUser';
import useProfileHeader from './useProfileHeader';

const Profile = () => {
  // If we pass userId as params, it loads that user's profile. If not, it attemps to get logged in profile.
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Profile'>>();
  const { userId: authUserId, userEmail } = useAuth();
  const userId = params?.userId || authUserId;

  const globalNavigation = useNavigation<MainScreenNavigationProp>();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { data: events, isLoading: isLoadingAllEvents } = useQueryAllEvents();

  const { isLoading, setIsLoading, user, followingCount, followerCount, userEventIds } =
    useProfileUser(userId);

  // handles the header (and logout button)
  useProfileHeader(userId, isLoading, setIsLoading);

  const { loadingOpacity, bodyOpacity } = useLoading(isLoading);

  const iterableEvents = events ? Object.values(events) || [] : [];
  const userEvents = Object.values(iterableEvents)?.filter((event) =>
    userEventIds.includes(event.id),
  );

  const isAuthUser = user && userId && user?.id === authUserId;

  const predictionSets = user?.predictionSets || [];

  const logIn = () => {
    globalNavigation.navigate('Authenticator');
  };

  const onPressProfileInfo = () => isAuthUser && navigation.navigate('UpdateProfileInfo');

  if (!userId) {
    return (
      <BackgroundWrapper>
        <>
          <SubHeader style={{ marginTop: '10%', fontWeight: '700' }}>
            {userEmail
              ? 'Log in to make predictions!'
              : 'Create profile and make predictions!'}
          </SubHeader>
          <SubmitButton
            style={{ marginTop: 20, maxWidth: 180 }}
            text={userEmail ? 'Log in' : 'Create Account'}
            onPress={logIn}
          />
        </>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loadingOpacity,
        }}
      >
        <LoadingStatue />
      </Animated.View>
      <Animated.ScrollView
        style={{ opacity: bodyOpacity, width: '100%' }}
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
                if (followerCount === 0) return;
                navigation.dispatch(
                  StackActions.push('Followers', { userId, type: 'followers' }),
                );
              }}
              text={`${followerCount} Followers`}
              loading={followerCount === undefined}
            />
            <FollowCountButton
              onPress={() => {
                if (followingCount === 0) return;
                navigation.dispatch(
                  StackActions.push('Followers', { userId, type: 'following' }),
                );
              }}
              text={`${followingCount} Following`}
              loading={followingCount === undefined}
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
                  marginTop: 40,
                  marginLeft: theme.windowMargin,
                }}
              >
                Recent Predictions:
              </HeaderLight>
              <PredictionCarousel
                predictionSets={predictionSets}
                userId={userId}
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
      </Animated.ScrollView>
    </BackgroundWrapper>
  );
};

export default Profile;
