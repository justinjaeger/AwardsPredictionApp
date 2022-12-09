import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent } from '../../../types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/UserContext';
import { eventToString } from '../../../util/stringConversions';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryCommunityOrPersonalEvent from '../../../hooks/getCommunityOrPersonalEvent';
import SignedOutState from '../../../components/SignedOutState';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { CategoryHeader } from '../styles';
import HeaderButton from '../../../components/HeaderButton';
import EventList from './EventList';

const TIMING = 300;

const Event = (props: { tab: 'personal' | 'community' }) => {
  const { tab } = props;

  const { event: _event, setCategory } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;
  const collapsedOpacity = useRef(new Animated.Value(0)).current;
  const expandedOpacity = useRef(new Animated.Value(1)).current;

  const event = _event as iEvent;
  const userId = _userId as string;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // define the header
  useLayoutEffect(() => {
    const headerTitle = eventToString(event.awardsBody, event.year);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  const { data: predictionData, isLoading } = useQueryCommunityOrPersonalEvent(
    tab,
    !!userId,
    { event, userId },
  );

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(bodyOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
      }, 250);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isCollapsed) {
      Animated.timing(expandedOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(collapsedOpacity, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(collapsedOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(expandedOpacity, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    }
  }, [isCollapsed]);

  if (!userId && tab === 'personal') {
    return <SignedOutState />;
  }

  const onSelectCategory = async (category: iCategory) => {
    setCategory(category);
    navigation.navigate('Category');
  };

  return (
    <BackgroundWrapper>
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
        <CategoryHeader>
          <View style={{ flexDirection: 'row' }}>
            <HeaderButton
              onPress={() => {
                setIsCollapsed(!isCollapsed);
              }}
              icon={isCollapsed ? 'expand' : 'collapse'}
            />
          </View>
        </CategoryHeader>
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
            <EventList
              isCollapsed={false}
              onSelectCategory={(category: iCategory) => onSelectCategory(category)}
              predictionData={predictionData}
            />
          </Animated.View>
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(<Event tab={'community'} />, <Event tab={'personal'} />);
};

export default TabsWrapper;
