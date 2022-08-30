import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import { CreateContenderParamList } from '../../navigation/types';
import TmdbServices from '../../services/tmdb';
import { iSearchMoviesData } from '../../services/tmdb/search';
import DS from '../../services/datastore';
import Snackbar from '../../components/Snackbar';

const MAX_CHAR_COUNT = 100;

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<CreateContenderParamList, 'CreateContender'>>();
  const navigation = useNavigation();

  const event = category.event;
  const minYearToSearchFor = event.year - 1;

  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<iSearchMoviesData>([]);

  const onSubmitSearch = () => {
    TmdbServices.searchMovies(search, minYearToSearchFor).then((res) => {
      setResults(res.data || []);
    });
  };

  const onSelectSearchResult = async (tmdbId: number) => {
    try {
      const tmdbIdString = tmdbId.toString();
      const { data: movie } = await DS.getOrCreateMovie(tmdbIdString);
      if (movie) {
        const { data: contender } = await DS.peekContender(category, movie);
        if (contender) {
          Snackbar.error('This movie has already been added');
          return;
        }
      }
      navigation.navigate('ConfirmContender', { tmdbId, category });
    } catch (err) {
      console.error('err', err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      <SearchInput
        label={'Search Movies'}
        search={search}
        setSearch={setSearch}
        style={{ width: '80%' }}
      />
      <SubmitButton text={'Search'} onPress={onSubmitSearch} />
      <SearchResultsList
        data={results.map((r) => ({
          title: r.title,
          description:
            r.plot.length > MAX_CHAR_COUNT
              ? r.plot.slice(0, MAX_CHAR_COUNT) + '...'
              : r.plot,
          onPress: () => onSelectSearchResult(r.tmdbId),
        }))}
      />
    </ScrollView>
  );
};

export default CreateContender;
