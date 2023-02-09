import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/UserContext';
import { iUserSearchResult } from '../../screens/SearchFriends/useFriendSearch';
import ApiServices from '../../services/graphql';
import ProfileImage from '../ProfileImage';
import { Body, BodyBold, SubHeader } from '../Text';

const UserSearchResult = ({ users }: { users: iUserSearchResult[] }) => {
  const { userId: authUserId } = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = (userId: string) => {
    navigation.navigate('FriendProfile', { userId });
  };

  return (
    <>
      {users.map((user) => {
        const hasOnlyOneName = !(user.name && user.username);
        const isSignedInUser = user.id === authUserId;
        const signedInUserIsFollowing = user.signedInUserIsFollowing;
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
                <TouchableHighlight
                  onPress={
                    signedInUserIsFollowing
                      ? undefined
                      : async () => {
                          if (!authUserId) return;
                          const res = await ApiServices.followUser(user.id, authUserId);
                          console.log('res', res);
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
