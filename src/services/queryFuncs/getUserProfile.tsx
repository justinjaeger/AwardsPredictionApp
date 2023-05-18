/* eslint-disable sonarjs/prefer-immediate-return */
import { PredictionType } from '../../API';
import Serializers from '../../serializers';
import { iEvent, iPredictionSet, iUser } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getUserProfile = async (
  id: string | undefined,
  authUserId: string | undefined,
): Promise<iUser | undefined> => {
  if (id === undefined) return undefined;
  const { data } = await ApiServices.getUserProfile(id, authUserId);
  const user = data?.getUser;
  if (!user) return undefined;
  const predictionSets: iPredictionSet[] =
    user?.predictionSets?.items.reduce((acc: iPredictionSet[], ps) => {
      const predictions = Serializers.predictionsSerializer(
        ps?.predictions?.items || [],
        ps?.type || PredictionType.NOMINATION,
      );
      // makes sure we're not returning any blank prediction sets for carousel
      if (predictions.length === 0) {
        return acc;
      }
      const event: iEvent = Serializers.eventSerializer(ps?.event || {}, ps?.createdAt);
      // orders the predictions
      const sortedPredictions = sortPersonalPredictions(predictions);
      acc.push({
        id: ps?.id || '',
        category: Serializers.categorySerializer(ps?.category || {}),
        event,
        createdAt: ps?.createdAt || '',
        predictions: sortedPredictions,
      });
      return acc;
    }, []) || [];
  // format events data
  const serializedUser = Serializers.userSerializer(user);
  const userProfile = {
    ...serializedUser,
    predictionSets,
    authUserIsFollowing: (user?.followers?.items || []).length > 0,
    isFollowingAuthUser: (user?.following?.items || []).length > 0,
  };
  return userProfile;
};

export default getUserProfile;
