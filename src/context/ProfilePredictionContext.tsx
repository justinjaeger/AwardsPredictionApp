import React, { createContext, useContext, useState } from 'react';
import { useCategory } from '../context/CategoryContext';
import { useAsyncEffect } from '../util/hooks';
import MongoApi from '../services/api/requests';
import { PredictionSet, User, WithId } from '../types/api';
import { useAsyncStorePrefetch } from './AsyncStorePrefetch';

/**
 * Lets us get the userId and userEmail synchronously
 */

type iProfilePredictionContext = {
  user: WithId<User> | undefined;
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
  setUserId: (userId: string | undefined) => void;
  resetProfileUser: () => void;
};

const ProfilePredictionContext = createContext<iProfilePredictionContext>({
  user: undefined,
  predictionData: undefined,
  isLoading: true,
  setUserId: () => {},
  resetProfileUser: () => {},
});

export const ProfilePredictionProvider = (props: { children: React.ReactNode }) => {
  const { event } = useCategory();
  const { storeTmdbDataFromPredictionSet } = useAsyncStorePrefetch();

  const [userId, setUserId] = useState<string | undefined>(undefined);

  const [user, setUser] = useState<WithId<User> | undefined>(undefined);
  const [predictionData, setPredictionData] = useState<WithId<PredictionSet> | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // can't use react-query because data must be re-fetched for each userId (it's not a pure component)
  useAsyncEffect(async () => {
    if (event?._id && userId) {
      setIsLoading(true);
      const { data: ps } = await MongoApi.getPredictionSet({
        eventId: event._id,
        userId,
      });
      setPredictionData(ps);
      const { data: u } = await MongoApi.getUser({ userId, excludeNestedFields: true });
      setUser(u);
      // cache all movies (await it so it doesn't load with bad data)
      if (ps) {
        await storeTmdbDataFromPredictionSet(ps);
      }
      setIsLoading(false);
    }
  }, [event?._id, userId]);

  const resetProfileUser = () => {
    setUser(undefined);
    setPredictionData(undefined);
    setUserId(undefined);
  };

  return (
    <ProfilePredictionContext.Provider
      value={{
        user,
        predictionData,
        isLoading,
        setUserId,
        resetProfileUser,
      }}
    >
      {props.children}
    </ProfilePredictionContext.Provider>
  );
};

export const useProfilePrediction = () => useContext(ProfilePredictionContext);
