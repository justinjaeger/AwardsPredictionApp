import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Category, Contender, Prediction, PredictionSet } from '../../models';

// get prediction set. enforce uniqueness of user/category
// NOTE: for now, I'm going with the approach that we're doing a "snapshot" of predictions every 24 hours just like the global predictions
export const getPredictions = async (
  userId: string,
  category: Category,
): Promise<iApiResponse<Prediction[]>> => {
  try {
    const maybePredictionSets = (
      await DataStore.query(PredictionSet, (ps) => ps.categoryId('eq', category.id))
    ).filter((ps) => ps.userId === userId);
    const predictionSet =
      maybePredictionSets.length > 0 ? maybePredictionSets[0] : undefined;
    if (!predictionSet) {
      return { status: 'success', data: [] };
    }
    const predictions = await DataStore.query(Prediction, (p) =>
      p.predictionSetId('eq', predictionSet.id),
    );
    // return in order
    const sorted = predictions.sort((a, b) => (a.ranking > b.ranking ? 1 : -1));
    return { status: 'success', data: sorted };
  } catch (err) {
    return handleError('error retrieving predictions', err);
  }
};

export type iPredictionData = {
  contender: Contender;
  ranking: number;
}[];

export const createOrUpdatePredictions = async (
  userId: string,
  category: Category,
  predictionData: iPredictionData,
): Promise<iApiResponse<Prediction[]>> => {
  try {
    // delete prediction sets associated with user AND category (NOTE: Should make this atomic)
    // enforces ONE predictionSet per user+category

    // get prediction set
    const pSets = (
      await DataStore.query(PredictionSet, (ps) => ps.userId('eq', userId))
    ).filter((ps) => ps.categoryId === category.id); // should only be one

    // delete existing prediction sets AND predictions
    if (pSets.length > 0) {
      pSets.forEach(async (ps) => {
        const deletedPredictionSet = await DataStore.delete(PredictionSet, ps.id); // should only be one
        deletedPredictionSet.forEach(async (dps) => {
          await DataStore.delete(Prediction, (ps) => ps.predictionSetId('eq', dps.id));
        });
      });
    }

    // create new prediction set
    const predictionSet = await DataStore.save(
      new PredictionSet({
        userId,
        categoryId: category.id,
        eventId: category.event.id,
        predictions: [],
      }),
    );

    // create predictions
    const predictions = await Promise.all(
      predictionData.map(async (p) => {
        return await DataStore.save(
          new Prediction({
            userId,
            contender: p.contender,
            ranking: p.ranking,
            predictionSetId: predictionSet.id,
          }),
        );
      }),
    );

    // return in order
    const sorted = predictions.sort((a, b) => (a.ranking > b.ranking ? 1 : -1));

    return { status: 'success', data: sorted };
  } catch (err) {
    return handleError('error creating or updating predictions', err);
  }
};
