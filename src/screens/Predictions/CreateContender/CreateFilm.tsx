import React, { useEffect, useState } from 'react';
import SearchInput from '../../../components/Inputs/SearchInput';
import TmdbServices from '../../../services/tmdb';
import { iSearchData } from '../../../services/tmdb/search';
import { Body } from '../../../components/Text';
import { useWindowDimensions, View } from 'react-native';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import useMutationCreateContender from '../../../hooks/mutations/createContender';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { FAB } from '../../../components/Buttons/FAB';
import { CategoryType, ContenderVisibility } from '../../../API';
import { iCreateContenderProps } from '.';
import { CategoryHeader } from '../styles';
import HeaderButton from '../../../components/HeaderButton';

// TODO: should only be able to do this if logged in
const CreateFilm = (props: iCreateContenderProps) => {
  const { onSelectPrediction, onClose } = props;
  const { width } = useWindowDimensions();

  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete } = useMutationCreateContender();

  const { data: communityData } = useQueryCommunityEvent(event);
  const communityPredictions = communityData ? communityData[category.id] || [] : [];

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>();
  const [resetSearchHack, setResetSearchHack] = useState<boolean>(false);

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedTmdbId(undefined);
    setSearchMessage('');
    setSearchResults([]);
    setResetSearchHack(!resetSearchHack); // resets searchbar
  };

  const getPredictionFromTmdbId = (tmdbId: number) => {
    return communityPredictions.find((p) => p.contenderMovie?.tmdbId === tmdbId);
  };

  useEffect(() => {
    if (isComplete && selectedTmdbId) {
      const newPrediction = getPredictionFromTmdbId(selectedTmdbId);
      if (newPrediction) {
        onSelectPrediction(newPrediction);
        resetSearch();
      }
    }
  }, [isComplete]);

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    TmdbServices.searchMovies(s, minReleaseYear).then((res) => {
      setSelectedTmdbId(undefined);
      const r = res.data || [];
      setSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const onConfirmContender = async () => {
    if (!selectedTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = getPredictionFromTmdbId(selectedTmdbId);
    if (maybeAlreadyExistingPrediction) {
      // this film has already been added to community predictions
      onSelectPrediction(maybeAlreadyExistingPrediction);
      return;
    }
    await mutate({
      eventId: event.id,
      categoryId: category.id,
      movieTmdbId: selectedTmdbId,
    });
  };

  // these are sort of "fake" values
  const movieData: iPrediction[] = searchResults.map((m) => ({
    ranking: 0,
    visibility: ContenderVisibility.VISIBLE,
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
      studio: m.description,
    },
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving film...'} />
      <CategoryHeader>
        <SearchInput
          resetSearchHack={resetSearchHack}
          placeholder={'Search Movies'}
          handleSearch={(s: string) => handleSearch(s)}
          style={{ width: width * 0.8 }}
        />
        <View style={{ flexDirection: 'row' }}>
          <HeaderButton onPress={onClose} icon={'close'} />
        </View>
      </CategoryHeader>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
          {searchResults.length === 0 ? (
            <Body style={{ marginTop: 40, color: COLORS.white }}>{searchMessage}</Body>
          ) : null}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <MovieListSearch
              predictions={movieData}
              onSelect={(tmdbId) => {
                if (selectedTmdbId === tmdbId) {
                  setSelectedTmdbId(undefined);
                } else {
                  setSelectedTmdbId(tmdbId);
                }
              }}
              categoryType={CategoryType.FILM}
            />
          </View>
        </View>
        <FAB
          iconName="checkmark"
          text="Add"
          onPress={onConfirmContender}
          visible={selectedTmdbId !== undefined}
        />
      </View>
    </>
  );
};

export default CreateFilm;
