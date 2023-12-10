import React, { useLayoutEffect } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import Event from './index';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithProfile } from '../../../constants';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useProfileUser from '../../Profile/useProfileUser';
import { useRouteParams } from '../../../hooks/useRouteParams';

const EventFromProfile = () => {
  const navigation = useNavigation();
  const { userId, event } = useRouteParams();
  const { user } = useProfileUser(userId);

  const { data: predictionData, isLoading } = useQueryGetUserPredictions(userId);

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    const onPressProfileImage = () => {
      navigation.dispatch(StackActions.push('Profile', { userId }));
    };
    navigation.setOptions({
      headerTitle: getHeaderTitleWithProfile(
        headerTitle,
        user?.image,
        onPressProfileImage,
      ),
    });
  }, [navigation, user?.image]);

  return (
    <>
      <BackgroundWrapper>
        <Event
          tab={'personal'}
          predictionData={predictionData || undefined}
          isLoading={isLoading}
        />
      </BackgroundWrapper>
    </>
  );
};

export default EventFromProfile;
