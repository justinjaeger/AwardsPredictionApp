import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import ProfileImage from '../ProfileImage';
import { Body, SmallHeader, SubHeader } from '../Text';
import { iLeaderboardRankingsWithUserData } from '../../services/api/requests/leaderboard';
import { formatDecimalAsPercentage } from '../../util/formatPercentage';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../navigation/types';
import { usePersonalCommunityTab } from '../../context/EventContext';

export const LEADERBOARD_PROFILE_IMAGE_SIZE = 50;

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
    <TouchableHighlight
      key={leaderboardRanking._id}
      style={[
        {
          flexDirection: 'row',
          padding: 10,
          width: '100%',
        },
        style,
      ]}
      onPress={navigateToPredictions}
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
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 35,
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <SubHeader
              style={{ overflow: 'visible', textAlign: 'left' }}
              numberOfLines={1}
            >
              {leaderboardRanking.rank.toString()}
            </SubHeader>
          </View>
          <ProfileImage
            image={leaderboardRanking.image}
            imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
            onPress={navigateToPredictions}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 10,
            }}
          >
            <SubHeader>
              {hasOnlyOneName
                ? leaderboardRanking.name || leaderboardRanking.username || ''
                : leaderboardRanking.name || ''}
            </SubHeader>
            <Body>{hasOnlyOneName ? '' : leaderboardRanking.username || ''}</Body>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <SmallHeader>
              {formatDecimalAsPercentage(leaderboardRanking.percentageAccuracy)}
            </SmallHeader>
            <SubHeader>{'%'}</SubHeader>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <SubHeader
              style={{ fontWeight: '400' }}
            >{`${leaderboardRanking.riskiness.toFixed(0)}pts  |  `}</SubHeader>
            {/* TODO: Some visual representation of riskiness?? No one will know what this number means */}
            <SubHeader
              style={{ fontWeight: '400' }}
            >{`${leaderboardRanking.numCorrect}/${leaderboardRanking.totalPossibleSlots}`}</SubHeader>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default LeaderboardListItem;
