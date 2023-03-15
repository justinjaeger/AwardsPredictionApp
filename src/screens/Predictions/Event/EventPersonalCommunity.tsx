import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/UserContext';
import { EventDisplayFab } from '../../../components/Buttons/DisplayFAB';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Event from './index';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import { useEventDisplay } from '../../../hooks/animatedState/useDisplay';

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

  const { collapsedOpacity, expandedOpacity, delayedDisplay } = useEventDisplay();

  const props = {
    collapsedOpacity,
    expandedOpacity,
    delayedDisplay,
    userId,
  };

  return (
    <>
      <EventDisplayFab />
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
      {authUserId ? (
        <FollowingBottomScroll
          userId={authUserId}
          onPress={(id) => {
            navigation.dispatch(StackActions.push('EventFromProfile', { userId: id }));
          }}
        />
      ) : null}
    </>
  );
};

export default EventPersonalCommunity;
