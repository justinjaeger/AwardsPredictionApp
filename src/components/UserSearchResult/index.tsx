import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import { iUser } from '../../types';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, HeaderLight, SubHeader } from '../Text';
import UserListSkeleton from '../Skeletons/UserListSkeleton';

const IMAGE_SIZE = 50;

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

  if (users.length === 0 && isSearching && !isLoadingSearch) {
    return (
      <SubHeader style={{ marginTop: '5%', fontWeight: '700' }}>
        {'No Users Found'}
      </SubHeader>
    );
  }

  const noResults = users.length === 0 && !isLoading;

  return (
    <FlatList
      style={{ width: '100%' }}
      data={users}
      contentContainerStyle={{ alignItems: 'flex-start' }}
      keyExtractor={(item) => item.id}
      onEndReached={() => {
        onEndReached && onEndReached();
      }}
      onEndReachedThreshold={0.9} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      keyboardShouldPersistTaps={'always'} // so keyboard doesn't dismiss when tapping on list
      ListHeaderComponent={
        noHeader || noResults ? null : (
          <HeaderLight
            style={{
              marginTop: 20,
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
      renderItem={({ item }) => {
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
            onPress={() => navigateToProfile(item.id)}
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
                  onPress={() => navigateToProfile(item.id)}
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
      }}
    />
  );
};

export default UserSearchResult;
