import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { Header } from '../../../components/Text';
import { AwardsBody, Event } from '../../../models';
import { AWARDS_BODY_TO_STRING, EVENT_TYPE_TO_STRING } from '../../../util/constants';
import sortByObjectOrder from '../../../util/sortByObjectOrder';

const EventSelect = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const sub = DataStore.observeQuery(Event).subscribe(({ items }) => {
      setEvents(items);
    });
    return () => sub.unsubscribe();
  }, []);

  const eventToString = (e: Event) => {
    const ab = AWARDS_BODY_TO_STRING[AwardsBody[e.awardsBody]];
    const et = EVENT_TYPE_TO_STRING[e.type];
    const y = e.year;
    return ab + ' ' + et + ' ' + y;
  };

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
      <Header>Events</Header>
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
