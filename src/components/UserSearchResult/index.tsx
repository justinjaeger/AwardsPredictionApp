import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import theme from '../../constants/theme';
import { HeaderLight, SubHeader } from '../Text';
import UserListSkeleton from '../Skeletons/UserListSkeleton';
import { User, WithId } from '../../models';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';
import useDevice from '../../util/device';
import { PredictionsNavigationProp, iUserInfo } from '../../navigation/types';
import UserSearchResultItem from './UserSearchResultItem';

export const IMAGE_SIZE = 50;

const UserSearchResult = ({
  users,
  allUsersAreFetched,
  isLoading,
  onEndReached,
  header,
  noHeader,
}: {
  users: WithId<User>[];
  allUsersAreFetched?: boolean;
  isLoading?: boolean;
  onEndReached?: () => void;
  header?: string;
  noHeader?: boolean;
}) => {
  const { isPad } = useDevice();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  const navigateToProfile = (userInfo: iUserInfo) => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
  };

  return (
    <FlatList
      style={{ height: '100%', width: '100%' }}
      data={users}
      indicatorStyle="white"
      contentContainerStyle={{
        alignItems: 'flex-start',
      }}
      keyExtractor={(item) => item._id}
      onScroll={(e) => {
        // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
        // get position of current scroll
        const currentOffset = e.nativeEvent.contentOffset.y;
        // get max bottom of scroll
        const maxOffset =
          e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
        // if we're close to the bottom fetch more
        if (currentOffset > maxOffset - 200) {
          onEndReached && onEndReached();
        }
      }}
      scrollEventThrottle={500}
      onEndReachedThreshold={isPad ? 0.8 : 0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      keyboardShouldPersistTaps={'always'} // so keyboard doesn't dismiss when tapping on list
      ListHeaderComponent={
        users.length === 0 && !isLoading ? (
          <View style={{ width }}>
            <SubHeader style={{ textAlign: 'center', marginTop: 20 }}>
              No Results
            </SubHeader>
          </View>
        ) : noHeader ? null : (
          <HeaderLight
            style={{
              paddingTop: 10,
              alignSelf: 'flex-start',
              marginLeft: theme.windowMargin,
              marginBottom: 10,
            }}
          >
            {header || 'Recommended:'}
          </HeaderLight>
        )
      }
      ListFooterComponent={
        isLoading || !allUsersAreFetched ? (
          <UserListSkeleton imageSize={IMAGE_SIZE} numResults={3} />
        ) : null
      }
      renderItem={({ item }) => (
        <UserSearchResultItem
          item={item}
          authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(item._id)}
          onPress={navigateToProfile}
        />
      )}
    />
  );
};

export default UserSearchResult;
