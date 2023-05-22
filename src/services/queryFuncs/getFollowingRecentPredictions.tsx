/* eslint-disable sonarjs/prefer-immediate-return */
import { PredictionType } from '../../API';
import Serializers from '../../serializers';
import { iCategory, iEvent, iPredictionSet, iUser } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getFollowingRecentPredictions = async (
  userId: string | undefined,
): Promise<iUser[]> => {
  try {
    if (!userId) {
      throw new Error('No userId');
    }
    const { data } = await ApiServices.getRecentFollowingPredictions(userId);
    const followedUsers = data?.relationshipByFollowingUserId?.items || [];
    // get most recent prediction for each user
    const longAgo = new Date(+0).toISOString();
    const recentPredictions: {
      userId: string;
      mostRecentPrediction: string;
    }[] = followedUsers.map((fu) => {
      const userId = fu?.followedUser.id;
      if (!userId) {
        return {
          userId: '',
          mostRecentPrediction: longAgo,
        };
      }
      let mostRecentPrediction = longAgo;
      const predictionSets = fu?.followedUser.predictionSets?.items || [];
      for (const ps of predictionSets) {
        if (ps?.createdAt && ps.createdAt > mostRecentPrediction) {
          mostRecentPrediction = ps.createdAt;
        }
      }
      return {
        userId,
        mostRecentPrediction,
      };
    });
    // get the 10 with most recent
    const sortedRecentPredictions = recentPredictions.sort((u1, u2) => {
      if (u1.mostRecentPrediction > u2.mostRecentPrediction) return -1;
      if (u1.mostRecentPrediction < u2.mostRecentPrediction) return 1;
      return 0;
    });
    // 10 most recent predictions / users
    const limitedSortedPredictions = sortedRecentPredictions.slice(0, 10);
    const includedUserIds = limitedSortedPredictions.map((u) => u.userId);

    const usersWithRecentPredictions = followedUsers.reduce((acc: iUser[], fu) => {
      // filter by users who are included in the 10 most recent
      const u = fu?.followedUser;
      if (!u || !includedUserIds.includes(u.id)) return acc;

      const formattedUser: iUser = Serializers.userSerializer(u);

      const predictionSets = fu?.followedUser.predictionSets?.items || [];
      const formattedPredictionSets = predictionSets.reduce(
        (acc: iPredictionSet[], ps) => {
          const predictions = Serializers.predictionsSerializer(
            ps?.predictions?.items || [],
            ps?.type || PredictionType.NOMINATION,
          );
          // makes sure we're not returning any blank prediction sets for carousel
          if (predictions.length === 0) {
            return acc;
          }
          const event: iEvent = Serializers.eventSerializer(ps?.event);
          const category: iCategory = Serializers.categorySerializer(ps?.category);
          // orders the predictions
          const sortedPredictions = sortPersonalPredictions(predictions);
          acc.push({
            id: ps?.id || '',
            category,
            event,
            createdAt: ps?.createdAt || '',
            predictions: sortedPredictions,
          });
          return acc;
        },
        [],
      );

      formattedUser.predictionSets = formattedPredictionSets;

      acc.push(formattedUser);

      return acc;
    }, []);

    // Sort users by who predicted most recently
    // because usersWithRecentPredictions should correspond with each includedUserId (since we filtered for that), every "find" operation should return not undefined
    const sorted = includedUserIds.map((id) => {
      const user = usersWithRecentPredictions.find((u) => {
        return u.id === id;
      }) as iUser; // !!ts - take note if bug, it might be because of this
      return user;
    });

    return sorted;
  } catch (error) {
    console.log('error in getFollowingRecentPredictions', error);
    return [];
  }
};

export default getFollowingRecentPredictions;
