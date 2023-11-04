import React, { useEffect, useLayoutEffect } from 'react';
import { PredictionsParamList } from '../../../navigation/types';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useProfilePrediction } from '../../../context/ProfilePredictionContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithProfile } from '../../../constants';
import { useEvent } from '../../../context/EventContext';

const EventFromProfile = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PredictionsParamList, 'EventFromProfile'>>();
  const { userId, userName, userImage } = params;

  const { event } = useEvent();

  const { predictionData, isLoading, setUserId } = useProfilePrediction();
  useEffect(() => setUserId(userId), [userId]);

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    const onPressProfileImage = () => {
      navigation.dispatch(StackActions.push('Profile', { userId }));
    };
    navigation.setOptions({
      headerTitle: getHeaderTitleWithProfile(headerTitle, userImage, onPressProfileImage),
    });
  }, [navigation]);

  return (
    <>
      <BackgroundWrapper>
        <Event
          tab={'personal'}
          predictionData={predictionData}
          isLoading={isLoading}
          userId={userId}
          userImage={userImage}
          userName={userName}
        />
      </BackgroundWrapper>
    </>
  );
};

export default EventFromProfile;
