import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { BodyBold } from '../../../components/Text';
import useQueryGetUser from '../../../hooks/queries/getUser';
import HistoryTab from '../../../components/HistoryTab';
import { View } from 'react-native';

const EventFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

  const { data } = useQueryGetUser(userId);
  const username = data?.username || 'user';

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
          <BodyBold>{`${username}'s predictions`}</BodyBold>
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
