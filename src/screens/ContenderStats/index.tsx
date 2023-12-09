import React, { useLayoutEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../../navigation/types';
import { CategoryName, EventModel, Movie, WithId, iPrediction } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { truncateText } from '../../util/truncateText';
import ContenderStatEventTab from './ContenderStatEventTab';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import ContenderInfoHeader from '../../components/ContenderInfoHeader';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { ScrollView } from 'react-native';

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  likelihood: number;
};

const ContenderStats = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderStats'>>();
  const ref = React.useRef<ScrollView>(null);
  const { movieTmdbId, year } = route.params;
  const { store } = useTmdbDataStore();
  const { data: events } = useQueryGetAllEvents();
  const movie = store[movieTmdbId] as Movie;
  const eventsWithinYear = events?.filter((event) => event.year === year);

  // TODO: Make dropdown so they can set whether they're seeing academy awards or something else
  const [event, setEvent] = useState<WithId<EventModel> | undefined>(
    eventsWithinYear?.[0],
  );

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
      <ScrollView ref={ref} style={{ flex: 1, width: '100%' }}>
        <ContenderInfoHeader
          prediction={{
            contenderId: '',
            ranking: 0,
            movieTmdbId,
          }}
        />
        <ContenderStatEventTab event={event} movieTmdbId={movieTmdbId} ref={ref} />
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default ContenderStats;
