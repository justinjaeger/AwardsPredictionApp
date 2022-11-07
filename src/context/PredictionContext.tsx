import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CategoryType } from '../API';
import { getCategorySlots } from '../constants/categories';
import { PredictionsParamList } from '../navigation/types';
import ApiServices from '../services/graphql';
import { useAsyncEffect, useTypedNavigation } from '../util/hooks';
import { useCategory } from './CategoryContext';
import { useAuth } from './UserContext';

export type iNumberPredicting = {
  predictingWin: number;
  predictingNom: number;
  predictingUnranked: number;
};

// represents predictions for ONE predictionSet
export type iPrediction = {
  ranking: number; // PERSONAL ONLY
  communityRankings?: iNumberPredicting; // COMMUNITY ONLY
  contenderId: string;
  contenderMovie:
    | {
        id: string;
        tmdbId: number;
        studio?: string | null | undefined;
      }
    | undefined;
  contenderPerson?:
    | {
        id: string;
        tmdbId: number;
      }
    | undefined;
  contenderSong?:
    | {
        id: string;
        title: string;
        artist: string;
      }
    | undefined;
};

export type iPredictionData = {
  [categoryId: string]: iPrediction[];
};

type iPredictionContext = {
  predictionData: iPredictionData;
  displayContenderInfo: (contenderId: string, personId?: string) => void;
};

const PredictionContext = createContext<iPredictionContext>({
  predictionData: {},
  displayContenderInfo: () => {},
});

export const PredictionProvider = (props: { children: React.ReactNode }) => {
  const { event, category, personalCommunityTab } = useCategory();
  const { userId } = useAuth();
  const navigation = useNavigation();
  const typedNavigation = useTypedNavigation<PredictionsParamList>();

  const [personalPredictionData, setPersonalPredictionData] = useState<iPredictionData>(
    {},
  );
  const [communityPredictionData, setCommunityPredictionData] = useState<iPredictionData>(
    {},
  );
  const [dataToDisplay, setDataToDisplay] = useState<iPredictionData>({});

  // Get all predictions and pass the data down via context
  // make it contextual for personal or community tab

  //   useEffect(() => {
  //     if (!userId && personalCommunityTab === 'personal') {
  //       typedNavigation.navigate('Profile');
  //     }
  //   }, [userId, personalCommunityTab]);

  const eventId = event?.getEvent?.id;
  const eventYear = event?.getEvent?.year;
  const awardsBody = event?.getEvent?.awardsBody;

  const sortPredictions = (ps: iPrediction[]) =>
    ps.sort((p1, p2) => {
      if (!p1 || !p2) return 0;
      if (p1.ranking > p2.ranking) return -1;
      return 1;
    });

  const getPersonalPredictions = async () => {
    if (!userId || !eventId) return;
    const { data: predictionSets } = await ApiServices.getPersonalPredictionsByEvent(
      eventId,
      userId,
    );
    const pSets = predictionSets?.listPredictionSets?.items;
    if (!pSets) return; // handle in some other way?
    // Format the prediction sets
    const data: iPredictionData = {};
    pSets.forEach((ps) => {
      const categoryId = ps?.predictionSetCategoryId || '';
      const predictions = (ps?.predictions?.items || []).map((p) => ({
        ranking: p?.ranking || 0,
        contenderId: p?.contenderPredictionsId || '',
        contenderMovie: p?.contender.movie || undefined,
        contenderPerson: p?.contender.person || undefined,
        contenderSongId: p?.contender.contenderSongId,
      }));
      const sortedPredictions = sortPredictions(predictions);
      data[categoryId] = sortedPredictions;
    });
    return data;
  };

  // TODO: to not overload server with requests every time they load, can call this periodically as LAMBDA function
  const getCommunityPredictions = async () => {
    if (!eventId) return;
    const { data: _contenders } = await ApiServices.getContendersByEvent(eventId);
    const contenders = _contenders?.listContenders?.items;
    if (!contenders) return;
    // Format the contenders
    const data: iPredictionData = {};
    contenders.forEach((con) => {
      if (!con) return;
      const categoryId = con.categoryContendersId || '';
      const categoryName = con.category.name;
      const contenderPredictions = con?.predictions?.items;
      if (!contenderPredictions) return;

      if (!eventYear || !categoryName || !awardsBody) return; // shouldn't happen
      const slots = getCategorySlots(eventYear, awardsBody, categoryName);

      const np: iNumberPredicting = {
        predictingWin: 0,
        predictingNom: 0,
        predictingUnranked: 0,
      };
      contenderPredictions.forEach((cp) => {
        const someUsersRanking = cp?.ranking || 0;
        if (someUsersRanking === 1) {
          np.predictingWin += 1;
        } else if (someUsersRanking <= slots) {
          np.predictingNom += 1;
        } else {
          np.predictingUnranked += 1;
        }
      });
      const communityPrediction: iPrediction = {
        ranking: 0,
        communityRankings: np,
        contenderId: con.id || '', // won't happpen
        contenderMovie: con.movie || undefined, // won't happen
        contenderPerson: con.person || undefined,
        contenderSong: con.song || undefined,
      };
      if (!data[categoryId]) data[categoryId] = [];
      data[categoryId].push(communityPrediction);
    });
    // sort all prediction lists within categories
    const sortedData: iPredictionData = {};
    Object.entries(data).forEach(([catId, ps]) => {
      const sortedPs = sortPredictions(ps);
      sortedData[catId] = sortedPs;
    });
    return sortedData;
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
      const communityPredictions = await getCommunityPredictions();
      if (!communityPredictions) return;
      console.error('communityPredictions', communityPredictions);
      setCommunityPredictionData(communityPredictions);
      setDataToDisplay(communityPredictions);
    }
  }, [personalCommunityTab]); // (FLAG: inefficient to query every time this changes)

  const displayFilm = (contenderId: string) => {
    if (!category?.getCategory) return;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.getCategory?.type,
    });
  };

  const displayPerformance = async (contenderId: string, personId: string) => {
    if (!category?.getCategory) return;
    const { data } = await ApiServices.getPerson(personId);
    if (!data?.getPerson) return;
    const personTmdb = data.getPerson.tmdbId;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.getCategory?.type,
      personTmdb,
    });
  };

  const displayContenderInfo = (contenderId: string, personId?: string) => {
    if (!category?.getCategory) return;
    const cType = CategoryType[category?.getCategory.type];
    if (cType === CategoryType.PERFORMANCE && personId) {
      displayPerformance(contenderId, personId);
    } else {
      displayFilm(contenderId);
    }
  };

  return (
    <PredictionContext.Provider
      value={{
        predictionData: dataToDisplay,
        displayContenderInfo,
      }}
    >
      {props.children}
    </PredictionContext.Provider>
  );
};

export const usePredictions = () => useContext(PredictionContext);
