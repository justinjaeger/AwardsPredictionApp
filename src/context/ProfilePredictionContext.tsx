import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCategory } from '../context/CategoryContext';
import getPersonalHistory from '../services/queryFuncs/getPersonalHistory';
import getPersonalPredictionsByEvent from '../services/queryFuncs/getPersonalPredictionsByEvent';
import getUser from '../services/queryFuncs/getUser';
import { iEvent, iIndexedPredictionsByCategory, iUser } from '../types';

/**
 * Lets us get the userId and userEmail synchronously
 */

type iProfilePredictionContext = {
  user: iUser | undefined;
  predictionData: iIndexedPredictionsByCategory | undefined;
  isLoading: boolean;
  setUserId: (userId: string | undefined) => void;
};

const ProfilePredictionContext = createContext<iProfilePredictionContext>({
  user: undefined,
  predictionData: undefined,
  isLoading: true,
  setUserId: () => {},
});

export const ProfilePredictionProvider = (props: { children: React.ReactNode }) => {
  const { event: _event, date } = useCategory();

  const event = _event as iEvent;

  const [userId, setUserId] = useState<string | undefined>(undefined);

  const [user, setUser] = useState<iUser | undefined>(undefined);
  const [contemporaryData, setContemporaryData] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  const [historyData, setHistoryData] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const today = new Date();
  // we don't want to show history for the current day
  const showHistory = date && date.getDay() !== today.getDay();

  // can't use react-query because data must be re-fetched for each userId (it's not a pure component)
  useEffect(() => {
    getPersonalPredictionsByEvent(event.id, userId)
      .then((res) => setContemporaryData(res))
      .finally(() => setIsLoading(false));

    getUser(userId).then((res) => setUser(res));
  }, [userId]);

  useEffect(() => {
    if (userId && showHistory) {
      getPersonalHistory(event.id, userId, date)
        .then((res) => setHistoryData(res))
        .finally(() => setIsLoading(false));
    }
  }, [date]);

  const predictionData = showHistory ? historyData : contemporaryData;

  return (
    <ProfilePredictionContext.Provider
      value={{
        user,
        predictionData,
        isLoading,
        setUserId,
      }}
    >
      {props.children}
    </ProfilePredictionContext.Provider>
  );
};

export const useProfilePrediction = () => useContext(ProfilePredictionContext);
