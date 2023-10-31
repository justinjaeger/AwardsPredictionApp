import React, { useEffect, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUser from '../../../hooks/queries/useQueryGetUser';
import EventList from '../Event/EventList';
import { HeaderLight } from '../../../components/Text';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import PredictionCarousel from '../../../components/PredictionCarousel';
import theme from '../../../constants/theme';
import RecommendedUsers from '../../../components/RecommendedUsers';
import CarouselSkeleton from '../../../components/Skeletons/CarouselSkeleton';
import EventBoxSkeleton from '../../../components/Skeletons/EventBoxSkeleton';

const EventSelect = () => {
  const { width } = useWindowDimensions();
  const { userId: authUserId } = useAuth();

  const {
    data: events,
    isLoading: isLoadingEvents,
    refetch: refetchEvents,
  } = useQueryGetAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(authUserId);
  const {
    data: usersWithNestedData,
    isLoading: isLoadingUsers,
    refetch: refetchFollowingPredictions,
  } = useQueryGetFollowingUsers();

  useEffect(() => {
    if (authUserId && user === undefined) {
      refetchUser();
    }
    if (authUserId) {
      // WARN: sometimes refetch appears to be not working, but mostly it seems ok?
      refetchFollowingPredictions();
    }
  }, [authUserId, user]);

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
  }, [events]);

  const [numToShow, setNumToShow] = useState<number>(3);

  const onEndReached = () => {
    setNumToShow((n) => n + 5);
  };

  const data = usersWithNestedData ?? [];

  return (
    <BackgroundWrapper>
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <FlatList
          data={data.slice(0, numToShow)}
          style={{ width: '100%' }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListHeaderComponent={
            <View style={{ width: '100%', alignItems: 'center' }}>
              <HeaderLight
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 20,
                  marginLeft: theme.windowMargin,
                }}
              >
                Make Predictions
              </HeaderLight>
              {isLoadingEvents || !events ? (
                <EventBoxSkeleton />
              ) : (
                <EventList
                  user={user ?? undefined} // so if the user is signed out they don't see their old predictions
                  events={events}
                />
              )}
              {!authUserId ? (
                // users not signed in can see recommended users
                <RecommendedUsers header={'Follow Users'} />
              ) : (
                <HeaderLight
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                    marginLeft: theme.windowMargin,
                    marginBottom: 10,
                  }}
                >
                  New From Friends
                </HeaderLight>
              )}
              {isLoadingUsers ? (
                <View style={{ marginLeft: -10 }}>
                  {new Array(2).fill(null).map(() => (
                    <CarouselSkeleton renderProfile renderLabel />
                  ))}
                </View>
              ) : null}
            </View>
          }
          ListFooterComponent={
            numToShow < data.length ? <CarouselSkeleton renderLabel /> : null
          }
          renderItem={({ item }) => (
            <View style={{ width }}>
              <PredictionCarousel
                key={item._id}
                predictionSets={item.recentPredictionSets || []}
                userId={item._id}
                userInfo={{
                  name: item.name || item.username || '',
                  image: item.image,
                }}
              />
            </View>
          )}
          onScrollEndDrag={(e) => {
            // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
            // get position of current scroll
            const currentOffset = e.nativeEvent.contentOffset.y;
            // get max bottom of scroll
            const maxOffset =
              e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
            // if we're close to the bottom fetch more
            if (currentOffset > maxOffset - 200) {
              onEndReached();
            }
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
        />
      </View>
    </BackgroundWrapper>
  );
};

export default EventSelect;
