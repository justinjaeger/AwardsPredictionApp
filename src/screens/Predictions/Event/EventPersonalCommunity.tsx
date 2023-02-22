import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Event from './index';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import usePredictionData from '../../../hooks/queries/usePredictionData';

const EventPersonalCommunity = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();

  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

  const {
    predictionData: personalPredictionData,
    isLoading: isLoadingPersonal,
  } = usePredictionData('personal', userId);
  const {
    predictionData: communityPredictionData,
    isLoading: isLoadingCommunity,
  } = usePredictionData('community', userId);

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
        <Event
          tab={'personal'}
          predictionData={personalPredictionData}
          isLoading={isLoadingPersonal}
          {...props}
        />,
        <Event
          tab={'community'}
          predictionData={communityPredictionData}
          isLoading={isLoadingCommunity}
          {...props}
        />,
      )}
      {userId ? (
        <FollowingBottomScroll
          userId={userId}
          onPress={(id) => {
            navigation.dispatch(StackActions.push('EventFromProflie', { userId: id }));
          }}
        />
      ) : null}
    </>
  );
};

export default EventPersonalCommunity;
