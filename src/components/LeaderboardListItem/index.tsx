import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { iLeaderboardRankingsWithUserData } from '../../services/api/requests/leaderboard';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../navigation/types';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import Template from './Template';

const LeaderboardListItem = ({
  leaderboardRanking,
  style,
}: {
  leaderboardRanking: iLeaderboardRankingsWithUserData;
  style?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { setPersonalCommunityTab } = usePersonalCommunityTab();

  const hasOnlyOneName = !(leaderboardRanking.name && leaderboardRanking.username);

  // I think this is getting userId from _id
  const userInfo: iUserInfo = {
    userId: leaderboardRanking.userId,
    userName: leaderboardRanking.name ?? leaderboardRanking.username ?? '',
    userImage: leaderboardRanking.image ?? '',
  };

  const navigateToPredictions = () => {
    setPersonalCommunityTab('personal');
    navigation.navigate('Event', {
      eventId: leaderboardRanking.eventId,
      userInfo,
      yyyymmdd: leaderboardRanking.yyyymmdd,
      phase: leaderboardRanking.phase,
      isLeaderboard: true,
    });
  };

  return (
    <Template
      onPress={navigateToPredictions}
      title={
        hasOnlyOneName
          ? leaderboardRanking.name || leaderboardRanking.username || ''
          : leaderboardRanking.name || ''
      }
      subtitle={hasOnlyOneName ? '' : leaderboardRanking.username || ''}
      rank={leaderboardRanking.rank}
      profileImage={leaderboardRanking.image}
      percentageAccuracy={leaderboardRanking.percentageAccuracy}
      numCorrect={leaderboardRanking.numCorrect}
      totalPossibleSlots={leaderboardRanking.totalPossibleSlots}
      riskiness={leaderboardRanking.riskiness}
      style={style}
    />
  );
};

export default LeaderboardListItem;
