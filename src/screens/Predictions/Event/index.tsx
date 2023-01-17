import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent } from '../../../types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/UserContext';
import { eventToString } from '../../../util/stringConversions';
import LoadingStatue from '../../../components/LoadingStatue';
import SignedOutState from '../../../components/SignedOutState';
import { getHeaderTitleWithTrophy } from '../../../constants';
import EventList from './EventList';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import _ from 'lodash';
import { formatLastUpdated } from '../../../util/formatDateTime';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import LastUpdatedText from '../../../components/LastUpdatedText';

const TIMING = 300;

const Event = (props: {
  tab: 'personal' | 'community';
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  isCollapsed: boolean;
}) => {
  const { tab, collapsedOpacity, expandedOpacity, isCollapsed } = props;

  const { event: _event, setCategory, date } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const isHistory = !!date;
  const event = _event as iEvent;
  const userId = _userId as string;

  const { predictionData, isLoading } = usePredictionData(tab);

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
    navigation.navigate('Category');
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
          <EventList
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
          <EventList
            isCollapsed={false}
            onSelectCategory={(category: iCategory) => onSelectCategory(category)}
            predictionData={predictionData}
          />
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
};

const TabsWrapper = () => {
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
      {PredictionTabsNavigator(
        <Event tab={'personal'} {...props} />,
        <Event tab={'community'} {...props} />,
      )}
    </>
  );
};

export default TabsWrapper;
