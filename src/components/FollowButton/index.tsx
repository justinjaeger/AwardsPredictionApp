import { Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, TouchableHighlight } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/UserContext';
import useUpdateRelationship from '../../hooks/mutations/updateRelationship';
import { BodyBold } from '../Text';

const FollowButton = ({
  authUserIsFollowing,
  profileUserId,
}: {
  authUserIsFollowing: boolean;
  profileUserId: string;
}) => {
  const { userId: authUserId } = useAuth();

  const { mutate: updateRelationship, isComplete } = useUpdateRelationship();

  // just to display the updated value
  const [isFollowing, setIsFollowing] = useState(authUserIsFollowing);

  return (
    <TouchableHighlight
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
      style={{
        alignItems: 'center',
        backgroundColor: isFollowing ? COLORS.disabled : COLORS.secondaryDark,
        padding: 10,
        borderRadius: theme.borderRadius,
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
