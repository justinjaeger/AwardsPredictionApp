import React, { useLayoutEffect } from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Event from './index';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { eventToString } from '../../../util/stringConversions';
import { useEvent } from '../../../context/EventContext';
import { getHeaderTitleWithTrophy } from '../../../constants';

const EventPersonalCommunity = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();

  const { event } = useEvent();

  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId || '';

  const { data: personalPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions(userId);
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions();

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  return (
    <>
      <PredictionTabsNavigator
        personal={
          <Event
            tab={'personal'}
            predictionData={personalPredictionData ?? undefined}
            isLoading={isLoadingPersonal}
            userId={userId}
          />
        }
        community={
          <Event
            tab={'community'}
            predictionData={communityPredictionData ?? undefined}
            isLoading={isLoadingCommunity}
            userId={userId}
          />
        }
      />
      {authUserId ? (
        <FollowingBottomScroll
          onPress={(userId) => {
            navigation.dispatch(StackActions.push('EventFromProfile', { userId }));
          }}
        />
      ) : null}
    </>
  );
};

export default EventPersonalCommunity;
