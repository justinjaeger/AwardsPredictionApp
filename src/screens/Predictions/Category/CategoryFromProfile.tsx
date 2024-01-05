import React, { useLayoutEffect } from 'react';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithProfile } from '../../../constants';
import { View } from 'react-native';
import { RouteProp, StackActions, useRoute } from '@react-navigation/native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useRouteParams } from '../../../hooks/useRouteParams';
import useProfileUser from '../../Profile/useProfileUser';

const CategoryFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'CategoryFromProfile'>>();
  const showEventLink = params?.showEventLink || false;
  const { userId } = useRouteParams();
  const { user } = useProfileUser(userId);

  const { category, event } = useRouteParams();

  const navigation = useTypedNavigation<PredictionsParamList>();

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event || !user) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = event.categories[category].name;
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    const onPressProfileImage = () => {
      navigation.dispatch(StackActions.push('Profile', { userId }));
    };
    navigation.setOptions({
      headerTitle: getHeaderTitleWithProfile(headerTitle, user, onPressProfileImage),
    });
  }, [navigation, user]);

  return (
    <BackgroundWrapper>
      <View style={{ width: '100%' }}>
        <CategoryPersonal showEventLink={showEventLink} />
      </View>
    </BackgroundWrapper>
  );
};

export default CategoryFromProfile;
