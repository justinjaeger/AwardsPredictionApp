import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EventModel, Phase, WithId } from '../../models';
import HorizontalScrollingTabs from '../HorizontalScrollingTabs';
import { getLeaderboardsFromEvents } from '../../util/getLeaderboardsFromEvents';
import { PHASE_TO_STRING_PLURAL } from '../../constants/categories';

/**
 * Shows phases within event
 */
const LeaderboardPhaseTabs = ({
  event,
  phase,
  setPhase,
  style,
}: {
  event: WithId<EventModel>;
  phase: Phase;
  setPhase: (phase: Phase) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const eventLeaderboards = getLeaderboardsFromEvents([event]);

  return (
    <HorizontalScrollingTabs
      options={eventLeaderboards.map((leaderboard) => ({
        isSelected: leaderboard.phase === phase,
        text: PHASE_TO_STRING_PLURAL[leaderboard.phase],
        value: leaderboard.phase,
      }))}
      onPress={(phase) => {
        setPhase(phase);
      }}
      style={style}
    />
  );
};

export default LeaderboardPhaseTabs;
