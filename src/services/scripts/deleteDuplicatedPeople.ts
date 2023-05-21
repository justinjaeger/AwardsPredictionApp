import ApiServices from '../graphql';
import alertHelper from './alertHelper';

const deleteDuplicatedPeople = async () => {
  try {
    // Get all contenders
    const allContenders: {
      id: string;
      movieId: string;
      personId: string | null;
    }[] = [];
    let nextToken;
    while (nextToken !== null) {
      console.log('fetching contenders', allContenders.length);
      const { data: contenderData } = await ApiServices.listEveryContenderPaginated(
        nextToken,
      );
      const list = contenderData?.listContenders?.items || [];
      const formattedList = list.map((c) => ({
        id: c!.id,
        movieId: c!.movieId,
        personId: c!.personId || null,
      }));
      allContenders.push(...formattedList);
      nextToken = contenderData?.listContenders?.nextToken;
    }
    console.log('allContenders', allContenders.length);

    // Get all people
    const peopleRes = await ApiServices.listEveryPerson();
    const allPeople = peopleRes?.data?.listPeople?.items || [];
    console.log('peopleRes', allPeople.length);

    // people grouped by tmdbId
    const groupedPeople = (allPeople || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        person,
      ) => {
        if (!person) return acc;
        const key = person.tmdbId;
        if (!acc[key]) {
          acc[key] = [person.id];
        } else {
          acc[key].push(person.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicatePersonIds = Object.values(groupedPeople).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicatePersonIds', groupsOfDuplicatePersonIds.length);

    const personBatches = groupsOfDuplicatePersonIds.map((ids) => ({
      toKeepId: ids[0],
      toDeleteIds: ids.slice(1),
    }));

    // const onePersonBatch = [personBatches[0]];
    // console.log('onePersonBatch', onePersonBatch);

    // used to filter for contenders that include a movie id
    const getContendersByPersonId = (pId: string) =>
      allContenders.filter((c) => c.personId === pId);

    alertHelper(
      `About to update people + contenders from ${personBatches.length} songs`,
      async () => {
        for (const batch of personBatches) {
          const { toKeepId, toDeleteIds } = batch;
          console.log('toKeepId', toKeepId);
          console.log('toDeleteIds', toDeleteIds);

          for (const idToDelete of toDeleteIds) {
            console.log('idToDelete:', idToDelete);
            const contendersThatUsePerson = getContendersByPersonId(idToDelete);
            console.log('contendersThatUsePerson', contendersThatUsePerson.length);
            // go through each contender that uses movie and replace it with the "keeper"
            for (const contender of contendersThatUsePerson) {
              const { id: contenderId } = contender;
              console.log(
                'updating this contender:',
                contenderId,
                'with this person:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateContenderPerson(contenderId, toKeepId);
              if (res1.status === 'error') throw new Error('updateContenderSong');
            }

            // VERY IMPORTANT: Deleting the movie comes LAST

            // Delete the movie
            console.log('deleting this person:', idToDelete);
            const res3 = await ApiServices.deletePersonById(idToDelete);
            if (res3.status === 'error') throw new Error('deleteSongById');
          }
        }
        console.log('done!');
      },
    );
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedPeople;
