import { useNavigation } from '@react-navigation/native';
import { LeaderboardNavigationProp } from '../../../navigation/types';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';

/**
 * First, we need a screen with Leaderboard Selection
 * So this will be a list of events where event.leaderboards contains a Phase
 * Then we list each event+phase combo
 * ALSO: make the "get" accessible from the BottomTabNavigator so we can determine whether to show the tab or not (in case it's empty)
 */
const LeaderboardList = () => {
  const navigation = useNavigation<LeaderboardNavigationProp>();
  const events = useGetEventsWithLeaderboard();

  return null;
};

export default LeaderboardList;
