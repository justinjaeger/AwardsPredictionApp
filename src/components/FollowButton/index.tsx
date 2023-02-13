import { Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/UserContext';
import useUpdateRelationship from '../../hooks/mutations/updateRelationship';
import { BodyBold } from '../Text';

const FollowButton = ({
  authUserIsFollowing,
  profileUserId,
  style,
}: {
  authUserIsFollowing: boolean;
  profileUserId: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const { userId: authUserId } = useAuth();

  const { mutate: updateRelationship, isComplete } = useUpdateRelationship();

  // just to display the updated value
  const [isFollowing, setIsFollowing] = useState(authUserIsFollowing);

  return (
    <TouchableHighlight
      style={[
        {
          alignItems: 'center',
          backgroundColor: isFollowing ? COLORS.disabled : COLORS.secondaryDark,
          padding: 10,
          borderRadius: theme.borderRadius,
        },
        style,
      ]}
      onPress={async () => {
        if (!profileUserId || !authUserId) return {};
        if (isFollowing) {
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
                  authUserId,
                });
                setIsFollowing(false);
              },
            },
          ]);
        } else {
          await updateRelationship({ action: 'follow', profileUserId, authUserId });
          setIsFollowing(true);
        }
      }}
      underlayColor={COLORS.secondary}
    >
      {isComplete ? (
        <BodyBold>{isFollowing ? 'Following' : 'Follow'}</BodyBold>
      ) : (
        <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
      )}
    </TouchableHighlight>
  );
};

export default FollowButton;