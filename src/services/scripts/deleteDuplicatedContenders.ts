import { Alert } from 'react-native';
import ApiServices from '../graphql';

const getUniqueContenderId = (
  categoryId: string,
  movieId: string,
  personId?: string | undefined,
  songId?: string | undefined,
): string => {
  return categoryId + movieId + (personId || '') + (songId || '');
};

// NOT COMPLETE!
const deleteDuplicatedContenders = async () => {
  try {
    // First, get all user accounts
    // const contenders = [];
    // let nextToken;
    // while (nextToken !== null) {
    //   console.log('fetching contenders', contenders.length);
    //   const { data } = await ApiServices.listEveryContenderPaginated(nextToken);
    //   contenders.push(...(data?.listContenders?.items || []));
    //   nextToken = data?.listContenders?.nextToken;
    // }
    const res = await ApiServices.listEveryContender();
    const contenders = res?.data?.listContenders?.items || [];
    console.log('contenders', contenders?.length);

    const groupedContenders = (contenders || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        contender,
      ) => {
        if (!contender) return acc;
        const key = getUniqueContenderId(
          contender.categoryId,
          contender.movieId,
          contender.personId || undefined,
          contender.songId || undefined,
        );
        if (!acc[key]) {
          acc[key] = [contender.id];
        } else {
          acc[key].push(contender.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicateContenderIds = Object.values(groupedContenders).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicateContenderIds', groupsOfDuplicateContenderIds.length);

    const contenderIdsToDelete: string[] = [];
    for (const groupOfIds of groupsOfDuplicateContenderIds) {
      // iterate through each group, but skip the first one -- we'll keep that one, delete the rest
      for (let i = 1; i < groupOfIds.length; i++) {
        const rId = groupOfIds[i];
        contenderIdsToDelete.push(rId);
      }
    }
    console.log('contenderIdsToDelete', contenderIdsToDelete.length);

    // return; // ONLY UNCOMMENT WHEN READY TO DELETE USERS
    Alert.alert(`Delete ${contenderIdsToDelete.length} contenders?`, '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'DELETE',
        onPress: async () => {
          //   for (const idToDelete of relationshipIdsToDelete) {
          //     await ApiServices.deleteRelationshipById(idToDelete);
          //   }
          console.log('done!');
        },
      },
    ]);
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedContenders;
