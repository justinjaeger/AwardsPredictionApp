import React, { useEffect } from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/UserContext';
import { EventDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import HistoryTab from '../../../components/HistoryTab';
import { View } from 'react-native';
import UserHeader from '../../../components/UserHeader';
import { useProfilePrediction } from '../../../context/ProfilePredictionContext';
import { useEventDisplay } from '../../../hooks/animatedState/useDisplay';

const EventFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Event'>>();

  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

  const { user, predictionData, isLoading, setUserId } = useProfilePrediction();
  useEffect(() => setUserId(userId), [userId]);

  const { collapsedOpacity, expandedOpacity, delayedDisplay } = useEventDisplay();

  const props = {
    collapsedOpacity,
    expandedOpacity,
    delayedDisplay,
    userId,
  };

  return (
    <>
      <EventDisplayFab />
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
