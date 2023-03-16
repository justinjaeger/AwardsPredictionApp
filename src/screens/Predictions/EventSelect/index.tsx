import React, { useEffect } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryAllEvents from '../../../hooks/queries/getAllEvents';
import { useAuth } from '../../../context/UserContext';
import useQueryGetUser from '../../../hooks/queries/getUser';
import EventList from '../Event/EventList';
import { HeaderLight } from '../../../components/Text';
import useQueryGetFollowingRecentPredictions from '../../../hooks/queries/useQueryGetFollowingRecentPredictions';
import PredictionCarousel from '../../../components/PredictionCarousel';
import { useLoading } from '../../../hooks/animatedState/useLoading';
import theme from '../../../constants/theme';

const EventSelect = () => {
  const { width } = useWindowDimensions();
  const { userId } = useAuth();

  const { data: events, isLoading, refetch: refetchEvents } = useQueryAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(userId);
  const {
    data: usersWithRecentPredictionSets,
    refetch: refetchFollowingPredictions,
  } = useQueryGetFollowingRecentPredictions(userId);

  const { loadingOpacity, bodyOpacity } = useLoading(isLoading);

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
    if (user === undefined) {
      refetchUser();
    }
    if (usersWithRecentPredictionSets === undefined) {
      // WARN: sometimes refetch appears to be not working, but mostly it seems ok?
      refetchFollowingPredictions({ throwOnError: true });
    }
  }, [events, user, userId]);

  return (
    <BackgroundWrapper>
      <>
        <Animated.View
          style={{
            position: 'absolute',
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
            alignItems: 'center',
            marginTop: 20,
            width,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {events ? <EventList user={user} events={Object.values(events)} /> : null}
          {(usersWithRecentPredictionSets || []).length > 0 ? (
            <>
              <HeaderLight
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 20,
                  marginLeft: theme.windowMargin,
                }}
              >
                Friend Predictions
              </HeaderLight>
              {(usersWithRecentPredictionSets || []).map((u) => (
                <PredictionCarousel
                  key={u.id}
                  predictionSets={u.predictionSets || []}
                  userId={u.id}
                  userInfo={{
                    name: u.name || u.username || '',
                    image: u.image,
                  }}
                  style={{ marginTop: 20 }}
                />
              ))}
            </>
          ) : null}
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

export default EventSelect;
