import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import theme from '../../constants/theme';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import { iUser } from '../../types';
import { HeaderLight, SubHeader } from '../Text';
import UserListSkeleton from '../Skeletons/UserListSkeleton';
import UserSearchResultItem from './UserSearchResultItem';

export const IMAGE_SIZE = 50;

const UserSearchResult = ({
  users,
  isLoading,
  onEndReached,
  header,
  noHeader,
}: {
  users: iUser[];
  isLoading?: boolean;
  onEndReached?: () => void;
  header?: string;
  noHeader?: boolean;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useNavigation();
  const { isSearching, isLoadingSearch } = useSearch();

  const navigateToProfile = (userId: string) => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userId }));
  };

  const noResults = users.length === 0 && !isLoading;

  if (users.length === 0 && isSearching && !isLoadingSearch) {
    return (
      <SubHeader style={{ marginTop: '5%', fontWeight: '700' }}>
        {'No Users Found'}
      </SubHeader>
    );
  }

  return (
    <FlatList
      style={{ height: '100%', width: '100%' }}
      data={users}
      indicatorStyle="white"
      contentContainerStyle={{
        alignItems: 'flex-start',
      }}
      keyExtractor={(item) => item.id}
      onScrollEndDrag={(e) => {
        // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
        // get position of current scroll
        const currentOffset = e.nativeEvent.contentOffset.y;
        // get max bottom of scroll
        const maxOffset =
          e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
        // if we're close to the bottom fetch more
        if (currentOffset > maxOffset - 50) {
          onEndReached && onEndReached();
        }
      }}
      scrollEventThrottle={1000}
      onEndReachedThreshold={0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      keyboardShouldPersistTaps={'always'} // so keyboard doesn't dismiss when tapping on list
      ListHeaderComponent={
        noHeader || noResults ? null : (
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
      ListFooterComponent={isLoading ? <UserListSkeleton imageSize={IMAGE_SIZE} /> : null}
      renderItem={({ item }) => (
        <UserSearchResultItem
          item={item}
          authUserId={authUserId}
          onPress={navigateToProfile}
        />
      )}
    />
  );
};

export default UserSearchResult;
