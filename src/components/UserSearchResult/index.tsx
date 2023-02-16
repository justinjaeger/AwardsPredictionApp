import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import { iUser } from '../../types';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, BodyBold, SubHeader } from '../Text';

const UserSearchResult = ({
  users,
  onEndReached,
}: {
  users: iUser[];
  onEndReached?: () => void;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useNavigation();
  const { isSearching, isLoadingSearch } = useSearch();

  const navigateToProfile = (userId: string) => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userId }));
  };

  if (users.length === 0 && isSearching && !isLoadingSearch) {
    return <BodyBold>No Users Found</BodyBold>;
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      data={users}
      contentContainerStyle={{ alignItems: 'center' }}
      keyExtractor={(item) => item.id}
      onEndReached={() => {
        console.error('onEndReached');
        onEndReached && onEndReached();
      }}
      onEndReachedThreshold={0.9} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      keyboardShouldPersistTaps={'always'} // so keyboard doesn't dismiss when tapping on list
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
                  imageSize={50}
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
