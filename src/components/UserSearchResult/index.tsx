import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/UserContext';
import { iUserSearchResult } from '../../screens/SearchFriends/useFriendSearch';
import { Body, BodyBold, SubHeader } from '../Text';

const UserSearchResult = ({ users }: { users: iUserSearchResult[] }) => {
  const { userId } = useAuth();
  const navigation = useNavigation();
  return (
    <>
      {users.map((user) => {
        const hasOnlyOneName = !(user.name && user.username);
        const isSignedInUser = user.id === userId;
        const signedInUserIsFollowing = user.signedInUserIsFollowing;
        return (
          <TouchableHighlight
            key={user.id}
            style={{
              flexDirection: 'row',
              padding: 10,
              width: '100%',
            }}
            onPress={() => {
              //   console.error('FriendProfile', user.id);
              navigation.navigate('FriendProfile', { userId: user.id });
            }}
            underlayColor={COLORS.secondaryDark}
          >
            <View
              // TODO: Put actual profile picture here
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: 'blue',
                  }}
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
                <TouchableHighlight
                  onPress={
                    signedInUserIsFollowing
                      ? undefined
                      : () => {
                          // TODO: Follow user
                        }
                  }
                  style={{
                    alignItems: 'center',
                    backgroundColor: signedInUserIsFollowing
                      ? COLORS.disabled
                      : COLORS.secondaryDark,
                    padding: 10,
                    borderRadius: theme.borderRadius,
                  }}
                  underlayColor={COLORS.secondary}
                >
                  <BodyBold>{signedInUserIsFollowing ? 'Following' : 'Follow'}</BodyBold>
                </TouchableHighlight>
              ) : null}
            </View>
          </TouchableHighlight>
        );
      })}
    </>
  );
};

export default UserSearchResult;
