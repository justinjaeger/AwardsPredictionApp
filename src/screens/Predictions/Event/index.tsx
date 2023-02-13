import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent } from '../../../types';
import { eventToString } from '../../../util/stringConversions';
import LoadingStatue from '../../../components/LoadingStatue';
import SignedOutState from '../../../components/SignedOutState';
import { getHeaderTitleWithTrophy } from '../../../constants';
import CategoryList from './CategoryList';
import _ from 'lodash';
import { formatLastUpdated } from '../../../util/formatDateTime';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import LastUpdatedText from '../../../components/LastUpdatedText';

const TIMING = 300;

const Event = ({
  tab,
  collapsedOpacity,
  expandedOpacity,
  isCollapsed,
  userId,
}: {
  tab: 'personal' | 'community';
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  isCollapsed: boolean;
  userId: string | undefined; // if undefined means user is logged out
}) => {
  const { event: _event, setCategory, date } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const isHistory = !!date;
  const event = _event as iEvent;

  const { predictionData, isLoading } = usePredictionData(tab, userId);
  // TODO: predictionData is defined, but I think we must be using event.categories and we're not passing that down from the user profile

  // define the header
  useLayoutEffect(() => {
    const headerTitle = eventToString(event.awardsBody, event.year);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  useEffect(() => {
    Animated.timing(loadingOpacity, {
      toValue: isLoading ? 1 : 0,
      duration: TIMING,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(bodyOpacity, {
        toValue: isLoading ? 0 : 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    }, 250);
  }, [isLoading]);

  if (!userId && tab === 'personal') {
    return <SignedOutState />;
  }

  const onSelectCategory = async (category: iCategory) => {
    setCategory(category);
    navigation.navigate('Category', { userId });
  };

  const iterablePredictionData = _.values(predictionData || {});

  // only applies to community since all categories are updated at once
  const lastUpdated =
    tab === 'community'
      ? // if community, all categories were last updated at same time
        iterablePredictionData[0]?.updatedAt || ''
      : // if personal, find the most recent updatedAt on category (bc this is for entire event)
        iterablePredictionData.reduce((acc, prediction) => {
          const curUpdatedAt = prediction.updatedAt;
          if (acc === '' || curUpdatedAt > acc) {
            acc = curUpdatedAt;
          }
          return acc;
        }, '');
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loadingOpacity,
        }}
      >
        <LoadingStatue />
      </Animated.View>
      <Animated.ScrollView
        style={{ opacity: bodyOpacity, width: '100%' }}
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingBottom: 100,
        }}
      >
        <Animated.View
          style={{
            opacity: collapsedOpacity,
            width: '100%',
            display: isCollapsed ? 'flex' : 'none',
          }}
        >
          <LastUpdatedText lastUpdated={lastUpdatedString} isDisabled={isHistory} />
          <CategoryList
            isCollapsed={true}
            onSelectCategory={(category: iCategory) => onSelectCategory(category)}
            predictionData={predictionData}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: expandedOpacity,
            width: '100%',
            display: isCollapsed ? 'none' : 'flex',
          }}
        >
          <LastUpdatedText lastUpdated={lastUpdatedString} isDisabled={isHistory} />
          <CategoryList
            isCollapsed={false}
            onSelectCategory={(category: iCategory) => onSelectCategory(category)}
            predictionData={predictionData}
          />
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
};

export default Event;
