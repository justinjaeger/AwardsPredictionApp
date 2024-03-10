import React, { useRef, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../../navigation/types';
import { CategoryName, EventModel, Movie, WithId, iPrediction } from '../../models';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { truncateText } from '../../util/truncateText';
import ContenderStatEventTab from './ContenderStatEventTab';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import ContenderInfoHeader from '../../components/ContenderInfoHeader';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { ScrollView, View } from 'react-native';
import HistoryDateIndicator from '../../components/HistoryDateIndicator';
import EventTopTabs from '../../components/HeaderComponents/EventTopTabs';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import BackButton from '../../components/HeaderComponents/BackButton';
import DynamicHeaderScrollViewWrapper from '../../components/DynamicHeaderWrapper/DynamicHeaderScrollViewWrapper';

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  likelihood: number;
};

const ContenderStats = () => {
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderStats'>>();
  const scrollRef = useRef<ScrollView>(null);
  const { eventId, movieTmdbId, year, yyyymmdd } = route.params;
  const { store } = useTmdbDataStore();
  const { data: events } = useQueryGetAllEvents();
  const movie = store[movieTmdbId] as Movie;

  const eventsWithinYear = events?.filter((event) => event.year === year);
  const initialEvent = useRef(
    eventsWithinYear?.find(({ _id }) => eventId === _id) ?? eventsWithinYear?.[0],
  ).current;

  const [event, setEvent] = useState<WithId<EventModel> | undefined>(initialEvent);

  if (!event) {
    return null;
  }

  const headerTitle = truncateText((movie as Movie).title ?? '', 20);

  const resortedEvents = [
    initialEvent,
    ...(eventsWithinYear?.filter((e) => e._id !== initialEvent._id) ?? []),
  ];

  return (
    <BackgroundWrapper>
      <DynamicHeaderScrollViewWrapper
        scrollViewRef={scrollRef}
        distanceToCollapse={40}
        topOnlyContent={{
          height: 40,
          component: (
            <BackButton
              variation={'on-dark'}
              style={{ marginLeft: theme.windowMargin }}
            />
          ),
        }}
        titleWhenCollapsed={headerTitle}
      >
        <>
          <LinearGradient
            colors={[COLORS.primaryDark, COLORS.primary]}
            style={{ paddingBottom: 20 }}
          >
            <ContenderInfoHeader
              prediction={{
                contenderId: '',
                ranking: 0,
                movieTmdbId,
              }}
            />
            <HistoryDateIndicator yyyymmdd={yyyymmdd} />
            <View style={{ height: 10 }} />
            <EventTopTabs
              selectedEvent={event}
              setEvent={setEvent}
              eventOptions={resortedEvents}
              style={{ paddingLeft: theme.windowMargin }}
            />
          </LinearGradient>
          <ContenderStatEventTab
            event={event}
            movieTmdbId={movieTmdbId}
            scrollRef={scrollRef}
          />
        </>
      </DynamicHeaderScrollViewWrapper>
    </BackgroundWrapper>
  );
};

export default ContenderStats;
