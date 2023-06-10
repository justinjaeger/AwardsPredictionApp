import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCategory } from '../context/CategoryContext';
// import getPersonalHistory from '../services/queryFuncs/getPersonalHistory';
import getPersonalPredictionsByEvent from '../services/queryFuncs/getPersonalPredictionsByEvent';
import getUser from '../services/queryFuncs/getUser';
import { iIndexedPredictionsByCategory, iUser } from '../types';
import { useAsyncEffect } from '../util/hooks';

/**
 * Lets us get the userId and userEmail synchronously
 */

type iProfilePredictionContext = {
  user: iUser | undefined;
  predictionData: iIndexedPredictionsByCategory | undefined;
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
  const { event, date } = useCategory();

  const [userId, setUserId] = useState<string | undefined>(undefined);

  const [user, setUser] = useState<iUser | undefined>(undefined);
  const [contemporaryData, setContemporaryData] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  //   const [historyData, setHistoryData] = useState<
  //     iIndexedPredictionsByCategory | undefined
  //   >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   const today = new Date();
  // we don't want to show history for the current day
  //   const showHistory = date && date.getDay() !== today.getDay();

  // can't use react-query because data must be re-fetched for each userId (it's not a pure component)
  useAsyncEffect(async () => {
    if (event?.id && userId) {
      setIsLoading(true);
      const ps = await getPersonalPredictionsByEvent(event.id, userId);
      setContemporaryData(ps);
      const u = await getUser(userId);
      setUser(u);
      setIsLoading(false);
    }
  }, [event?.id, userId]);

  const resetProfileUser = () => {
    setUser(undefined);
    setContemporaryData(undefined);
    setUserId(undefined);
  };

  //   useEffect(() => {
  //     if (userId && showHistory && event && date) {
  //       getPersonalHistory(event.id, userId, date)
  //         .then((res) => setHistoryData(res))
  //         .finally(() => setIsLoading(false));
  //     }
  //   }, [date, userId, event?.id, showHistory]);

  //   const predictionData = showHistory ? historyData : contemporaryData;

  return (
    <ProfilePredictionContext.Provider
      value={{
        user,
        predictionData: contemporaryData,
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
