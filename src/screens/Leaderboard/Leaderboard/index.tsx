import { RouteProp, useRoute } from '@react-navigation/native';
import { LeaderboardParamList } from '../../../navigation/types';

/**
 * First, we need a screen with Leaderboard Selection
 */
const Leaderboard = () => {
  const {
    params: { eventId, phase },
  } = useRoute<RouteProp<LeaderboardParamList, 'Leaderboard'>>();

  return null;
};

export default Leaderboard;
