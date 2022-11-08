import _ from 'lodash';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { AwardsBody, EventType } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { Body, SubHeader } from '../../../components/Text';
import { EVENT_TYPE_TO_STRING } from '../../../constants';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iEvent, QueryKeys } from '../../../store/types';
import { useQuery } from '@tanstack/react-query';
import getAllEvents from '../../../services/queryFuncs/getAllEvents';

export const getEventName = (awardsBody: AwardsBody, eventType: EventType) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
  const et = EVENT_TYPE_TO_STRING[eventType];
  return ab + ' (' + et + ')';
};

const EventSelect = () => {
  const { setEvent } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { data: events, isLoading } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: getAllEvents,
  });
  if (isLoading) return null;
  if (!events) return null;

  const onSelectEvent = async (event: iEvent) => {
    setEvent(event);
    navigation.navigate('EventPredictions');
  };

  const eventList = Object.values(events);
  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    Object.values(eventList),
    eventList.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

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
          {val.map((event) => {
            const { type, awardsBody, expiration } = event;
            return (
              <View style={{ height: 100, backgroundColor: COLORS.white }}>
                <TouchableText
                  text={getEventName(awardsBody, type)}
                  onPress={() => onSelectEvent(event)}
                  style={{ margin: 10 }}
                />
                <Body
                  style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}
                >{`Date: ${expiration || 'TBD'}`}</Body>
              </View>
            );
          })}
        </>
      ))}
    </ScrollView>
  );
};

export default EventSelect;
