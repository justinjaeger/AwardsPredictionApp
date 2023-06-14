import React, { memo } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import { iUser } from '../../types';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { IMAGE_SIZE } from '.';

const UserSearchResultItem = ({
  item,
  authUserId,
  onPress,
}: {
  item: iUser;
  authUserId: string | undefined;
  onPress: (userId: string) => void;
}) => {
  const hasOnlyOneName = !(item.name && item.username);
  const isSignedInUser = item.id === authUserId;
  const authUserIsFollowing = item.authUserIsFollowing || false;
  return (
    <TouchableHighlight
      key={item.id}
      style={{
        flexDirection: 'row',
        padding: 10,
        width: '100%',
      }}
      onPress={() => onPress(item.id)}
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
            onPress={() => onPress(item.id)}
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
            profileUserId={item.id}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default memo(UserSearchResultItem);
