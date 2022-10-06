import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { AWARDS_BODY_TO_STRING } from '../../../constants/awardsBodies';
import { AwardsBody, Event } from '../../../models';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

const EventSelect = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState<Event[]>([]);

  useAsyncEffect(async () => {
    const { data: es } = await ApiServices.getAllEvents();
    if (es) {
      setEvents(es);
    }
  }, []);

  const onSelectEvent = (e: Event) => {
    navigation.navigate('CategorySelect', { event: e });
  };

  const orderedEvents = sortByObjectOrder<AwardsBody, Event>(
    AWARDS_BODY_TO_STRING,
    events,
    events.map((e) => AwardsBody[e.awardsBody]),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedEvents.map((event) => (
        <TouchableText
          text={eventToString(event)}
          onPress={() => onSelectEvent(event)}
          style={{ margin: 10 }}
        />
      ))}
    </ScrollView>
  );
};

export default EventSelect;
