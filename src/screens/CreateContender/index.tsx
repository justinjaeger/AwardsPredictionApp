import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import { Body } from '../../components/Text';
import { HomeParamList } from '../../navigation/types';
import TMDBServices from '../../services/tmdb';
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<HomeParamList, 'CreateContender'>>();
  //   const navigation = useNavigation();

  const event = category.event;
  const minYearToSearchFor = event.year - 1;

  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<string>('');

  const onSubmitSearch = () => {
    const u =
      'https://api.themoviedb.org/3/search/movie/?query=everything&api_key=d9a96448d1a564273c49ec13f752084f';
    // axios(u).catch((err) => console.error('err', err, JSON.stringify(err)));
    fetch(u).catch((err) => console.error('err', err, JSON.stringify(err)));
    // TMDBServices.search(search, minYearToSearchFor).then((res) => {
    //   setResults(JSON.stringify(res));
    // });
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '100%' }}
    >
      <SearchInput
        label={'Search Movies'}
        search={search}
        setSearch={setSearch}
        style={{ width: '80%' }}
      />
      <SubmitButton text={'Search'} onPress={onSubmitSearch} />
      <Body>{results}</Body>
    </ScrollView>
  );
};

export default CreateContender;
