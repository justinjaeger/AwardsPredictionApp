import React, { memo } from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, SubHeader } from '../Text';
import { User, WithId } from '../../models';
import { iUserInfo } from '../../navigation/types';
import theme from '../../constants/theme';
import { hexToRgb } from '../../util/hexToRgb';
import useDevice from '../../util/device';

export const USER_SEARCH_IMAGE_SIZE = 50;
export const getUserSearchItemHeight = (isPad?: boolean) => 70 * (isPad ? 1.5 : 1);

const UserSearchResultItem = ({
  item,
  authUserIsFollowing,
  onPress,
}: {
  item: WithId<User>;
  authUserIsFollowing: boolean;
  onPress: (userInfo: iUserInfo) => void;
}) => {
  const { isPad } = useDevice();

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
        height: getUserSearchItemHeight(isPad),
        alignItems: 'center',
        width: '100%',
        paddingLeft: theme.windowMargin,
        paddingRight: theme.windowMargin,
        borderColor: hexToRgb(COLORS.primaryLight, 0.3),
        borderBottomWidth: 1,
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
            imageSize={USER_SEARCH_IMAGE_SIZE}
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
