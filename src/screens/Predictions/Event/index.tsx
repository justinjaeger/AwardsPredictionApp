import React, { useLayoutEffect } from 'react';
import { Animated } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useEvent } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import LoadingStatue from '../../../components/LoadingStatue';
import SignedOutState from '../../../components/SignedOutState';
import { getHeaderTitleWithTrophy } from '../../../constants';
import CategoryList from './CategoryList';
import _ from 'lodash';
import { formatLastUpdated } from '../../../util/formatDateTime';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { StackActions } from '@react-navigation/native';
import { useLoading } from '../../../hooks/animatedState/useLoading';
import { iEventDisplayState } from '../../../context/DisplayStateContext';
import { CategoryName, PredictionSet, WithId } from '../../../types/api';

// This is shared by EventPersonalCommunity AND EventFromProfile
const Event = ({
  tab,
  collapsedOpacity,
  expandedOpacity,
  delayedDisplay,
  userId,
  predictionData,
  isLoading,
}: {
  tab: 'personal' | 'community';
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  delayedDisplay: iEventDisplayState;
  userId: string | undefined; // if undefined means user is logged out
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
}) => {
  const { userId: authUserId } = useAuth();
  const { event, setCategory } = useEvent();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { loadingOpacity, bodyOpacity } = useLoading(isLoading);

  const isAuthUserProfile = userId === authUserId;

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  if (!userId && tab === 'personal') {
    return <SignedOutState />;
  }

  const onSelectCategory = async (category: CategoryName) => {
    setCategory(category);
    if (isAuthUserProfile) {
      navigation.navigate('Category', { userId });
    } else {
      navigation.dispatch(StackActions.push('CategoryFromProfile', { userId }));
    }
  };

  const iterablePredictionData = _.values(predictionData?.categories || {});

  // only applies to community since all categories are updated at once
  const lastUpdated =
    tab === 'community'
      ? // if community, all categories were last updated at same time
        iterablePredictionData[0]?.createdAt || ''
      : // if personal, find the most recent updatedAt on category (bc this is for entire event)
        iterablePredictionData.reduce((acc: Date, prediction) => {
          const curUpdatedAt = prediction.createdAt;
          if (curUpdatedAt > acc) {
            acc = curUpdatedAt;
          }
          return acc;
        }, new Date('1970-01-01'));
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
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: collapsedOpacity,
            width: '100%',
            display: delayedDisplay === 'collapsed' ? 'flex' : 'none',
          }}
        >
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          <CategoryList
            isCollapsed={true}
            onSelectCategory={(category: CategoryName) => onSelectCategory(category)}
            predictionData={predictionData}
            isAuthUserProfile={isAuthUserProfile}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: expandedOpacity,
            width: '100%',
            display: delayedDisplay === 'default' ? 'flex' : 'none',
          }}
        >
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          <CategoryList
            isCollapsed={false}
            onSelectCategory={(category: CategoryName) => onSelectCategory(category)}
            predictionData={predictionData}
            isAuthUserProfile={isAuthUserProfile && tab === 'personal'}
          />
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
};

export default Event;
