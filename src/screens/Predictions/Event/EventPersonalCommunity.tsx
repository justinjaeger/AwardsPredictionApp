import React, { useLayoutEffect } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Event from './index';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { eventToString } from '../../../util/stringConversions';
import { getTwoLineHeaderTitle } from '../../../constants';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';

const EventPersonalCommunity = () => {
  const navigation = useNavigation();

  const { event, userId: paramsUserId } = useRouteParams();

  const { userId: authUserId } = useAuth();
  const userId = paramsUserId || authUserId || '';

  const { data: personalPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions(userId);
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions();

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle),
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
          />
        }
        community={
          <Event
            tab={'community'}
            predictionData={communityPredictionData ?? undefined}
            isLoading={isLoadingCommunity}
          />
        }
      />
      <BottomFABContainer />
    </>
  );
};

export default EventPersonalCommunity;
