/* eslint-disable sonarjs/prefer-immediate-return */
import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderVisibility,
  EventStatus,
  PredictionType,
} from '../../API';
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

      const formattedUser: iUser = {
        id: u.id,
        email: u.email,
        username: u.username || undefined,
        name: u.name || undefined,
        bio: u.bio || undefined,
        image: u.image || undefined,
        role: u.role,
      };

      const predictionSets = fu?.followedUser.predictionSets?.items || [];
      const formattedPredictionSets: iPredictionSet[] = predictionSets.map((ps) => {
        const predictions = (ps?.predictions?.items || []).map((p) => ({
          id: p?.id,
          ranking: p?.ranking || 0,
          accolade: p?.contender.accolade || undefined,
          visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
          predictionType: ps?.type || PredictionType.NOMINATION,
          contenderId: p?.contender.id || '',
          // @ts-ignore - the typescript isn't this nested
          contenderMovie: p?.contender.movie || undefined,
          // @ts-ignore - the typescript isn't this nested
          contenderPerson: p?.contender.person || undefined,
          // @ts-ignore - the typescript isn't this nested
          contenderSong: p?.contender.song || undefined,
          lastUpdated: p?.updatedAt || '',
        }));
        const event: iEvent = {
          id: ps?.event.id || '',
          awardsBody: ps?.event.awardsBody || AwardsBody.ACADEMY_AWARDS,
          year: ps?.event.year || 0,
          status: ps?.event.status || EventStatus.ARCHIVED,
          categories: {},
          nominationDateTime: ps?.event.nominationDateTime || undefined,
          winDateTime: ps?.event.winDateTime || undefined,
          createdAt: ps?.createdAt || '',
          liveAt: ps?.event.liveAt || undefined,
        };
        const category: iCategory = {
          id: ps?.category?.id || '',
          name: ps?.category?.name || CategoryName.PICTURE, // fake values
          type: ps?.category?.type || CategoryType.FILM, // fake values
          isShortlisted: ps?.category?.isShortlisted || CategoryIsShortlisted.FALSE, // fake values
        };
        // orders the predictions
        const sortedPredictions = sortPersonalPredictions(predictions);
        return {
          id: ps?.id || '',
          category,
          event,
          createdAt: ps?.createdAt || '',
          predictions: sortedPredictions,
        };
      });

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
