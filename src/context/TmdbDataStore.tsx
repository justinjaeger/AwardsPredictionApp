import React, { createContext, useContext, useState } from 'react';
import {
  CategoryType,
  Contender,
  Movie,
  Person,
  PredictionSet,
  Song,
  WithId,
  iPrediction,
  iRecentPrediction,
} from '../types/api';
import TmdbCache from '../services/cache/tmdb';
import _ from 'lodash';
import { filterDuplicates } from '../util/filterDuplicates';

/**
 * Since AsyncStore is asynchronous, we can cache those responses in a context
 */

const TmdbDataStoreContext = createContext<{
  store: Record<string, any>;
  itemsKeyedByTmdbId: Record<number, any>;
  storeTmdbDataFromPredictionSet: (ps: PredictionSet) => Promise<void>;
  storeTmdbDataFromRecentPredictions: (ps: iRecentPrediction[]) => Promise<void>;
  storeTmdbDataFromContender: (c: WithId<Contender>) => Promise<void>;
  getTmdbDataFromPrediction: (prediction: iPrediction) =>
    | {
        movie: WithId<Movie>;
        person: WithId<Person> | undefined;
        song: WithId<Song> | undefined;
      }
    | undefined;
  getSongByTitleAndMovieTmdbId: (
    title: string,
    movieTmdbId: number,
  ) => WithId<Song> | undefined;
}>({
  store: {},
  itemsKeyedByTmdbId: {},
  storeTmdbDataFromPredictionSet: () => Promise.resolve(),
  storeTmdbDataFromRecentPredictions: () => Promise.resolve(),
  storeTmdbDataFromContender: () => Promise.resolve(),
  getTmdbDataFromPrediction: () => undefined,
  getSongByTitleAndMovieTmdbId: () => undefined,
});

/**
 * All GET operations from async store can be used here
 */
export const TmdbDataStoreProvider = (props: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Record<string, any>>({});

  // This won't work for songs. We need to key the songs by movieId+title
  const itemsKeyedByTmdbId = _.values(store).reduce((acc: Record<number, any>, item) => {
    if (item.tmdbId) {
      acc[item.tmdbId] = item;
    }
    return acc;
  }, {});

  const itemsKeyedBySongTitleAndMovieId = _.values(store).reduce(
    (acc: Record<string, WithId<Song>>, item) => {
      // only Songs have field movieId
      if (item.movieId && item.title) {
        acc[item.title] = item + item.movieId;
      }
      return acc;
    },
    {},
  );

  const getTmdbDataFromPrediction = (prediction: iPrediction) => {
    const { movieId, personId, songId } = prediction;
    const movie = store[movieId] as WithId<Movie>;
    const person = personId ? (store[personId] as WithId<Person>) : undefined;
    const song = songId ? (store[songId] as WithId<Song>) : undefined;
    return { movie, person, song };
  };

  const getSongByTitleAndMovieTmdbId = (title: string, movieTmdbId: number) => {
    const movie = itemsKeyedByTmdbId[movieTmdbId] as WithId<Movie>;
    const key = title + movie._id;
    return itemsKeyedBySongTitleAndMovieId[key] as WithId<Song> | undefined;
  };

  const addItemsToStore = (items: Record<string, any>) => {
    setStore((s) => ({ ...s, ...items }));
  };

  // Finds what isn't already in the cache and fetches it from async storage, OR from the API
  // All other funcs should invoke this at the end
  const storeTmdbData = async (
    movieIds: string[],
    personIds: string[],
    songIds: string[],
  ) => {
    const nonDupMovieIds = filterDuplicates(movieIds);
    const nonDupPersonIds = filterDuplicates(personIds);
    const nonDupSongIds = filterDuplicates(songIds);

    // if it's already in the store, don't fetch from async storage
    const movieIdsNotInStore = nonDupMovieIds.filter((id) => !store[id]);
    const personIdsNotInStore = nonDupPersonIds.filter((id) => !store[id]);
    const songIdsNotInStore = nonDupSongIds.filter((id) => !store[id]);

    // TODO: remove performance monitoring
    const startTime = performance.now();
    const results = await Promise.all([
      TmdbCache.setItemsInCache(movieIdsNotInStore, CategoryType.FILM),
      TmdbCache.setItemsInCache(personIdsNotInStore, CategoryType.PERFORMANCE),
      TmdbCache.setItemsInCache(songIdsNotInStore, CategoryType.SONG),
    ]);
    const endTime = performance.now();
    console.log('setItemsInCache.all took ' + (endTime - startTime) + ' milliseconds.');

    const allItems = results.reduce((acc, r) => ({ ...acc, ...r }), {});
    addItemsToStore(allItems);
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
    await storeTmdbData(movieIds, personIds, songIds);
  };

  const storeTmdbDataFromPredictionSet = async (predictionSet: PredictionSet) => {
    const predictions = _.values(predictionSet?.categories ?? []).flatMap(
      (c) => c.predictions,
    );
    await storeTmdbDataFromPredictions(predictions);
  };

  // same as above but accepts list of recent predictions
  const storeTmdbDataFromRecentPredictions = async (
    recentPredictions: iRecentPrediction[],
  ) => {
    const predictions = recentPredictions.flatMap((c) => c.topPredictions);
    await storeTmdbDataFromPredictions(predictions);
  };

  const storeTmdbDataFromContender = async ({
    movieId,
    personId,
    songId,
  }: WithId<Contender>) => {
    const movieIds = [movieId];
    const personIds = personId ? [personId] : [];
    const songIds = songId ? [songId] : [];
    await storeTmdbData(movieIds, personIds, songIds);
  };

  return (
    <TmdbDataStoreContext.Provider
      value={{
        store,
        itemsKeyedByTmdbId,
        storeTmdbDataFromPredictionSet,
        storeTmdbDataFromRecentPredictions,
        storeTmdbDataFromContender,
        getTmdbDataFromPrediction,
        getSongByTitleAndMovieTmdbId,
      }}
    >
      {props.children}
    </TmdbDataStoreContext.Provider>
  );
};

export const useTmdbDataStore = () => useContext(TmdbDataStoreContext);
