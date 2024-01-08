import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { useAuth } from '../../context/AuthContext';
import { iLeaderboardRankingsWithUserData } from '../../services/api/requests/leaderboard';

export const LEADERBOARD_PROFILE_IMAGE_SIZE = 50;

const LeaderboardListItem = ({
  leaderboardRanking,
  authUserIsFollowing,
  onPress,
}: {
  leaderboardRanking: iLeaderboardRankingsWithUserData;
  authUserIsFollowing: boolean;
  onPress: (userId: string) => void;
}) => {
  const { userId: authUserId } = useAuth();
  const isAuthUser = leaderboardRanking.userId === authUserId;

  const hasOnlyOneName = !(leaderboardRanking.name && leaderboardRanking.username);

  return (
    <TouchableHighlight
      key={leaderboardRanking._id}
      style={{
        flexDirection: 'row',
        padding: 10,
        width: '100%',
      }}
      onPress={() => onPress(leaderboardRanking.userId)}
      underlayColor={COLORS.secondaryDark}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <ProfileImage
            image={leaderboardRanking.image}
            imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
            onPress={() => onPress(leaderboardRanking.userId)}
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
        {!isAuthUser ? (
          <FollowButton
            authUserIsFollowing={authUserIsFollowing}
            profileUserId={leaderboardRanking.userId}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default LeaderboardListItem;
