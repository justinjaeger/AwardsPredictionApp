import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import { useSearch } from '../../context/ContenderSearchContext';
import { useAuth } from '../../context/UserContext';
import { iUser } from '../../types';
import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';
import { Body, BodyBold, SubHeader } from '../Text';

const UserSearchResult = ({ users }: { users: iUser[] }) => {
  const { userId: authUserId } = useAuth();
  const navigation = useNavigation();
  const { isSearching, isLoadingSearch } = useSearch();

  const navigateToProfile = (userId: string) => {
    navigation.navigate('FriendProfile', { userId });
  };

  return (
    <>
      {users.length === 0 && isSearching && !isLoadingSearch ? (
        <BodyBold>No Users Found</BodyBold>
      ) : null}
      {users.map((user) => {
        const hasOnlyOneName = !(user.name && user.username);
        const isSignedInUser = user.id === authUserId;
        const authUserIsFollowing = user.authUserIsFollowing || false;
        return (
          <TouchableHighlight
            key={user.id}
            style={{
              flexDirection: 'row',
              padding: 10,
              width: '100%',
            }}
            onPress={() => navigateToProfile(user.id)}
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
                  imageSize={50}
                  onPress={() => navigateToProfile(user.id)}
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
                  <Body>{hasOnlyOneName ? 'asdfasdf' : user.username || ''}</Body>
                </View>
              </View>
              {!isSignedInUser ? (
                <FollowButton
                  authUserIsFollowing={authUserIsFollowing}
                  profileUserId={user.id}
                />
              ) : null}
            </View>
          </TouchableHighlight>
        );
      })}
    </>
  );
};

export default UserSearchResult;
