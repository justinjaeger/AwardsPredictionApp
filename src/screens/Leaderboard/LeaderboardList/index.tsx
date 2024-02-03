import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';
import { FlatList } from 'react-native';
import EventItem from '../../../components/EventItem';
import { EventModel, UserRole, WithId, iLeaderboard } from '../../../models';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { getLeaderboardTitle } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';

const LeaderboardList = () => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const events = useGetEventsWithLeaderboard();
  const { userRole: authUserRole } = useAuth();

  const leaderboards = events.reduce(
    (acc: (WithId<EventModel> & iLeaderboard)[], event) => {
      if (!event.leaderboards) return acc;
      for (const leaderboard of Object.values(event.leaderboards)) {
        const a = { ...event, ...leaderboard };
        if (leaderboard.isHidden && authUserRole !== UserRole.ADMIN) continue;
        acc.push(a);
      }
      return acc;
    },
    [],
  );

  return (
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
            title={getLeaderboardTitle(leaderboard) + ' Leaderboard'}
            onPress={() => {
              navigation.navigate('Leaderboard', {
                eventId: leaderboard._id,
                phase: leaderboard.phase,
              });
            }}
            bottomRightText={leaderboard.numUsersPredicting.toString() + ' users'}
            style={{ marginTop: 10 }}
            mode="solid"
            icon="award-outline"
          />
        );
      }}
      keyExtractor={(item) => item._id + item.phase + item.noShorts.toString()}
      style={{ width: '100%' }}
    />
  );
};

export default LeaderboardList;
