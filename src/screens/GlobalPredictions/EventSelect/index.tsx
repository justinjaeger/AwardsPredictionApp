import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { AwardsBody, EventType, ListEventsQuery } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { AWARDS_BODY_TO_STRING } from '../../../constants/awardsBodies';
import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect, useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

type iFormattedEvents = {
  eventId: string;
  awardsBody: AwardsBody;
  eventType: EventType;
  eventYear: number;
};

const EventSelect = () => {
  const navigation = useTypedNavigation<GlobalParamList>();

  const [events, setEvents] = useState<ListEventsQuery>();

  useAsyncEffect(async () => {
    const { data: es } = await ApiServices.getAllEvents(); // TODO: change back to getAllEvents
    if (es) {
      setEvents(es);
    }
  }, []);

  const onSelectEvent = (eventId: string) => {
    navigation.navigate('CategorySelect', { eventId });
  };

  const es = events?.listEvents?.items || []; // since only awardsBody property matters this is ok
  const formattedEvents = es.map((e) => ({
    eventId: e?.id || '',
    awardsBody: e ? AwardsBody[e.awardsBody] : AwardsBody.ACADEMY_AWARDS,
    eventType: e ? EventType[e.type] : EventType.NOMINATION,
    eventYear: e?.year || 0,
  }));
  const orderedEvents = sortByObjectOrder<AwardsBody, iFormattedEvents>(
    AWARDS_BODY_TO_STRING,
    formattedEvents,
    es.map((e) => (e ? AwardsBody[e.awardsBody] : AwardsBody.ACADEMY_AWARDS)),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedEvents.map(({ eventId, eventType, eventYear, awardsBody }) => (
        <TouchableText
          text={eventToString(awardsBody, eventType, eventYear)}
          onPress={() => onSelectEvent(eventId)}
          style={{ margin: 10 }}
        />
      ))}
    </ScrollView>
  );
};

export default EventSelect;
