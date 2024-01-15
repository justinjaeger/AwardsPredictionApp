import React, { useLayoutEffect } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CategoryList from './CategoryList';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { eventToString } from '../../../util/stringConversions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getTwoLineHeaderTitle } from '../../../constants';
import { PHASE_TO_STRING } from '../../../constants/categories';

const Event = () => {
  const navigation = useNavigation<PredictionsNavigationProp>();

  const { event, userInfo, yyyymmdd, phase, isLeaderboard } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const isAuthUser = userInfo?.userId === authUserId;

  const userId = userInfo?.userId || authUserId || '';

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions({ userId, yyyymmdd });
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions({ yyyymmdd });

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    // need to add "shortlist leaderboard"
    const leaderboardTitle = isLeaderboard
      ? `\n${PHASE_TO_STRING[phase]} LB Results`
      : '';
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle + leaderboardTitle),
    });
  }, [navigation]);

  return (
    <>
      <PredictionTabsNavigator
        personalText={
          isAuthUser ? 'My Predictions' : userInfo?.userName?.split(' ')?.[0] ?? ''
        }
        personalImage={isAuthUser ? undefined : userInfo?.userImage}
        personal={
          <CategoryList
            tab={'personal'}
            predictionData={userPredictionData ?? undefined}
            isLoading={isLoadingPersonal}
          />
        }
        community={
          <CategoryList
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

export default Event;
