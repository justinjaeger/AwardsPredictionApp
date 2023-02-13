import { StackActions } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { PredictionsParamList } from '../../navigation/types';
import { iUser } from '../../types';
import { useTypedNavigation } from '../../util/hooks';
import ProfileImage from '../ProfileImage';
import { BodyBold, SubHeader, SubHeaderLight } from '../Text';

const UserHeader = ({ user }: { user: iUser }) => {
  const navigation = useTypedNavigation<PredictionsParamList>();

  const name = user?.name || user?.username || 'user';

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
        image={user?.image}
        onPress={() => {
          navigation.dispatch(StackActions.push('Profile', { userId: user.id }));
        }}
        style={{ marginLeft: 10, marginRight: 15 }}
      />
      <SubHeaderLight>{`${name}'s predictions`}</SubHeaderLight>
    </View>
  );
};

export default UserHeader;
