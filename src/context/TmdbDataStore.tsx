import React, { createContext, useContext, useState } from 'react';
import {
  Contender,
  Movie,
  Person,
  PredictionSet,
  Song,
  WithId,
  iPrediction,
  iRecentPrediction,
} from '../models';
import TmdbCache from '../services/cache/tmdb';
import _ from 'lodash';
import { filterDuplicates } from '../util/filterDuplicates';
import { iSearchData } from '../services/tmdb';

/**
 * Since AsyncStore is asynchronous, we can cache those responses in a context
 */

export type iTmdbDataStoreRecords = Record<string, Movie | Person | Song>;

const TmdbDataStoreContext = createContext<{
  store: iTmdbDataStoreRecords;
  storeTmdbDataFromPredictionSet: (ps: PredictionSet, eventYear: number) => Promise<void>;
  storeTmdbDataFromRecentPredictions: (ps: iRecentPrediction[]) => Promise<void>;
  storeTmdbDataFromContender: (c: WithId<Contender>, eventYear: number) => Promise<void>;
  getTmdbDataFromPrediction: (prediction: iPrediction) =>
    | {
        movie: Movie;
        person: Person | undefined;
        song: Song | undefined;
      }
    | undefined;
  getTmdbDataFromItem: (item: iSearchData) => Movie | Person | Song | undefined;
}>({
  store: {},
  storeTmdbDataFromPredictionSet: () => Promise.resolve(),
  storeTmdbDataFromRecentPredictions: () => Promise.resolve(),
  storeTmdbDataFromContender: () => Promise.resolve(),
  getTmdbDataFromPrediction: () => undefined,
  getTmdbDataFromItem: () => undefined,
});

/**
 * All GET operations from async store can be used here
 */
export const TmdbDataStoreProvider = (props: { children: React.ReactNode }) => {
  const [store, setStore] = useState<iTmdbDataStoreRecords>({});

  const getTmdbDataFromPrediction = (prediction: iPrediction) => {
    const { movieTmdbId, personTmdbId, songId } = prediction;
    const movie = store[movieTmdbId] as Movie;
    const person = personTmdbId ? (store[personTmdbId] as Person) : undefined;
    const song = songId ? (store[songId] as Song) : undefined;
    return { movie, person, song };
  };

  const getTmdbDataFromItem = (item: iSearchData): Movie | Person | Song | undefined => {
    return store[item.tmdbId.toString()];
  };

  const addItemsToStore = (items: iTmdbDataStoreRecords) => {
    setStore((s) => ({ ...s, ...items }));
  };

  // Finds what isn't already in the cache and fetches it from async storage, OR from the API
  // All other funcs should invoke this at the end
  const storeTmdbData = async (ids: string[], eventYear: number) => {
    const nonDupIds = filterDuplicates(ids);
    // if it's already in the store, don't fetch from async storage
    const idsNotInStore = nonDupIds.filter((id) => !store[id]);
    if (idsNotInStore.length > 0) {
      const storedItems = await TmdbCache.setItemsInAsyncStorage(
        idsNotInStore,
        eventYear,
      );
      addItemsToStore(storedItems);
    }
  };

  const storeTmdbDataFromPredictions = async (
    predictions: iPrediction[],
    eventYear: number,
  ) => {
    const allIds: string[] = [];
    predictions.forEach((p) => {
      p.movieTmdbId && allIds.push(p.movieTmdbId.toString());
      p.personTmdbId && allIds.push(p.personTmdbId.toString());
      p.songId && allIds.push(p.songId);
    });
    await storeTmdbData(allIds, eventYear);
  };

  const storeTmdbDataFromPredictionSet = async (
    predictionSet: PredictionSet,
    eventYear: number,
  ) => {
    const predictions = _.values(predictionSet?.categories ?? []).flatMap(
      (c) => c.predictions,
    );
    await storeTmdbDataFromPredictions(predictions, eventYear);
  };

  // same as above but accepts list of recent predictions
  const storeTmdbDataFromRecentPredictions = async (
    recentPredictions: iRecentPrediction[],
  ) => {
    const eventYearToRecentPredictions = _.groupBy(recentPredictions, (p) => p.year);
    const promises = Object.entries(eventYearToRecentPredictions).map(
      ([year, recent]) => {
        const eventYear = parseInt(year, 10);
        const predictions = recent.flatMap((c) => c.topPredictions);
        return storeTmdbDataFromPredictions(predictions, eventYear);
      },
    );
    await Promise.all(promises);
  };

  const storeTmdbDataFromContender = async (
    { movieTmdbId, personTmdbId, songId }: WithId<Contender>,
    eventYear: number,
  ) => {
    const movieIds = [movieTmdbId.toString()];
    const personIds = personTmdbId ? [personTmdbId.toString()] : [];
    const songIds = songId ? [songId] : [];
    await storeTmdbData([...movieIds, ...personIds, ...songIds], eventYear);
  };

  return (
    <TmdbDataStoreContext.Provider
      value={{
        store,
        storeTmdbDataFromPredictionSet,
        storeTmdbDataFromRecentPredictions,
        storeTmdbDataFromContender,
        getTmdbDataFromPrediction,
        getTmdbDataFromItem,
      }}
    >
      {props.children}
    </TmdbDataStoreContext.Provider>
  );
};

export const useTmdbDataStore = () => useContext(TmdbDataStoreContext);
