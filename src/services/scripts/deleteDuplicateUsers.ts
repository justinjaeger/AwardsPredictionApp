import { Alert } from 'react-native';
import ApiServices from '../graphql';

const deleteDuplicateUsers = async () => {
  try {
    // First, get all user accounts
    const { data } = await ApiServices.getEveryUser();
    const users = data?.listUsers?.items;
    console.log('users', users?.length);
    const usersGroupedByEmail = (users || []).reduce(
      (acc: { [email: string]: string[] }, user) => {
        if (!user) return acc;
        const { email } = user;
        if (acc[email]) {
          acc[email].push(user.id);
        } else {
          acc[email] = [user.id];
        }
        return acc;
      },
      {},
    );
    // console.log('usersGroupedByEmail', usersGroupedByEmail);
    const groupsOfDuplicateAccountIds = Object.values(usersGroupedByEmail).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicateAccountIds', groupsOfDuplicateAccountIds.length);
    const idsToDelete: string[] = [];
    for (const idsSameEmail of groupsOfDuplicateAccountIds) {
      // console.log('idsSameEmail', idsSameEmail.length);
      const followerCountPerId: number[] = []; // if this is [0, 0] then go off of followingCountPerId
      const followingCountPerId: number[] = [];
      const combinedRelationshipCount: number[] = [];
      for (const id of idsSameEmail) {
        // request for followers and following count
        const { data } = await ApiServices.getFollowerCount(id);
        const followerCount = data?.searchRelationships?.total;
        followerCountPerId.push(followerCount || 0);
        //
        const { data: d } = await ApiServices.getFollowingCount(id);
        const followingCount = d?.searchRelationships?.total;
        followingCountPerId.push(followingCount || 0);
        //
        combinedRelationshipCount.push((followerCount || 0) + (followingCount || 0));
      }
      const maxCombined = Math.max(...combinedRelationshipCount);
      const indexToKeep = combinedRelationshipCount.indexOf(maxCombined);
      console.log(indexToKeep, followerCountPerId, followingCountPerId);
      // fill ids to delete
      const idsToDeleteForThisEmail = [];
      for (let i = 0; i < idsSameEmail.length; i++) {
        const id = idsSameEmail[i];
        if (i !== indexToKeep) {
          idsToDelete.push(id);
          idsToDeleteForThisEmail.push(id);
        }
      }
      console.log('idsToDeleteForThisEmail', idsToDeleteForThisEmail);
    }
    console.log('idsToDelete', idsToDelete.length);
    // return; // ONLY UNCOMMENT WHEN READY TO DELETE USERS
    Alert.alert(`Delete ${idsToDelete.length} users?`, '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'DELETE',
        onPress: async () => {
          for (const idToDelete of idsToDelete) {
            await ApiServices.permanentlyDeleteUser(idToDelete);
          }
        },
      },
    ]);

    // listOfDuplications.forEach(())
    // then, group them by email
    // with groups that have more than one email, determine which account should be removed:
    /// get the FOLLOWERS count of each account
    /// mark the one that has the MOST followers
    /// CAUTION: Last step should only be undertaken once; once marked, console log all those that are marked to make sure it makes sense
    /// DELETE the ones with the LEAST followers. If they're all the same, like all zero, delete all but one
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicateUsers;
