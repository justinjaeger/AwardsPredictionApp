import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';

const EventPersonalCommunity = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

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
      {PredictionTabsNavigator(
        <Event tab={'personal'} {...props} />,
        <Event tab={'community'} {...props} />,
      )}
      {userId ? <FollowingBottomScroll userId={userId} /> : null}
    </>
  );
};

export default EventPersonalCommunity;
