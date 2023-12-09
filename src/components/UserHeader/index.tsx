import { StackActions } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { PredictionsParamList } from '../../navigation/types';
import { useTypedNavigation } from '../../util/hooks';
import CustomIcon from '../CustomIcon';
import { SubHeader } from '../Text';
import { useRouteParams } from '../../hooks/useRouteParams';

// Was used to display user info above categories
const UserHeader = () => {
  const { userId, event } = useRouteParams();
  const navigation = useTypedNavigation<PredictionsParamList>();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            StackActions.replace('EventFromProfile', {
              userId,
              eventId: event!._id,
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
    </View>
  );
};

export default UserHeader;
