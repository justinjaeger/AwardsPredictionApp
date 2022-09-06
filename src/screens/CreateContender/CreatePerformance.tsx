import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import TmdbServices from '../../services/tmdb';
import { iSearchData } from '../../services/tmdb/search';
import DS from '../../services/datastore';
import Snackbar from '../../components/Snackbar';
import { Body } from '../../components/Text';
import { CategoryType, Movie } from '../../models';
import { iCreateContenderProps } from '.';
import { IconButton } from '../../components/Buttons/IconButton';
import { View } from 'react-native';
import TmdbPersonCache from '../../services/cache/tmdbPerson';
import ContenderDetails from '../../components/ContenderDetails';

// TODO: should only be able to do this if logged in
const CreatePerformance = (props: iCreateContenderProps) => {
  const { category } = props;

  const navigation = useNavigation();

  const event = category.event;
  const minReleaseYear = event.year - 1;

  const [personSearchResults, setPersonSearchResults] = useState<iSearchData>([]);
  const [movieSearch, setMovieSearch] = useState<iSearchData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [personId, setPersonId] = useState<number | undefined>();
  const [movie, setMovie] = useState<Movie | undefined>();

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
      const { data: person } = await DS.getOrCreatePerson(tmdbId);
      if (person) {
        setPersonId(tmdbId);
        setPersonSearchResults([]);
        getPersonRecentMovies(tmdbId);
      }
    } catch (err) {
      console.error('error selecting search result', err);
    }
  };

  const removePerson = () => {
    setPersonId(undefined);
  };

  const onConfirmPerformance = async () => {
    if (!movie || !personId) return;
    setLoading(true);
    const { data: person } = await DS.getOrCreatePerson(personId);
    if (!person) return;
    await DS.getOrCreatePerformance(category, movie, person);
    setLoading(false);
    navigation.goBack();
    const p = await TmdbPersonCache.get(personId);
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
        const { data: _movie } = await DS.getOrCreateMovie(ms.tmdbId);
        setMovie(_movie);
      },
    };
  });

  return (
    <>
      {personId ? (
        <>
          <View style={{ position: 'absolute', right: 30, top: 10, zIndex: 2 }}>
            <IconButton iconProps={{ name: 'close-outline' }} onPress={removePerson} />
          </View>
          {movie ? (
            <>
              <ContenderDetails
                personTmdbId={personId}
                movie={movie}
                categoryType={CategoryType[category.type]}
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
                personTmdbId={personId}
                categoryType={CategoryType[category.type]}
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
              category.type === CategoryType.PERFORMANCE
                ? 'Search Actors'
                : 'Search Movies'
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
