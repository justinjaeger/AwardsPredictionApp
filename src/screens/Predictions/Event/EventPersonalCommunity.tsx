import React from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import { EventDisplayFab } from '../../../components/Buttons/DisplayFAB';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Event from './index';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import { useEventDisplay } from '../../../hooks/animatedState/useDisplay';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';

const EventPersonalCommunity = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();

  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId || '';

  const { data: personalPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions(userId);
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions();

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
          onPress={(id) => {
            navigation.dispatch(StackActions.push('EventFromProfile', { userId: id }));
          }}
        />
      ) : null}
    </>
  );
};

export default EventPersonalCommunity;
