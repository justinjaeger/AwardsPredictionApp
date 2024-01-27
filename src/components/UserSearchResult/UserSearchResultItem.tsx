import React, { memo } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { IMAGE_SIZE } from '.';
import { User, WithId } from '../../models';
import { iUserInfo } from '../../navigation/types';

const UserSearchResultItem = ({
  item,
  authUserIsFollowing,
  onPress,
}: {
  item: WithId<User>;
  authUserIsFollowing: boolean;
  onPress: (userInfo: iUserInfo) => void;
}) => {
  const hasOnlyOneName = !(item.name && item.username);

  const onPressProfileImage = () => {
    onPress({
      userId: item._id,
      userName: item.name ?? item.username ?? '',
      userImage: item.image,
    });
  };

  return (
    <TouchableHighlight
      key={item._id}
      style={{
        flexDirection: 'row',
        padding: 10,
        width: '100%',
      }}
      onPress={() => onPressProfileImage()}
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
            onPress={() => onPressProfileImage()}
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
        <FollowButton
          authUserIsFollowing={authUserIsFollowing}
          profileUserId={item._id}
        />
      </View>
    </TouchableHighlight>
  );
};

export default memo(UserSearchResultItem);
