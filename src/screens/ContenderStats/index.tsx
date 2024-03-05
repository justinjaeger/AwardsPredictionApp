import React, { useLayoutEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PredictionsNavigationProp, PredictionsParamList } from '../../navigation/types';
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

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  likelihood: number;
};

const ContenderStats = () => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderStats'>>();
  const scrollRef = useRef<ScrollView>(null);
  const { eventId, movieTmdbId, year, yyyymmdd } = route.params;
  const { store } = useTmdbDataStore();
  const { data: events } = useQueryGetAllEvents();
  const movie = store[movieTmdbId] as Movie;

  const eventsWithinYear = events?.filter((event) => event.year === year);
  const initialEvent =
    eventsWithinYear?.find(({ _id }) => eventId === _id) ?? eventsWithinYear?.[0];

  const [event, setEvent] = useState<WithId<EventModel> | undefined>(initialEvent);
  console.log('event', event?.awardsBody);

  // Set the header
  useLayoutEffect(() => {
    const headerTitle = truncateText((movie as Movie).title ?? '', 20);
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  if (!event) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
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
            eventOptions={eventsWithinYear}
            style={{ paddingLeft: theme.windowMargin }}
          />
        </LinearGradient>
        <ContenderStatEventTab
          event={event}
          movieTmdbId={movieTmdbId}
          scrollRef={scrollRef}
        />
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default ContenderStats;
