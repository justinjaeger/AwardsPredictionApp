import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import theme from '../../../constants/theme';
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

const EventSelect = () => {
  const { userId } = useAuth();

  const { data: events, isLoading, refetch: refetchEvents } = useQueryAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(userId);
  const { data: usersWithRecentPredictionSets } = useQueryGetFollowingRecentPredictions(
    userId,
  );

  const { loadingOpacity, bodyOpacity } = useLoading(isLoading);

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
    if (user === undefined) {
      refetchUser();
    }
  }, [events, user, userId]);

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
          }}
        >
          {events ? <EventList user={user} events={Object.values(events)} /> : null}
          {(usersWithRecentPredictionSets || []).length > 0 ? (
            // TODO: Below display is untested
            <>
              <HeaderLight
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 20,
                }}
              >
                Friend Predictions
              </HeaderLight>
              {(usersWithRecentPredictionSets || []).map((item) => (
                <PredictionCarousel
                  predictionSets={item.predictionSets}
                  userId={item.user.id}
                  userInfo={{
                    name: item.user.name || item.user.username || '',
                    image: item.user.image,
                  }}
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
