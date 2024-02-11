import React from 'react';
import { ScrollView, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  SORTED_AWARDS_BODIES,
} from '../../constants/awardsBodies';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import { AwardsBody, EventModel, WithId } from '../../models';
import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';

export const EVENT_TOP_TABS_HEIGHT = 40;

/**
 * Shows tabs within the selected event's year
 */
const EventTopTabs = ({
  selectedEvent,
  setEvent,
  style,
}: {
  selectedEvent: WithId<EventModel>;
  setEvent: (event: WithId<EventModel>) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const { year, awardsBody } = selectedEvent;
  const { data: events } = useQueryGetAllEvents();

  if (!events) {
    // TODO: Loading state
    return null;
  }

  const eventsFilteredByYear = events.filter((e) => {
    return e.year === year;
  });

  const eventsSorted = eventsFilteredByYear.sort(
    ({ awardsBody: ab1 }, { awardsBody: ab2 }) => {
      const indexA = SORTED_AWARDS_BODIES.indexOf(ab1);
      const indexB = SORTED_AWARDS_BODIES.indexOf(ab2);
      return indexA - indexB;
    },
  );

  return (
    <ScrollView
      horizontal
      style={[
        {
          width: '100%',
          height: EVENT_TOP_TABS_HEIGHT,
        },
        style,
      ]}
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      {eventsSorted.map((event) => {
        const { awardsBody: ab } = event;
        const eventIsSelected = awardsBody === ab;
        return (
          <TouchableHighlight
            key={awardsBody}
            style={{
              backgroundColor: eventIsSelected
                ? COLORS.secondaryDark
                : COLORS.primaryLight,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginLeft: 10,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              height: EVENT_TOP_TABS_HEIGHT - 10,
            }}
            underlayColor={COLORS.secondary}
            onPress={() => setEvent(event)}
          >
            <BodyBold style={{ color: COLORS.white }}>
              {AWARDS_BODY_TO_PLURAL_STRING[awardsBody as AwardsBody]}
            </BodyBold>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

export default EventTopTabs;
