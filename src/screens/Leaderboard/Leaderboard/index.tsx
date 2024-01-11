import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, Keyboard, TouchableHighlight, View } from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { Body, SmallHeader, SubHeader } from '../../../components/Text';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';
import { PredictionsParamList } from '../../../navigation/types';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import COLORS from '../../../constants/colors';
import {
  formatDecimalAsPercentage,
  formatPercentage,
} from '../../../util/formatPercentage';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';

const Leaderboard = () => {
  const { isPad } = useDevice();
  const {
    params: { eventId, phase, noShorts },
  } = useRoute<RouteProp<PredictionsParamList, 'Leaderboard'>>();

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const userLeaderboard = user && getUserLeaderboard({ user, eventId, phase, noShorts });

  const events = useGetEventsWithLeaderboard();
  const event = events.find((e) => e._id === eventId);
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

  const onEndReached = () => {
    fetchPage();
  };

  if (!leaderboard) return null;

  // TODO:
  // leaderboard.percentageAccuracyDistribution can become a chart

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
            <SubHeader>{`Num predicting: ${leaderboard.numPredicted}`}</SubHeader>
            <SubHeader>{`Median %: ${leaderboard.medianPercentageAccuracy} users`}</SubHeader>
            {/* <SubHeader>{`Best: ${leaderboard.topPercentageAccuracy})`}</SubHeader> */}
            <SubHeader>{`Community % accurate: ${leaderboard.communityPercentageAccuracy}`}</SubHeader>
            <SubHeader>{`Community riskiness: ${leaderboard.communityRiskiness}`}</SubHeader>
            <TouchableHighlight
              style={{
                flexDirection: 'row',
                padding: 10,
                width: '100%',
              }}
              onPress={() => {}}
              underlayColor={COLORS.secondaryDark}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: 'row', flex: 2 }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      marginLeft: 10,
                    }}
                  >
                    <SubHeader>Community</SubHeader>
                    <Body>{'Performance of the user collective'}</Body>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <SmallHeader>
                      {formatDecimalAsPercentage(leaderboard.communityPercentageAccuracy)}
                    </SmallHeader>
                    <SubHeader>{'%'}</SubHeader>
                  </View>
                  <SubHeader>{`Better than ${formatPercentage(
                    leaderboard.communityPerformedBetterThanNumUsers /
                      leaderboard.numPredicted,
                  )} of users`}</SubHeader>
                  {/* You can't get any lower than THIS number, bc riskiness is relative to community 
                      Unless you didn't predict every slot, then you'd get no points
                      But then riskiness isn't really a good metric anyway is it?
                    */}
                  <SubHeader>{leaderboard.communityRiskiness.toFixed(0)}</SubHeader>
                </View>
              </View>
            </TouchableHighlight>
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
