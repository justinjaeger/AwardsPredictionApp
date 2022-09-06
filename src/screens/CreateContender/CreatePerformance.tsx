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
import { CategoryType } from '../../models';
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
  const [credits, setCredits] = useState<iSearchData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [personId, setPersonId] = useState<number | undefined>();
  const [movieId, setMovieId] = useState<number | undefined>();

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      setPersonSearchResults([]);
      return;
    }
    TmdbServices.searchPeople(s).then((res) => {
      console.error('res', res);
      setMovieId(undefined);
      const r = res.data || [];
      setPersonSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const getPersonRecentMovies = async (tmdbId: number) => {
    const { data: credits } = await TmdbServices.getTmdbPersonMovieCredits(
      tmdbId,
      minReleaseYear,
    );
    if (credits) {
      setCredits(credits);
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

  const onSelectMovie = async (tmdbId: number) => {
    setMovieId(tmdbId);
  };

  const removePerson = () => {
    setPersonId(undefined);
  };

  const onConfirmPerformance = async () => {
    if (!movieId || !personId) return;
    setLoading(true);
    const { data: movie } = await DS.getOrCreateMovie(movieId);
    if (!movie) return;
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

  const creditsData = credits.map((c) => ({
    title: c.title,
    image: c.image,
    description: c.description,
    onPress: () => onSelectMovie(c.tmdbId),
  }));

  return (
    <>
      {personId ? (
        <>
          <View style={{ position: 'absolute', right: 30, top: 10, zIndex: 2 }}>
            <IconButton iconProps={{ name: 'close-outline' }} onPress={removePerson} />
          </View>
          {movieId ? (
            <>
              <ContenderDetails
                personTmdbId={personId}
                movieTmdbId={movieId}
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
