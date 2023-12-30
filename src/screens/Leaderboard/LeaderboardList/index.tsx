import { useNavigation } from '@react-navigation/native';
import { LeaderboardNavigationProp } from '../../../navigation/types';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';

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

  return null;
};

export default LeaderboardList;
