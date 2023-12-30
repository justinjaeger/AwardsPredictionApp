import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LeaderboardNavigationProp } from '../../../navigation/types';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { FlatList } from 'react-native';
import EventItem from '../../../components/EventItem';
import { EventModel, WithId, iEventLeaderboard } from '../../../types/api';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { getLeaderboardTitle } from '../../../constants';

/**
 * First, we need a screen with Leaderboard Selection
 * So this will be a list of events where event.leaderboards contains a Phase
 * Then we list each event+phase combo
 *
 * What info do we want about a leaderboard, besides the users and their scores?
 * We want the number of users who predicted in that leaderboard!
 * We should store this information on the event, also
 */
const LeaderboardList = () => {
  const navigation = useNavigation<LeaderboardNavigationProp>();
  const events = useGetEventsWithLeaderboard();

  const leaderboards = events.reduce(
    (acc: (WithId<EventModel> & iEventLeaderboard)[], event) => {
      if (!event.leaderboards) return acc;
      for (const leaderboard of Object.values(event.leaderboards)) {
        const a = { ...event, ...leaderboard };
        acc.push(a);
      }
      return acc;
    },
    [],
  );

  return (
    <BackgroundWrapper>
      <FlatList
        data={leaderboards}
        renderItem={({ item: leaderboard }) => {
          return (
            <EventItem
              subtitle={
                leaderboard.year +
                ' ' +
                AWARDS_BODY_TO_PLURAL_STRING[leaderboard.awardsBody]
              }
              title={getLeaderboardTitle(leaderboard)}
              onPress={() => {
                navigation.navigate('Leaderboard', {
                  eventId: leaderboard._id,
                  phase: leaderboard.phase,
                });
              }}
              bottomRightText={leaderboard.numPredicted.toString() + ' users'}
            />
          );
        }}
        keyExtractor={(item) => item._id + item.phase + item.noShorts.toString()}
      />
    </BackgroundWrapper>
  );
};

export default LeaderboardList;
