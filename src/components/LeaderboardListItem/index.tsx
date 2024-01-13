import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import ProfileImage from '../ProfileImage';
import { Body, SmallHeader, SubHeader } from '../Text';
import { iLeaderboardRankingsWithUserData } from '../../services/api/requests/leaderboard';
import theme from '../../constants/theme';
import { formatDecimalAsPercentage } from '../../util/formatPercentage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../navigation/types';

export const LEADERBOARD_PROFILE_IMAGE_SIZE = 50;

const LeaderboardListItem = ({
  leaderboardRanking,
  style,
}: {
  leaderboardRanking: iLeaderboardRankingsWithUserData;
  style?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation<PredictionsNavigationProp>();

  const hasOnlyOneName = !(leaderboardRanking.name && leaderboardRanking.username);

  // I think this is getting userId from _id
  const userInfo: iUserInfo = {
    userId: leaderboardRanking.userId,
    userName: leaderboardRanking.name ?? leaderboardRanking.username ?? '',
    userImage: leaderboardRanking.image ?? '',
  };

  const navigateToPredictions = () => {
    // TODO: pass parameter to get history
    // then, the event page will show overall stats at the top and checkmarks for correct predictions
    // make sure to include a follow button in there too
    // THEN, we probably want leaderboards to display on the profile page
    navigation.navigate('Event', {
      eventId: leaderboardRanking.eventId,
      userInfo,
      yyyymmdd: leaderboardRanking.yyyymmdd,
      isLeaderboard: true,
    });
  };

  const navigateToProfile = () => {
    if (!userInfo) return;
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
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
        <View style={{ flexDirection: 'row', flex: 2 }}>
          <View
            style={{
              width: 20,
              marginRight: theme.windowMargin,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <SubHeader style={{ alignSelf: 'center' }} numberOfLines={1}>
              {leaderboardRanking.rank.toString()}
            </SubHeader>
          </View>
          <ProfileImage
            image={leaderboardRanking.image}
            imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
            onPress={navigateToProfile}
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
