import React, { useEffect, useRef } from 'react';
import { View, TouchableHighlight, ScrollView, Alert } from 'react-native';
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
import { PredictionsNavigationProp } from '../../navigation/types';
import useProfileUser from './useProfileUser';
import ProfileSkeleton from '../../components/Skeletons/ProfileSkeleton';
import Snackbar from '../../components/Snackbar';
import { useRouteParams } from '../../hooks/useRouteParams';
import SignedOutState from '../../components/SignedOutState';
import { getUserInfo } from '../../util/getUserInfo';
import LeaderboardListItem from '../../components/LeaderboardListItem';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import { PHASE_TO_STRING_PLURAL } from '../../constants/categories';
import { UserRole, iLeaderboard, iLeaderboardRanking } from '../../models';
import EventItemSimple from '../../components/EventItemSimple';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import DynamicHeaderScrollViewWrapper from '../../components/DynamicHeaderWrapper/DynamicHeaderScrollViewWrapper';
import SectionTopTabs from '../../components/SectionTopTabs';
import DualTabsWrapper from '../../components/DualTabsWrapper';
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import HeaderButton from '../../components/HeaderComponents/HeaderButton';
import BackButton from '../../components/HeaderComponents/BackButton';

const NullTabState = ({ tab }: { tab: string }) => {
  return (
    <SubHeader style={{ alignSelf: 'center', marginTop: 20, color: COLORS.gray }}>
      {`No ${tab} yet`}
    </SubHeader>
  );
};

const Profile = () => {
  const tabsPosX = useSharedValue(0);

  const scrollViewRef = useRef<ScrollView>(null);

  const { userInfo: routeUserInfo, disableBack } = useRouteParams();
  const { userId: authUserId, userRole: authUserRole, signOutUser } = useAuth();
  const userId = routeUserInfo?.userId || authUserId;

  const navigation = useNavigation<PredictionsNavigationProp>();
  const { setPersonalCommunityTab } = usePersonalCommunityTab();

  const { data: _events, isLoading: isLoadingAllEvents } = useQueryGetAllEvents();
  const events = _events || [];

  const { isLoading, setIsLoading, user, authUserIsFollowing, isFollowingAuthUser } =
    useProfileUser(userId);

  const iterableEvents = Object.values(events);
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

  const logOut = async () => {
    setIsLoading(true);
    await signOutUser();
    Snackbar.success('You were signed out');
    setIsLoading(false);
  };

  const onPressLogOut = () => {
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
  };

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
  const leaderboards = Object.values(user?.leaderboardRankings || {}).reduce(
    (acc: iLeaderboardRanking[], phaseToLbRanking) => {
      Object.values(phaseToLbRanking).forEach((lbRanking) => {
        // filter out hidden events
        const lb = eventLeaderboards.find(
          (e) => e.phase === lbRanking.phase && e.noShorts === lbRanking.noShorts,
        );
        if (!lb) return acc;
        acc.push(lbRanking);
      });
      return acc;
    },
    [],
  );

  return (
    <BackgroundWrapper>
      <DynamicHeaderScrollViewWrapper
        scrollViewRef={scrollViewRef}
        disableBack={disableBack}
        distanceToCollapse={disableBack ? undefined : 40}
        topOnlyContent={{
          height: disableBack ? 0 : 40,
          component: disableBack ? (
            <></>
          ) : (
            <BackButton
              variation={'on-dark'}
              style={{ marginLeft: theme.windowMargin }}
            />
          ),
        }}
        titleWhenCollapsed={user?.name ?? user?.username ?? 'Profile'}
      >
        <>
          {isLoading ? (
            <ProfileSkeleton />
          ) : !userId ? (
            <SignedOutState />
          ) : (
            <View>
              <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: theme.windowMargin,
                    marginTop: 10,
                  }}
                >
                  {isAuthUser ? (
                    <View
                      style={{
                        position: 'absolute',
                        right: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        top: 0,
                      }}
                    >
                      <HeaderButton
                        onPress={() => {
                          onPressLogOut();
                        }}
                        icon={'log-out-outline'}
                        variation={'on-dark'}
                      />
                    </View>
                  ) : null}
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
                      borderRadius: theme.borderRadius,
                      padding: theme.windowMargin,
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
                    paddingBottom: 10,
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
                <SectionTopTabs
                  tabs={[{ title: 'Predictions' }, { title: 'Leaderboards' }]}
                  tabsPosX={tabsPosX}
                />
              </LinearGradient>
              <DualTabsWrapper
                tab1={
                  <>
                    {predictionSets.length > 0 ? (
                      <>
                        <View style={{ marginTop: 10 }} />
                        <PredictionCarousel
                          predictionSets={predictionSets}
                          userInfo={userInfo}
                          hideUserInfo
                          style={{ minHeight: 10 }}
                        />
                      </>
                    ) : null}
                    {!isLoadingAllEvents && user && userEvents.length > 0 ? (
                      <>
                        {userEvents.map((event) => {
                          return (
                            <EventItemSimple
                              onPress={() => {
                                setPersonalCommunityTab('personal');
                                navigation.navigate('Event', {
                                  userInfo: getUserInfo(user),
                                  eventId: event._id,
                                });
                              }}
                              title={`${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]} ${
                                event.year
                              }`}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <NullTabState tab={'Predictions'} />
                    )}
                  </>
                }
                tab2={
                  <>
                    {leaderboards.length ? (
                      <>
                        {/* <View style={{ marginTop: 10 }} /> */}
                        {leaderboards.map((lbRanking) => {
                          const event = events.find((e) => e._id === lbRanking.eventId);
                          if (!event) return null;
                          return (
                            <>
                              <EventItemSimple
                                onPress={() => {
                                  navigation.dispatch(
                                    StackActions.push('Leaderboard', {
                                      eventId: event._id,
                                      phase: lbRanking.phase,
                                    }),
                                  );
                                }}
                                title={`${
                                  AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]
                                } ${event.year} - ${
                                  PHASE_TO_STRING_PLURAL[lbRanking.phase]
                                }`}
                              />
                              {user ? (
                                <LeaderboardListItem
                                  leaderboardRanking={{
                                    userId: user._id,
                                    ...user,
                                    ...lbRanking,
                                  }}
                                />
                              ) : null}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <NullTabState tab={'Leaderboards'} />
                    )}
                  </>
                }
                tabsPosX={tabsPosX}
              />
            </View>
          )}
        </>
      </DynamicHeaderScrollViewWrapper>
    </BackgroundWrapper>
  );
};

export default Profile;
