import _ from 'lodash';
import React, { createContext, useContext, useState } from 'react';
import ApiServices from '../services/graphql';
import { useAuth } from '../store';
import { useAsyncEffect } from '../util/hooks';
import { useCategory } from './CategoryContext';

// represents predictions for ONE predictionSet
type iPrediction = {
  ranking: number;
  contenderId: string;
  contenderMovieId: string;
  contenderPersonId?: string | null;
  contenderSongId?: string | null;
};
type iPredictionData = {
  [categoryId: string]: iPrediction[];
};

type iPredictionContext = {
  predictionData: iPredictionData;
};

const PredictionContext = createContext<iPredictionContext>({
  predictionData: {},
});

export const PredictionProvider = (props: { children: React.ReactNode }) => {
  const { event, personalCommunityTab } = useCategory();
  const { userId } = useAuth();

  const [personalPredictionData, setPersonalPredictionData] = useState<iPredictionData>(
    {},
  );
  const [communityPredictionData, setCommunityPredictionData] = useState<iPredictionData>(
    {},
  );
  const [dataToDisplay, setDataToDisplay] = useState<iPredictionData>({});

  // Get all predictions and pass the data down via context
  // make it contextual for personal or community tab

  const eventId = event?.getEvent?.id;

  const getPersonalPredictions = async () => {
    if (!userId || !eventId) return;
    const { data: predictionSets } = await ApiServices.getPersonalPredictionsByEvent(
      eventId,
      userId,
    );
    const pSets = predictionSets?.listPredictionSets?.items;
    if (!pSets) return; // handle in some other way?
    // Format the sets
    // NO IDEA if it's going to let me nest this deeply (5 layers)
    const data: iPredictionData = {};
    pSets.forEach((ps) => {
      const categoryId = ps?.predictionSetCategoryId || '';
      const predictions = (ps?.predictions?.items || []).map((p) => ({
        ranking: p?.ranking || 0,
        contenderId: p?.contenderPredictionsId || '',
        contenderMovieId: p?.contenderPredictionsId || '',
        contenderPersonId: p?.contenderPredictionsId,
        contenderSongId: p?.contenderPredictionsId,
      }));
      data[categoryId] = predictions;
    });
    return data;
  };

  useAsyncEffect(async () => {
    // Display RECENT data
    if (personalCommunityTab === 'personal') {
      setDataToDisplay(personalPredictionData);
    } else if (personalCommunityTab === 'community') {
      setDataToDisplay(communityPredictionData);
    }

    // for personal predictions...
    if (personalCommunityTab === 'personal') {
      const personalPredictions = await getPersonalPredictions();
      if (!personalPredictions) return;
      setPersonalPredictionData(personalPredictions);
      setDataToDisplay(personalPredictions);
    }

    if (personalCommunityTab === 'community') {
      // TODO:
      setCommunityPredictionData({});
      setDataToDisplay({});
    }
  }, [personalCommunityTab]); // (FLAG: inefficient to query every time this changes)

  return (
    <PredictionContext.Provider
      value={{
        predictionData: dataToDisplay,
      }}
    >
      {props.children}
    </PredictionContext.Provider>
  );
};

export const usePredictions = () => useContext(PredictionContext);
