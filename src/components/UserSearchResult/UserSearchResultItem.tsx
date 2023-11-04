import React, { memo } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { IMAGE_SIZE } from '.';
import { User, WithId } from '../../types/api';

const UserSearchResultItem = ({
  item,
  authUserId,
  authUserIsFollowing,
  onPress,
}: {
  item: WithId<User>;
  authUserId: string | undefined;
  authUserIsFollowing: boolean;
  onPress: (userId: string) => void;
}) => {
  const hasOnlyOneName = !(item.name && item.username);
  const isSignedInUser = item._id === authUserId;
  // TODO: get the relationship between the auth user and the profile user
  // Problem here is this is expensive to do for every user in the list...
  // But what we can do is just request every "following" relationship from auth user
  // and compare to that
  return (
    <TouchableHighlight
      key={item._id}
      style={{
        flexDirection: 'row',
        padding: 10,
        width: '100%',
      }}
      onPress={() => onPress(item._id)}
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
            image={item.image}
            imageSize={IMAGE_SIZE}
            onPress={() => onPress(item._id)}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 10,
            }}
          >
            <SubHeader>
              {hasOnlyOneName ? item.name || item.username || '' : item.name || ''}
            </SubHeader>
            <Body>{hasOnlyOneName ? '' : item.username || ''}</Body>
          </View>
        </View>
        {!isSignedInUser ? (
          <FollowButton
            authUserIsFollowing={authUserIsFollowing}
            profileUserId={item._id}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default memo(UserSearchResultItem);
