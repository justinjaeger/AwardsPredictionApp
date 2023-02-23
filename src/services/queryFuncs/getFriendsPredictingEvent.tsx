/* eslint-disable sonarjs/prefer-immediate-return */
import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

const getFriendsPredictingEvent = async (
  followingUserId: string | undefined,
  eventId: string | undefined,
): Promise<iUser[]> => {
  if (!followingUserId || !eventId) return [];
  const { data } = await ApiServices.getFriendsPredictingEvent(followingUserId, eventId);
  const relationships = data?.listRelationships?.items || [];
  const users = relationships
    .map((r) => r?.followedUser)
    .filter((user) => {
      // query returns one prediction set if user has any
      // we only want to return users who are predicting the event
      return (user?.predictionSets?.items?.length || 0) > 0;
    });

  // Sort by createdAt, so last users to update predictions come up first
  const usersSortedByCreatedAt = users.sort((a, b) => {
    const aCreatedAt = a?.predictionSets?.items?.[0]?.createdAt || '';
    const bCreatedAt = b?.predictionSets?.items?.[0]?.createdAt || '';
    return aCreatedAt > bCreatedAt ? -1 : 1;
  });

  // return
  const result: iUser[] = usersSortedByCreatedAt.map((u) => ({
    id: u?.id || '',
    email: u?.email || '',
    username: u?.username || undefined,
    name: u?.name || undefined,
    bio: u?.bio || undefined,
    image: u?.image || undefined,
    role: u?.role || UserRole.USER,
  }));
  return result;
};

export default getFriendsPredictingEvent;
