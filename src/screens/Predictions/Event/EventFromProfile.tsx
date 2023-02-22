import React, { useEffect, useState } from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import HistoryTab from '../../../components/HistoryTab';
import { View } from 'react-native';
import UserHeader from '../../../components/UserHeader';
import { iEvent, iIndexedPredictionsByCategory, iUser } from '../../../types';
import getPersonalPredictionsByEvent from '../../../services/queryFuncs/getPersonalPredictionsByEvent';
import { useCategory } from '../../../context/CategoryContext';
import getUser from '../../../services/queryFuncs/getUser';

const EventFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();

  const { event: _event } = useCategory();
  const { userId: authUserId } = useAuth();

  const event = _event as iEvent;
  const userId = params?.userId || authUserId;

  const [user, setUser] = useState<iUser | undefined>(undefined);
  const [predictionData, setPredictionData] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // can't use react-query because data must be re-fetched for each userId (it's not a pure component)
  useEffect(() => {
    getPersonalPredictionsByEvent(event.id, userId)
      .then((res) => setPredictionData(res))
      .finally(() => setIsLoading(false));

    getUser(userId).then((res) => setUser(res));
  }, [userId]);

  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    setIsCollapsed,
  } = useCollapsible();

  const props = {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    userId,
  };

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <DisplayFAB
        state={isCollapsed ? 'list-collapsed' : 'list'}
        toggleDisplay={toggle}
      />
      <BackgroundWrapper>
        <>
          {user ? <UserHeader user={user} /> : null}
          <View style={{ zIndex: 2, width: '100%' }}>
            <HistoryTab />
          </View>
          <Event
            tab={'personal'}
            predictionData={predictionData}
            isLoading={isLoading}
            {...props}
          />
        </>
      </BackgroundWrapper>
    </>
  );
};

export default EventFromProfile;
