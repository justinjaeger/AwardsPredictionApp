import React, { useLayoutEffect } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CategoryList from './CategoryList';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PredictionsNavigationProp } from '../../../navigation/types';

const EventPersonalCommunity = () => {
  const navigation = useNavigation<PredictionsNavigationProp>();

  const { event, userInfo } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const isAuthUser = userInfo?.userId === authUserId;

  const userId = userInfo?.userId || authUserId || '';

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
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
        personalText={isAuthUser ? 'My Predictions' : userInfo?.userName}
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

export default EventPersonalCommunity;
