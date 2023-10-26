import { StackActions } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { PredictionsParamList } from '../../navigation/types';
import { useTypedNavigation } from '../../util/hooks';
import CustomIcon from '../CustomIcon';
import ProfileImage from '../ProfileImage';
import { SubHeader } from '../Text';

const UserHeader = ({
  userId,
  userName,
  userImage,
  showEventLink,
  isLoading,
}: {
  userId: string;
  userName?: string;
  userImage?: string;
  showEventLink?: boolean;
  isLoading?: boolean;
}) => {
  const navigation = useTypedNavigation<PredictionsParamList>();

  const name = userName || 'user';

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <ProfileImage
        imageSize={50}
        image={userImage}
        onPress={() => {
          navigation.dispatch(StackActions.push('Profile', { userId }));
        }}
        isLoading={isLoading}
        style={{ marginLeft: 10, marginRight: 15 }}
      />
      {showEventLink ? (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('EventFromProfile', {
                userId,
                userName: name,
                userImage: userImage,
              }),
            );
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <>
            <SubHeader>See Event Predictions</SubHeader>
            <CustomIcon name={'chevron-right'} />
          </>
        </TouchableOpacity>
      ) : (
        <SubHeader>{`${name}'s predictions`}</SubHeader>
      )}
    </View>
  );
};

export default UserHeader;
