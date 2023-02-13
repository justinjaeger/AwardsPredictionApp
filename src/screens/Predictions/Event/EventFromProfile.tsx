import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryGetUser from '../../../hooks/queries/getUser';
import HistoryTab from '../../../components/HistoryTab';
import { View } from 'react-native';
import UserHeader from '../../../components/UserHeader';

const EventFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

  const { data: user } = useQueryGetUser(userId);

  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    setIsCollapsed,
  } = useCollapsible();

  const props = {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    userId,
  };

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <DisplayFAB
        state={isCollapsed ? 'list-collapsed' : 'list'}
        toggleDisplay={toggle}
      />
      <BackgroundWrapper>
        <>
          {user ? <UserHeader user={user} /> : null}
          <View style={{ zIndex: 2, width: '100%' }}>
            <HistoryTab />
          </View>
          <Event tab={'personal'} {...props} />
        </>
      </BackgroundWrapper>
    </>
  );
};

export default EventFromProfile;
