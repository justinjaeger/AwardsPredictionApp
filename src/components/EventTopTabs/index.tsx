import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  SORTED_AWARDS_BODIES,
} from '../../constants/awardsBodies';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import { EventModel, WithId } from '../../models';
import HorizontalScrollingTabs from '../HorizontalScrollingTabs';

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
  const { year: selectedYear, awardsBody: selectedAwardsBody } = selectedEvent;
  const { data: events } = useQueryGetAllEvents();

  if (!events) {
    // TODO: Loading state
    return null;
  }

  const eventsFilteredByYear = events.filter((e) => {
    return e.year === selectedYear;
  });

  const eventsSorted = eventsFilteredByYear.sort(
    ({ awardsBody: ab1 }, { awardsBody: ab2 }) => {
      const indexA = SORTED_AWARDS_BODIES.indexOf(ab1);
      const indexB = SORTED_AWARDS_BODIES.indexOf(ab2);
      return indexA - indexB;
    },
  );

  return (
    <HorizontalScrollingTabs
      options={eventsSorted.map((e) => ({
        isSelected: e.awardsBody === selectedAwardsBody,
        text: AWARDS_BODY_TO_PLURAL_STRING[e.awardsBody],
        value: e._id,
      }))}
      onPress={(eventId) => {
        const event = events.find((e) => e._id === eventId);
        if (event) {
          setEvent(event);
        }
      }}
      style={style}
    />
  );
};

export default EventTopTabs;
