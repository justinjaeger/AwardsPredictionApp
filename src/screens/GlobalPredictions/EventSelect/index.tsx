import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ListEventsQuery } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { AWARDS_BODY_TO_STRING } from '../../../constants/awardsBodies';
import { EventType, AwardsBody, Event } from '../../../models';

import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect, useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

const EventSelect = () => {
  const navigation = useTypedNavigation<GlobalParamList>();

  const [events, setEvents] = useState<ListEventsQuery>();

  useAsyncEffect(async () => {
    const { data: es } = await ApiServices.getAllEvents();
    if (es) {
      setEvents(es);
    }
  }, []);

  const onSelectEvent = (eventId: string) => {
    navigation.navigate('CategorySelect', { eventId });
  };

  const es = (events?.listEvents?.items || []) as Event[]; // since only awardsBody property matters this is ok
  const orderedEvents = sortByObjectOrder<AwardsBody, Event>(
    AWARDS_BODY_TO_STRING,
    es,
    es.map((e: Event) => AwardsBody[e.awardsBody]),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedEvents.map((event) => (
        <TouchableText
          text={eventToString(
            AwardsBody[event.awardsBody],
            EventType[event.type],
            event.year,
          )}
          onPress={() => onSelectEvent(event.id)}
          style={{ margin: 10 }}
        />
      ))}
    </ScrollView>
  );
};

export default EventSelect;
