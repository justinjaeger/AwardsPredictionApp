import React, { useEffect } from 'react';
import { View, TouchableHighlight, ScrollView } from 'react-native';
import { Body, BodyBold, HeaderLight, SubHeader } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { StackActions, useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import PredictionCarousel from '../../components/PredictionCarousel';
import COLORS from '../../constants/colors';
import ProfileImage from '../../components/ProfileImage';
import FollowButton from '../../components/FollowButton';
import FollowCountButton from '../../components/FollowCountButton';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import EventList from '../Predictions/EventSelect/EventList';
import { PredictionsNavigationProp } from '../../navigation/types';
import useProfileUser from './useProfileUser';
import useProfileHeader from './useProfileHeader';
import ProfileSkeleton from '../../components/Skeletons/ProfileSkeleton';
import Snackbar from '../../components/Snackbar';
import { useRouteParams } from '../../hooks/useRouteParams';
import SignedOutState from '../../components/SignedOutState';
import { getUserInfo } from '../../util/getUserInfo';
import LeaderboardListItem from '../../components/LeaderboardListItem';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import { PHASE_TO_STRING } from '../../constants/categories';
import CustomIcon from '../../components/CustomIcon';
import { UserRole, iLeaderboard, iLeaderboardRanking } from '../../types/api';

const Profile = () => {
  const { userInfo: routeUserInfo } = useRouteParams();
  const { userId: authUserId, userRole: authUserRole } = useAuth();
  const userId = routeUserInfo?.userId || authUserId;

  const navigation = useNavigation<PredictionsNavigationProp>();

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

  useEffect(() => {
    if (isAuthUser && (!user.username || !user.name)) {
      navigation.navigate('UpdateProfileInfo');
      Snackbar.warning(`Update your ${!user.username ? 'username' : 'name'} to continue`);
    }
  }, [user?.username, user?.name]);

  const onPressProfileInfo = () => isAuthUser && navigation.navigate('UpdateProfileInfo');

  const userInfo = getUserInfo(user); // this SEEMS redundant since from params, but if we're the auth user, we actually won't have this

  const eventLeaderboards = events.reduce((acc: iLeaderboard[], event) => {
    if (!event.leaderboards) return acc;
    for (const leaderboard of Object.values(event.leaderboards)) {
      const a = { ...event, ...leaderboard };
      if (leaderboard.isHidden && authUserRole !== UserRole.ADMIN) continue;
      acc.push(a);
    }
    return acc;
  }, []);

  // TODO: This is similar to what's in LeaderboardList. Maybe refactor?
  const leaderboards: iLeaderboardRanking[] = Object.values(
    user?.leaderboardRankings || {},
  ).reduce((acc, phaseToLbRanking) => {
    Object.values(phaseToLbRanking).forEach((lbRanking) => {
      // filter out hidden events
      const lb = eventLeaderboards.find(
        (e) => e.phase === lbRanking.phase && e.noShorts === lbRanking.noShorts,
      );
      if (lb.isHidden && authUserRole !== UserRole.ADMIN) return acc;
      acc.push(lbRanking);
    });
    return acc;
  }, []);

  return (
    <BackgroundWrapper>
      {isLoading ? (
        <ProfileSkeleton />
      ) : !userId ? (
        <SignedOutState />
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
                style={{ marginRight: 15 }}
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
                  margin: theme.windowMargin,
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
                marginLeft: theme.windowMargin,
              }}
            >
              <FollowCountButton
                onPress={() => {
                  if (user?.followerCount === 0) return;
                  navigation.dispatch(
                    StackActions.push('Followers', {
                      userInfo: getUserInfo(user),
                      type: 'followers',
                    }),
                  );
                }}
                text={`${user?.followerCount ?? 0} Followers`}
              />
              <FollowCountButton
                onPress={() => {
                  if (user?.followingCount === 0) return;
                  navigation.dispatch(
                    StackActions.push('Followers', {
                      userInfo: getUserInfo(user),
                      type: 'following',
                    }),
                  );
                }}
                text={`${user?.followingCount ?? 0} Following`}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                marginLeft: theme.windowMargin,
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
                    marginTop: 40,
                    marginLeft: theme.windowMargin,
                  }}
                >
                  Recent Predictions:
                </HeaderLight>
                <PredictionCarousel
                  predictionSets={predictionSets}
                  userInfo={userInfo}
                  hideUserInfo
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
                    marginBottom: -10,
                  }}
                >
                  {(isAuthUser ? 'My' : 'All') + ' Predictions'}
                </HeaderLight>
                <EventList user={user} events={userEvents} isProfile={true} />
              </>
            ) : null}
            {leaderboards.length ? (
              <>
                <HeaderLight
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                    marginLeft: theme.windowMargin,
                    marginBottom: 10,
                  }}
                >
                  {'Leaderboards'}
                </HeaderLight>
                {leaderboards.map((lbRanking) => {
                  const event = events.find((e) => e._id === lbRanking.eventId);
                  return (
                    <>
                      <TouchableHighlight
                        onPress={() => {
                          navigation.dispatch(
                            StackActions.push('Leaderboard', {
                              eventId: event._id,
                              phase: lbRanking.phase,
                            }),
                          );
                        }}
                        style={{
                          padding: 10,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        underlayColor={COLORS.secondaryDark}
                      >
                        <>
                          <SubHeader>
                            {`${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]} ${
                              event.year
                            } - ${PHASE_TO_STRING[lbRanking.phase]}`}
                          </SubHeader>
                          <CustomIcon
                            name="chevron-right"
                            size={24}
                            color={COLORS.white}
                          />
                        </>
                      </TouchableHighlight>
                      <LeaderboardListItem
                        leaderboardRanking={{ userId: user._id, ...user, ...lbRanking }}
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      />
                    </>
                  );
                })}
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
    </BackgroundWrapper>
  );
};

export default Profile;
