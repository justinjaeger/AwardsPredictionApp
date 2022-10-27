import _ from 'lodash';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AwardsBody, EventType, ListEventsQuery } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { Body, SubHeader } from '../../../components/Text';
import { EVENT_TYPE_TO_STRING } from '../../../constants';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import { PredictionsParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useSubscriptionEffect, useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';

type iFormattedEvents = {
  eventId: string;
  awardsBody: AwardsBody;
  eventType: EventType;
  eventYear: number;
  expiration: string | undefined; // AWSDateTime
};

export const getEventName = (awardsBody: AwardsBody, eventType: EventType) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
  const et = EVENT_TYPE_TO_STRING[eventType];
  return ab + ' (' + et + ')';
};

const EventSelect = () => {
  const { setEvent } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [events, setEvents] = useState<ListEventsQuery>();

  useSubscriptionEffect(async () => {
    const { data: es } = await ApiServices.getAllEvents(); // TODO: change back to getAllEvents
    if (es) {
      console.error('EVENTS', es);
      setEvents(es);
    }
  }, []);

  const onSelectEvent = async (eventId: string) => {
    await setEvent(eventId);
    navigation.navigate('EventPredictions');
  };

  const es = events?.listEvents?.items || []; // since only awardsBody property matters this is ok
  const formattedEvents: iFormattedEvents[] = es.map((e) => ({
    eventId: e?.id || '',
    awardsBody: e ? AwardsBody[e.awardsBody] : AwardsBody.ACADEMY_AWARDS,
    eventType: e ? EventType[e.type] : EventType.NOMINATION,
    eventYear: e?.year || 0,
    expiration: e?.expiration || undefined,
  }));
  const orderedEvents = sortByObjectOrder<AwardsBody, iFormattedEvents>(
    AWARDS_BODY_TO_STRING,
    formattedEvents,
    es.map((e) => (e ? AwardsBody[e.awardsBody] : AwardsBody.ACADEMY_AWARDS)),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.eventYear);

  return (
    <ScrollView
      contentContainerStyle={{
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 40,
        paddingBottom: 100,
      }}
    >
      {Object.entries(groupedByYear).map(([key, val]) => (
        <>
          <SubHeader style={{ marginBottom: 10 }}>{key}</SubHeader>
          {val.map(({ eventId, eventType, awardsBody, expiration }) => (
            <View style={{ height: 100, backgroundColor: COLORS.white }}>
              <TouchableText
                text={getEventName(awardsBody, eventType)}
                onPress={() => onSelectEvent(eventId)}
                style={{ margin: 10 }}
              />
              <Body
                style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}
              >{`Date: ${expiration || 'TBD'}`}</Body>
            </View>
          ))}
        </>
      ))}
    </ScrollView>
  );
};

export default EventSelect;
