import { useNavigation } from '@react-navigation/native';
import { Spinner } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Alert, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import useMutationUpdateRelationship from '../../hooks/mutations/useMutationUpdateRelationship';
import { BodyBold } from '../Text';
import { MainScreenNavigationProp } from '../../navigation/types';

const FollowButton = ({
  authUserIsFollowing,
  profileUserId,
  style,
  textWhenNotFollowing,
}: {
  authUserIsFollowing: boolean;
  profileUserId: string;
  style?: StyleProp<ViewStyle>;
  textWhenNotFollowing?: string;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useNavigation<MainScreenNavigationProp>();

  const { mutate: updateRelationship, isComplete } = useMutationUpdateRelationship();

  // just to display the updated value
  const [isFollowing, setIsFollowing] = useState(authUserIsFollowing);
  useEffect(() => setIsFollowing(authUserIsFollowing), [authUserIsFollowing]);

  const isAuthProfile = profileUserId === authUserId;
  if (isAuthProfile) return null;

  return (
    <TouchableHighlight
      style={[
        {
          alignItems: 'center',
          backgroundColor: isFollowing ? COLORS.disabled : COLORS.secondaryDark,
          padding: 10,
          borderRadius: theme.borderRadius,
          height: 35,
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={async () => {
        if (!authUserId) {
          navigation.navigate('AuthenticatorNavigator');
        } else if (isFollowing) {
          // warn before they unfollow?
          Alert.alert('Unfollow user?', '', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                await updateRelationship({
                  action: 'unfollow',
                  profileUserId,
                });
                setIsFollowing(false);
              },
            },
          ]);
        } else {
          if (!authUserId) return;
          await updateRelationship({ action: 'follow', profileUserId });
          setIsFollowing(true);
        }
      }}
      underlayColor={COLORS.secondary}
    >
      {isComplete ? (
        <BodyBold>
          {isFollowing ? 'Following' : textWhenNotFollowing || 'Follow'}
        </BodyBold>
      ) : (
        <Spinner size="medium" style={{ borderColor: COLORS.white }} />
      )}
    </TouchableHighlight>
  );
};

export default FollowButton;
