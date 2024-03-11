import { useEffect, useState } from 'react';
import { EventModel, Phase, WithId } from '../models';
import { useRouteParams } from './useRouteParams';
import useQueryGetAllEvents from './queries/useQueryGetAllEvents';
import { getLeaderboardFromEvent } from '../util/getLeaderboardFromEvent';
import { getLeaderboardsFromEvents } from '../util/getLeaderboardsFromEvents';
import { getDefaultEvent } from '../util/getDefaultEvent';

export const useEventSelect = (params?: { isLeaderboard?: boolean }) => {
  const {
    event: initialEvent,
    yyyymmdd: initialYyyymmdd,
    phase: initialPhase,
    isLeaderboard: routeIsLeaderboard,
  } = useRouteParams();
  const isLeaderboard = params?.isLeaderboard ?? routeIsLeaderboard;
  const {
    data: events,
    defaultEvent,
    defaultLeaderboard,
  } = useQueryGetAllEvents({ isLeaderboard });

  const [eventType, _setEventType] = useState<'list' | 'prediction'>(
    initialEvent?.eventType ?? 'prediction',
  );
  const [year, _setYear] = useState<number | undefined>(
    initialEvent?.year ?? defaultEvent?.year,
  );
  const [event, _setEvent] = useState<WithId<EventModel> | undefined>(
    initialEvent ?? defaultEvent,
  );
  const [phase, setPhase] = useState<Phase | undefined>(initialPhase);
  const [yyyymmdd, setYyyymmdd] = useState<number | undefined>(initialYyyymmdd);

  const eventTypeEvents = events.filter((e) => e?.eventType === 'list');
  const predictionTypeEvents = events.filter((e) => e?.eventType !== 'list');

  const setEventType = (eventType: 'list' | 'prediction') => {
    _setEventType(eventType);
    if (eventType !== 'list' && defaultEvent) {
      // TODO: When we do history, we should pass "year" as second arg to getDefaultEvent
      // because it will respect the current year if it's not passed
      // but right now, as we're hiding expired events, we don't want to do that
      const defaultEventRespectingYear = getDefaultEvent(events);
      setEvent(defaultEventRespectingYear ?? defaultEvent);
    }
    if (eventType === 'list') {
      // NO: make it correspond to the year if possible
      const defaultListEvent = events.find(
        (e) => e.eventType === 'list' && e.year === year,
      );
      if (defaultListEvent) {
        setEvent(defaultListEvent);
      }
    }
  };

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

  const eventsToSelectFrom = (
    eventType === 'list' ? eventTypeEvents : predictionTypeEvents
  ).filter((e) => {
    const winDateTime = e.winDateTime && new Date(e.winDateTime);
    const now = new Date();
    const winsHaveHappened = winDateTime && winDateTime < now;
    return !winsHaveHappened;
  });

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
    eventType,
    setEventType,
    allEvents: events,
    eventsToSelectFrom,
  };
};
