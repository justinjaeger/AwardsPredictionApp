import { useState } from 'react';
import { CategoryType, Contender, WithId, iPrediction } from '../../../models';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import useMutationCreateContender from '../../../hooks/mutations/useMutationCreateContender';
import Snackbar from '../../../components/Snackbar';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import { getSongKey } from '../../../util/getSongKey';
import { useRouteParams } from '../../../hooks/useRouteParams';

const useContenderSearch = ({
  categoryType,
  communityPredictions,
  selectedContenderIds,
  setSelectedPredictions,
}: {
  categoryType: CategoryType;
  communityPredictions: iPrediction[];
  selectedContenderIds: string[];
  setSelectedPredictions: React.Dispatch<React.SetStateAction<iPrediction[]>>;
}) => {
  const { category: _category, event: _event, categoryData } = useRouteParams();
  const category = _category!;
  const event = _event!;
  const { type } = categoryData!;

  // when adding a contender to the list of overall contenders
  const { mutate: getOrCreateContender, isComplete } = useMutationCreateContender({
    onSuccess: (newContender: WithId<Contender>) => {
      addItemToPredictions({
        contenderId: newContender._id,
        movieTmdbId: newContender.movieTmdbId,
        personTmdbId: newContender.personTmdbId,
        songId: newContender.songId,
        ranking: 0, // whatever
      });
      resetSearch();
    },
  });

  const [searchResults, setSearchResults] = useState<iSearchData[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedSearchTmdbId, setSelectedSearchTmdbId] = useState<number | undefined>();

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedSearchTmdbId(undefined);
    setSearchMessage('');
    setSearchResults([]);
  };

  const handleSearch = async (searchInput: string) => {
    setSearchMessage('');
    let Request =
      categoryType === CategoryType.PERFORMANCE
        ? TmdbServices.searchPeople(searchInput)
        : TmdbServices.searchMovies(searchInput, minReleaseYear);
    // number of digits in search (trying to identify an id)
    const digitCount = parseInt(searchInput, 10).toString().length;
    if ([5, 6, 7, 8].includes(digitCount)) {
      // search by id instead if they put in a 6 digit number
      Request = TmdbServices.searchMovieById(searchInput);
    }
    const res = await Request;
    setSelectedSearchTmdbId(undefined);
    const r = res.data || [];
    setSearchResults(r);
    if (r.length === 0) {
      setSearchMessage('No Results');
    }
  };

  const addItemToPredictions = (prediction: iPrediction) => {
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    if (isAlreadySelected) {
      // alert user that contender is already selected
      Snackbar.success(
        `This ${CATEGORY_TYPE_TO_STRING[
          type
        ].toLowerCase()} is already in your predictions`,
      );
    } else {
      Snackbar.success('Added to list');
      setSelectedPredictions((ps) => [...ps, prediction]);
    }
  };

  const onAddContender = async (
    movieTmdbId: number,
    personTmdbId?: number,
    songTitle?: string,
    songArtist?: string,
  ) => {
    const newSongId = songTitle && getSongKey(movieTmdbId, songTitle);
    // make sure selectedSearchTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction =
      categoryType === CategoryType.FILM
        ? communityPredictions.find((p) => p.movieTmdbId === movieTmdbId)
        : categoryType === CategoryType.PERFORMANCE
        ? communityPredictions.find(
            (p) => p.movieTmdbId === movieTmdbId && p.personTmdbId === personTmdbId,
          )
        : categoryType === CategoryType.SONG && newSongId
        ? communityPredictions.find((p) => p.songId === newSongId)
        : undefined;

    if (maybeAlreadyExistingPrediction) {
      // this film has already been added to community predictions
      addItemToPredictions(maybeAlreadyExistingPrediction);
      return;
    }
    // if it doesn't exist in our community list, get/create the contender in db
    await getOrCreateContender({
      eventId: event._id,
      eventYear: event.year,
      categoryName: category,
      movieTmdbId,
      personTmdbId,
      songTitle,
      songArtist,
    });
  };

  return {
    searchResults,
    searchMessage,
    isSavingFilm: !isComplete,
    selectedSearchTmdbId,
    setSelectedSearchTmdbId,
    onAddContender,
    handleSearch,
    resetSearch,
    addItemToPredictions,
  };
};

export default useContenderSearch;
