import React, { useEffect } from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import { EventDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import UserHeader from '../../../components/UserHeader';
import { useProfilePrediction } from '../../../context/ProfilePredictionContext';

const EventFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'EventFromProfile'>>();
  const { userId, userName, userImage } = params;

  const { predictionData, isLoading, setUserId } = useProfilePrediction();
  useEffect(() => setUserId(userId), [userId]);

  return (
    <>
      <EventDisplayFab />
      <BackgroundWrapper>
        <>
          {userId ? (
            <UserHeader userId={userId} userName={userName} userImage={userImage} />
          ) : null}
          <Event
            tab={'personal'}
            predictionData={predictionData}
            isLoading={isLoading}
            userId={userId}
            userImage={userImage}
            userName={userName}
          />
        </>
      </BackgroundWrapper>
    </>
  );
};

export default EventFromProfile;
