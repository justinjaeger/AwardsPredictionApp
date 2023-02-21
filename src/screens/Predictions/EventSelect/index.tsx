import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import theme from '../../../constants/theme';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryAllEvents from '../../../hooks/queries/getAllEvents';
import { useAuth } from '../../../context/UserContext';
import useQueryGetUser from '../../../hooks/queries/getUser';
import EventList from '../Event/EventList';
import { Body, HeaderLight } from '../../../components/Text';
import useQueryGetFollowingRecentPredictions from '../../../hooks/queries/useQueryGetFollowingRecentPredictions';

const EventSelect = () => {
  const { userId } = useAuth();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const { data: events, isLoading, refetch: refetchEvents } = useQueryAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(userId);
  const { data: usersWithRecentPredictionSets } = useQueryGetFollowingRecentPredictions(
    userId,
  );

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
    if (user === undefined) {
      refetchUser();
    }
  }, [events, user, userId]);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(bodyOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [isLoading]);

  // <PredictionCarousel predictionSets={predictionSets} userId={userId} />

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
        <Animated.ScrollView
          style={{ opacity: bodyOpacity }}
          contentContainerStyle={{
            alignSelf: 'flex-start',
            marginTop: theme.windowMargin,
            paddingBottom: 100,
            marginLeft: theme.windowMargin,
          }}
        >
          <HeaderLight
            style={{
              alignSelf: 'flex-start',
              marginTop: 10,
            }}
          >
            Events
          </HeaderLight>
          {events && user ? (
            <EventList user={user} events={Object.values(events)} />
          ) : null}
          <HeaderLight
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
            }}
          >
            Friend Predictions
          </HeaderLight>
          <Body>{JSON.stringify(usersWithRecentPredictionSets)}</Body>
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

export default EventSelect;
