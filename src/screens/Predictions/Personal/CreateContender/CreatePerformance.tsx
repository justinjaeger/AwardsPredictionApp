import React, { useState } from 'react';
import { SubmitButton } from '../../../../components/Buttons';
import SearchInput from '../../../../components/Inputs/SearchInput';
import SearchResultsList from '../../../../components/List/SearchResultsList';
import TmdbServices from '../../../../services/tmdb';
import { iSearchData } from '../../../../services/tmdb/search';
import Snackbar from '../../../../components/Snackbar';
import { Body } from '../../../../components/Text';
import { IconButton } from '../../../../components/Buttons/IconButton';
import { View } from 'react-native';
import TmdbPersonCache from '../../../../services/cache/tmdbPerson';
import ContenderDetails from '../../../../components/ContenderDetails';
import ApiServices from '../../../../services/graphql';
import { CategoryType, GetMovieQuery, GetPersonQuery } from '../../../../API';
import { useTypedNavigation } from '../../../../util/hooks';
import { CreateContenderParamList } from '../../../../navigation/types';
import { useCategory } from '../../../../context/CategoryContext';

// TODO: should only be able to do this if logged in
const CreatePerformance = () => {
  const { category } = useCategory();
  const navigation = useTypedNavigation<CreateContenderParamList>();

  const [personSearchResults, setPersonSearchResults] = useState<iSearchData>([]);
  const [movieSearch, setMovieSearch] = useState<iSearchData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [person, setPerson] = useState<GetPersonQuery>();
  const [movie, setMovie] = useState<GetMovieQuery>();

  const cat = category?.getCategory;
  if (!cat) return null;

  const minReleaseYear = cat.event.year - 1;

  const movieId = movie?.getMovie?.id;
  const movieStudio = movie?.getMovie?.studio;
  const movieTmdbId = movie?.getMovie?.tmdbId;
  const personTmdbId = person?.getPerson?.tmdbId;
  const personId = person?.getPerson?.id;

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      setPersonSearchResults([]);
      return;
    }
    TmdbServices.searchPeople(s).then((res) => {
      setMovie(undefined);
      const r = res.data || [];
      setPersonSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const getPersonRecentMovies = async (tmdbId: number) => {
    const { data: _searchData } = await TmdbServices.getTmdbPersonMovieCredits(
      tmdbId,
      minReleaseYear,
    );
    if (_searchData) {
      setMovieSearch(_searchData);
    }
  };

  const onSelectPerson = async (tmdbId: number) => {
    try {
      const { data: person } = await ApiServices.getOrCreatePerson(tmdbId);
      if (person?.getPerson) {
        setPerson(person);
        setPersonSearchResults([]);
        getPersonRecentMovies(tmdbId);
      }
    } catch (err) {
      console.error('error selecting search result', err);
    }
  };

  const removePerson = () => {
    setPerson(undefined);
  };

  const onConfirmPerformance = async () => {
    if (!movieId || !personId || !personTmdbId) return;
    setLoading(true);
    const { data: person } = await ApiServices.getOrCreatePerson(personTmdbId);
    if (!person) return;
    await ApiServices.getOrCreatePerformance({
      categoryId: cat.id,
      movieId,
      personId,
    });
    setLoading(false);
    navigation.goBack();
    const p = await TmdbPersonCache.get(personTmdbId);
    Snackbar.success(`Added ${p?.name || 'film'} to predictions`);
  };

  const peopleData = personSearchResults.map((p) => ({
    title: p.title,
    image: p.image,
    onPress: () => onSelectPerson(p.tmdbId),
  }));

  const creditsData = movieSearch.map((ms) => {
    return {
      title: ms.title,
      image: ms.image,
      description: ms.description,
      onPress: async () => {
        const { data: _movie } = await ApiServices.getOrCreateMovie(ms.tmdbId);
        setMovie(_movie);
      },
    };
  });

  return (
    <>
      {personTmdbId ? (
        <>
          <View style={{ position: 'absolute', right: 30, top: 10, zIndex: 2 }}>
            <IconButton iconProps={{ name: 'close-outline' }} onPress={removePerson} />
          </View>
          {movieTmdbId ? (
            <>
              <ContenderDetails
                personTmdbId={personTmdbId}
                movieTmdbId={movieTmdbId}
                movieStudio={movieStudio || undefined}
                categoryType={CategoryType[cat.type]}
              />
              <SubmitButton
                text={'Confirm'}
                onPress={onConfirmPerformance}
                loading={loading}
              />
            </>
          ) : (
            <>
              <ContenderDetails
                personTmdbId={personTmdbId}
                categoryType={CategoryType[cat.type]}
              />
              <Body>Which movie?</Body>
              <SearchResultsList data={creditsData} />
            </>
          )}
        </>
      ) : (
        <>
          <SearchInput
            placeholder={
              cat.type === CategoryType.PERFORMANCE ? 'Search Actors' : 'Search Movies'
            }
            handleSearch={(s: string) => handleSearch(s)}
            style={{ width: '80%' }}
          />
          {peopleData.length === 0 ? (
            <Body style={{ marginTop: 40 }}>{searchMessage}</Body>
          ) : (
            <SearchResultsList data={peopleData} />
          )}
        </>
      )}
    </>
  );
};

export default CreatePerformance;
