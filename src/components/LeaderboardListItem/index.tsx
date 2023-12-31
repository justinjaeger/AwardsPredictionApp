import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { User, WithId } from '../../types/api';
import { useAuth } from '../../context/AuthContext';

export const LEADERBOARD_PROFILE_IMAGE_SIZE = 50;

const LeaderboardListuser = ({
  user,
  authUserIsFollowing,
  onPress,
  rank,
  riskiness,
  percentageAccuracy,
}: {
  user: WithId<User>;
  authUserIsFollowing: boolean;
  onPress: (userId: string) => void;
  rank: number;
  riskiness: number;
  percentageAccuracy: number;
}) => {
  const { userId: authUserId } = useAuth();
  const isAuthUser = user._id === authUserId;

  const hasOnlyOneName = !(user.name && user.username);

  return (
    <TouchableHighlight
      key={user._id}
      style={{
        flexDirection: 'row',
        padding: 10,
        width: '100%',
      }}
      onPress={() => onPress(user._id)}
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
            image={user.image}
            imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
            onPress={() => onPress(user._id)}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 10,
            }}
          >
            <SubHeader>
              {hasOnlyOneName ? user.name || user.username || '' : user.name || ''}
            </SubHeader>
            <Body>{hasOnlyOneName ? '' : user.username || ''}</Body>
          </View>
        </View>
        {!isAuthUser ? (
          <FollowButton
            authUserIsFollowing={authUserIsFollowing}
            profileUserId={user._id}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default LeaderboardListuser;
