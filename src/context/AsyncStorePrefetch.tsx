import React, { createContext, useContext } from 'react';
import { PredictionSet, iPrediction, iRecentPrediction } from '../types/api';
import TmdbCache from '../services/cache/tmdb';
import _ from 'lodash';

/**
 * Since AsyncStore is asynchronous, we can cache those responses in a context
 */

const AsyncStorePrefetchContext = createContext<{
  store: Record<string, any>;
  getItemFromStore: (key: string) => any;
  addItemsToStore: (items: Record<string, any>) => void;
  storeTmdbDataFromPredictionSet: (ps: PredictionSet) => Promise<void>;
  storeTmdbDataFromRecentPredictions: (ps: iRecentPrediction[]) => Promise<void>;
}>({
  store: {},
  getItemFromStore: () => Promise.resolve(),
  addItemsToStore: () => {},
  storeTmdbDataFromPredictionSet: () => Promise.resolve(),
  storeTmdbDataFromRecentPredictions: () => Promise.resolve(),
});

// TODO: This is ACTUALLY an asyncStoreCache, but we call the async store the AsyncStorageCache
// Naming is just bad - fix later
/**
 * All GET operations from async store can be used here
 */
export const AsyncStorePrefetchProvider = (props: { children: React.ReactNode }) => {
  const store: Record<string, any> = {};

  const getItemFromStore = (key: string) => {
    return store[key];
  };

  const addItemsToStore = (items: Record<string, any>) => {
    Object.entries(items).forEach(([key, value]) => {
      store[key] = value;
    });
  };

  const storeTmdbDataFromPredictions = async (predictions: iPrediction[]) => {
    const movieIds: string[] = [];
    const personIds: string[] = [];
    const songIds: string[] = [];
    predictions.forEach((p) => {
      p.movieId && movieIds.push(p.movieId);
      p.personId && personIds.push(p.personId);
      p.songId && songIds.push(p.songId);
    });
    const results = await Promise.all([
      TmdbCache.getOrSetMovies(movieIds),
      TmdbCache.getOrSetPersons(personIds),
      TmdbCache.getOrSetSongs(songIds),
    ]);
    // add to async store prefetch
    results.forEach((items) => addItemsToStore(items));
  };

  /**
   * Extracts all movie, person, and song ids from prediction set
   * Sets all movie/person/song data in async storage, then sets it here
   */
  const storeTmdbDataFromPredictionSet = async (predictionSet: PredictionSet) => {
    const predictions = _.values(predictionSet?.categories).flatMap((c) => c.predictions);
    await storeTmdbDataFromPredictions(predictions);
  };

  // same as above but accepts list of recent predictions
  const storeTmdbDataFromRecentPredictions = async (
    recentPredictions: iRecentPrediction[],
  ) => {
    const predictions = recentPredictions.flatMap((c) => c.topPredictions);
    await storeTmdbDataFromPredictions(predictions);
  };

  return (
    <AsyncStorePrefetchContext.Provider
      value={{
        store,
        getItemFromStore,
        addItemsToStore,
        storeTmdbDataFromPredictionSet,
        storeTmdbDataFromRecentPredictions,
      }}
    >
      {props.children}
    </AsyncStorePrefetchContext.Provider>
  );
};

export const useAsyncStorePrefetch = () => useContext(AsyncStorePrefetchContext);
