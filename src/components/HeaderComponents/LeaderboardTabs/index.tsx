import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EventModel, Phase, WithId } from '../../../models';
import HorizontalScrollingTabs from '../../HorizontalScrollingTabs';
import { getLeaderboardsFromEvents } from '../../../util/getLeaderboardsFromEvents';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import {
  AWARDS_BODY_TO_STRING,
  SORTED_AWARDS_BODIES,
} from '../../../constants/awardsBodies';

/**
 * Shows phases within event
 */
const LeaderboardTopTabs = ({
  selectedEvent,
  phase,
  setLeaderboard,
  style,
}: {
  selectedEvent: WithId<EventModel>;
  phase: Phase;
  setLeaderboard: (event: WithId<EventModel>, phase: Phase) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const { year: selectedYear } = selectedEvent;
  const { data: events } = useQueryGetAllEvents();

  const eventsFilteredByYear = (events ?? []).filter((e) => {
    return e.year === selectedYear;
  });

  const eventsSorted = eventsFilteredByYear.sort(
    ({ awardsBody: ab1 }, { awardsBody: ab2 }) => {
      const indexA = SORTED_AWARDS_BODIES.indexOf(ab1);
      const indexB = SORTED_AWARDS_BODIES.indexOf(ab2);
      return indexA - indexB;
    },
  );

  const options = eventsSorted
    .reduce(
      (
        acc: {
          text: string;
          value: { event: WithId<EventModel>; phase: Phase };
          isSelected?: boolean | undefined;
        }[],
        e,
      ) => {
        const eventLeaderboards = getLeaderboardsFromEvents([e]);
        eventLeaderboards.forEach((leaderboard) => {
          acc.push({
            isSelected: leaderboard.phase === phase,
            text:
              AWARDS_BODY_TO_STRING[e.awardsBody] +
              ' ' +
              PHASE_TO_STRING_PLURAL[leaderboard.phase],
            value: { event: e, phase: leaderboard.phase },
          });
        });
        return acc;
      },
      [],
    )
    .sort((a, b) => {
      const p1 = a.value.phase;
      const p2 = b.value.phase;
      if (p1 === p2) return 0;
      if (p1 === Phase.WINNER) return -1;
      if (p2 === Phase.WINNER) return 1;
      if (p1 === Phase.NOMINATION) return -1;
      if (p2 === Phase.NOMINATION) return 1;
      return 0;
    });

  return (
    <HorizontalScrollingTabs<{ event: WithId<EventModel>; phase: Phase }>
      options={options}
      onPress={({ event, phase }) => {
        setLeaderboard(event, phase);
      }}
      contentContainerStyle={style}
    />
  );
};

export default LeaderboardTopTabs;
