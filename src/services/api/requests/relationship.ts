import { Relationship, WithId } from '../../../models';
import api from '../api';

export const getRelationship = async (
  followingUserId: string,
  followedUserId: string,
) => {
  return await api.get<WithId<Relationship> | null>(
    `relationships/${followingUserId}/${followedUserId}`,
  );
};

// Creates relationships where auth user follows the passed-in user; returns relationship id
export const createRelationship = async (followedUserId: string) => {
  return await api.post<string, { followedUserId: string }>('relationships', {
    followedUserId,
  });
};

// Deletes relationship where auth user follows the passed-in user; returns deleted relationship
export const deleteRelationship = async (followedUserId: string) => {
  return await api.delete<WithId<Relationship> | null>(`relationships/${followedUserId}`);
};
