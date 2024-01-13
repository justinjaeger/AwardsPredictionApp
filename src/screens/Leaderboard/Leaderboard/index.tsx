import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import {
  FlatList,
  Keyboard,
  TouchableHighlight,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { Body, SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import COLORS from '../../../constants/colors';
import {
  formatDecimalAsPercentage,
  formatLowDecimalAsPercentage,
} from '../../../util/formatPercentage';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { getTwoLineHeaderTitle } from '../../../constants';
import { eventToString } from '../../../util/stringConversions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PHASE_TO_STRING } from '../../../constants/categories';
import Stat from '../../../components/ItemStatBox/Stat';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import _ from 'lodash';

const Leaderboard = () => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const navigation = useNavigation();
  const { event, eventId: _eventId, phase: _phase, noShorts } = useRouteParams();
  const eventId = _eventId!;
  const phase = _phase!;

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const userLeaderboard = user && getUserLeaderboard({ user, eventId, phase, noShorts });

  const leaderboard =
    event?.leaderboards &&
    Object.values(event.leaderboards).find(
      (l) => l.phase === phase && !!l.noShorts === !!noShorts,
    );

  const { leaderboardRankings, fetchPage, isLoading } = useGetLeaderboardUsers({
    eventId,
    phase,
    noShorts,
  });

  // set custom back arrow functionality
  useEffect(() => {
    if (!event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const headerTitle = `${eventName}\n${PHASE_TO_STRING[phase]} Leaderboard`;
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: getTwoLineHeaderTitle(headerTitle),
    });
  }, [navigation]);

  const onEndReached = () => {
    fetchPage();
  };

  // const [chartWidth, setChartWidth] = useState<number>(width * 2);

  const sliderMin = useSharedValue(0);
  const sliderMax = useSharedValue(100);
  const sliderProgress = useSharedValue(0);
  const [chartWidth, _setChartWidth] = useState<number>(width);

  // TODO: This is too insane. Maybe we can just do some sort of animated STRETCH
  const request = _.debounce(
    (v: number) => {
      _setChartWidth(width + (v / 100) * (width * 4));
    },
    600,
    {
      leading: true,
    },
  );
  const setChartWidth = useCallback((v: number) => request(v), [_setChartWidth]);

  if (!leaderboard) return null;

  const chartHeight = 75;
  const largestSegmentOfUsersWithSamePercentage = Math.max(
    ...Object.values(leaderboard.percentageAccuracyDistribution),
  );

  const resultsGroupedByRoundedPercentage: [percentage: number, numPredicting: number][] =
    [];
  const totalBars = leaderboard.totalPossibleSlots;
  for (let i = totalBars; i >= 0; i--) {
    const percentage = formatLowDecimalAsPercentage(i / totalBars);
    const numPredicting: number | undefined =
      leaderboard.percentageAccuracyDistribution[percentage];
    resultsGroupedByRoundedPercentage.push([percentage, numPredicting ?? 0]);
  }

  const indicatorsOnScreen = 8;
  const indicatorsTotal = Math.floor(indicatorsOnScreen * (chartWidth / width));

  return (
    <BackgroundWrapper>
      <FlatList
        data={leaderboardRankings}
        keyExtractor={(item) => item.userId}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={(e) => {
          Keyboard.dismiss();
          // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
          // get position of current scroll
          const currentOffset = e.nativeEvent.contentOffset.y;
          // get max bottom of scroll
          const maxOffset =
            e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
          // if we're close to the bottom fetch more
          if (currentOffset > maxOffset - 200 && onEndReached) {
            onEndReached();
          }
        }}
        scrollEventThrottle={500}
        onEndReachedThreshold={isPad ? 0.8 : 0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
        keyboardShouldPersistTaps={'always'}
        ListHeaderComponent={
          <>
            <TouchableHighlight
              style={{
                flexDirection: 'row',
                width: '100%',
              }}
              onPress={() => {}}
              underlayColor={COLORS.secondaryDark}
            >
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                  paddingVertical: 20,
                }}
              >
                <View style={{ flexDirection: 'row', flex: 2 }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      margin: 10,
                      marginTop: 0,
                    }}
                  >
                    <SubHeader>Community Aggregate</SubHeader>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}
                >
                  <Stat
                    number={`${formatDecimalAsPercentage(
                      leaderboard.communityPercentageAccuracy,
                    )}%`}
                    text="accuracy"
                  />
                  <Stat
                    number={`${leaderboard.communityNumCorrect}/${leaderboard.totalPossibleSlots}`}
                    text="correct"
                  />
                  <Stat
                    number={`${
                      leaderboard.numPredicted -
                      leaderboard.communityPerformedBetterThanNumUsers
                    }/${leaderboard.numPredicted}`}
                    text="rank"
                  />
                </View>
              </View>
            </TouchableHighlight>
            <ScrollView
              horizontal
              style={{ width: '100%' }}
              contentContainerStyle={{
                flexDirection: 'column',
              }}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  height: chartHeight,
                  width: chartWidth,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}
              >
                {resultsGroupedByRoundedPercentage.map(([percentage, numPredicting]) => {
                  const sectionWidth = chartWidth / totalBars;
                  return (
                    <View
                      style={{
                        height: '100%',
                        // backgroundColor: 'rgba(0,0,0,0.1)',
                        justifyContent: 'flex-end',
                        marginLeft: sectionWidth * 0.5,
                      }}
                    >
                      <View
                        key={percentage}
                        style={{
                          backgroundColor: COLORS.secondaryDark,
                          height:
                            (numPredicting / largestSegmentOfUsersWithSamePercentage) *
                            chartHeight,
                          width: sectionWidth * 0.5,
                          marginBottom: 0,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: COLORS.white,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              />
              {/* loop throgh 1/100 and decide which indicators to show and where, and make it totalWidth */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: 40,
                  marginTop: 4,
                }}
              >
                {new Array(100).fill(0).map((_, i) => {
                  const percentage = 100 - i;
                  const shouldShowIndicator =
                    percentage % Math.floor(100 / indicatorsTotal) === 0;
                  return (
                    <View style={{ width: chartWidth / 100, position: 'relative' }}>
                      {shouldShowIndicator ? (
                        <View
                          style={{
                            position: 'absolute',
                            width: width / indicatorsOnScreen - 2,
                            flexDirection: 'column',
                          }}
                        >
                          <View
                            style={{
                              height: 10,
                              width: 1,
                              backgroundColor: COLORS.white,
                              alignSelf: 'flex-start',
                            }}
                          />
                          <Body
                            style={{
                              color: COLORS.white,
                            }}
                            numberOfLines={1}
                          >{`${percentage}%`}</Body>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <Slider
              style={{
                width: '94%',
                alignSelf: 'center',
                margin: 20,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              // TODO: Bubble needs to start out all the way to the left
              onValueChange={setChartWidth}
              // onSlidingComplete={(v) => _setChartWidth(width + (v / 100) * (width * 4))}
              progress={sliderProgress}
              minimumValue={sliderMin}
              maximumValue={sliderMax}
              renderBubble={() => null}
              containerStyle={{
                borderRadius: 10,
              }}
              renderThumb={() => (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.secondaryDark,
                  }}
                />
              )}
              theme={{
                disableMinTrackTintColor: 'red',
                maximumTrackTintColor: COLORS.secondaryLight,
                minimumTrackTintColor: COLORS.secondaryDark,
                cacheTrackTintColor: 'red',
                bubbleBackgroundColor: COLORS.primary,
                bubbleTextColor: COLORS.white,
              }}
            />
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: COLORS.white,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            {/* TODO: Display auth user now. Can get from the user object. */}
            {user && userLeaderboard ? (
              <LeaderboardListItem
                leaderboardRanking={{ userId: user._id, ...user, ...userLeaderboard }}
              />
            ) : null}
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: COLORS.white,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          </>
        }
        ListFooterComponent={
          isLoading ? (
            <UserListSkeleton
              imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
              numResults={10}
            />
          ) : null
        }
        renderItem={({ item }) => {
          if (!item) return null;
          return <LeaderboardListItem leaderboardRanking={item} />;
        }}
      />
    </BackgroundWrapper>
  );
};

export default Leaderboard;
