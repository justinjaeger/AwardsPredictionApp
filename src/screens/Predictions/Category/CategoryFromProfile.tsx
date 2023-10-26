import React, { useLayoutEffect } from 'react';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { useEvent } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { View } from 'react-native';
import { CategoryDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { RouteProp, useRoute } from '@react-navigation/native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import UserHeader from '../../../components/UserHeader';

const CategoryFromProfile = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'CategoryFromProfile'>>();
  const { userId, userName, userImage } = params;
  const showEventLink = params?.showEventLink || false;

  const { category, event: _event } = useEvent();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const event = _event!;

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = awardsBodyCategories[category]?.name || '';
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  return (
    <>
      <CategoryDisplayFab />
      <BackgroundWrapper>
        {userId ? (
          <UserHeader
            userId={userId}
            userName={userName}
            userImage={userImage}
            showEventLink={showEventLink}
          />
        ) : null}
        <View style={{ width: '100%' }}>
          <CategoryPersonal userId={userId} showEventLink={showEventLink} />
        </View>
      </BackgroundWrapper>
    </>
  );
};

export default CategoryFromProfile;
