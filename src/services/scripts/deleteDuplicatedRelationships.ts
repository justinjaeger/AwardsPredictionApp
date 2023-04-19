import { Alert } from 'react-native';
import ApiServices from '../graphql';

const getUniqueRelationshipKey = (followingId: string, followedId: string): string => {
  return followingId + followedId;
};

const deleteDuplicatedRelationships = async () => {
  try {
    // First, get all user accounts
    const { data } = await ApiServices.listEveryRelationship();
    const relationships = data?.listRelationships?.items;
    console.log('relationships', relationships?.length);

    const groupedRelationships = (relationships || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        relationship,
      ) => {
        if (!relationship) return acc;
        const key = getUniqueRelationshipKey(
          relationship.followingUserId,
          relationship.followedUserId,
        );
        if (!acc[key]) {
          acc[key] = [relationship.id];
        } else {
          acc[key].push(relationship.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicateRelationshipIds = Object.values(groupedRelationships).filter(
      (ids) => ids.length > 1,
    );
    console.log(
      'groupsOfDuplicateRelationshipIds',
      groupsOfDuplicateRelationshipIds.length,
    );

    const relationshipIdsToDelete: string[] = [];
    for (const groupOfIds of groupsOfDuplicateRelationshipIds) {
      // iterate through each group, but skip the first one -- we'll keep that one, delete the rest
      for (let i = 1; i < groupOfIds.length; i++) {
        const rId = groupOfIds[i];
        relationshipIdsToDelete.push(rId);
      }
    }
    console.log('relationshipIdsToDelete', relationshipIdsToDelete.length);

    // return; // ONLY UNCOMMENT WHEN READY TO DELETE USERS
    Alert.alert(`Delete ${relationshipIdsToDelete.length} relationships?`, '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'DELETE',
        onPress: async () => {
          for (const idToDelete of relationshipIdsToDelete) {
            await ApiServices.deleteRelationshipById(idToDelete);
          }
          console.log('done!');
        },
      },
    ]);
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedRelationships;
