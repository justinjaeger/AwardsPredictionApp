import { useEffect, useState } from 'react';
import { EventModel, Phase, WithId } from '../models';
import { useRouteParams } from './useRouteParams';
import useQueryGetAllEvents from './queries/useQueryGetAllEvents';
import { getLeaderboardFromEvent } from '../util/getLeaderboardFromEvent';
import { getLeaderboardsFromEvents } from '../util/getLeaderboardsFromEvents';
import { getDefaultEvent } from '../util/getDefaultEvent';

export const useEventSelect = () => {
  const {
    event: initialEvent,
    yyyymmdd: initialYyyymmdd,
    phase: initialPhase,
  } = useRouteParams();
  const { data: events, defaultEvent, defaultLeaderboard } = useQueryGetAllEvents();

  const [year, _setYear] = useState<number | undefined>(
    initialEvent?.year ?? defaultEvent?.year,
  );
  const [event, _setEvent] = useState<WithId<EventModel> | undefined>(
    initialEvent ?? defaultEvent,
  );
  const [phase, setPhase] = useState<Phase | undefined>(initialPhase);
  const [yyyymmdd, setYyyymmdd] = useState<number | undefined>(initialYyyymmdd);

  const setEvent = (event: WithId<EventModel>) => {
    _setYear(event.year);
    _setEvent(event);
    // set phase to the most recent phase
    const phases = getLeaderboardsFromEvents([event]);
    const winnerEvent = phases.find((p) => p.phase === Phase.WINNER);
    const nominationsEvent = phases.find((p) => p.phase === Phase.NOMINATION);
    if (winnerEvent) {
      setPhase(Phase.WINNER);
    } else if (nominationsEvent) {
      setPhase(Phase.NOMINATION);
    } else {
      setPhase(undefined);
    }
  };

  const setYear = (year: number) => {
    const eventsWithNewYear = events?.filter((e) => e.year === year);
    const eventWithNewYearAndSameAwardsBody = eventsWithNewYear?.find(
      (e) => e.awardsBody === event?.awardsBody,
    );
    if (eventWithNewYearAndSameAwardsBody) {
      setEvent(eventWithNewYearAndSameAwardsBody);
      return;
    }
    const defaultEvent = getDefaultEvent(eventsWithNewYear);
    if (defaultEvent) {
      setEvent(defaultEvent);
    }
  };

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!event && defaultEvent) {
      setEvent(defaultEvent);
    }
  }, [defaultEvent]);

  useEffect(() => {
    if (!phase && defaultLeaderboard) {
      setPhase(defaultLeaderboard.phase);
    }
  }, [defaultLeaderboard]);

  const leaderboard = event && phase ? getLeaderboardFromEvent(event, phase) : undefined;

  return {
    yyyymmdd,
    setYyyymmdd,
    year,
    setYear,
    event,
    setEvent,
    phase,
    setPhase,
    leaderboard,
  };
};
