import { RouteProp, useRoute } from '@react-navigation/native';
import { LeaderboardParamList } from '../../../navigation/types';

/**
 * TODO: MAKE SURE IT'S CAPTURING THE INDEX ON THE USER TABLE with the leaderboard
 * First, we need a screen with Leaderboard Selection
 */
const Leaderboard = () => {
  const {
    params: { eventId, phase },
  } = useRoute<RouteProp<LeaderboardParamList, 'Leaderboard'>>();

  return null;
};

export default Leaderboard;
