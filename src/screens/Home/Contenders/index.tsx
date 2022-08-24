import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { Contender } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { getCategoryList } from '../../../util/constants';
import { eventToString } from '../../../util/stringConversions';

const Contenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<HomeParamList, 'Contenders'>>();
  const navigation = useNavigation();

  const [contenders, setContenders] = useState<Contender[]>([]);

  // Set the header title
  useLayoutEffect(() => {
    const categoryList = getCategoryList(category.event);
    navigation.setOptions({
      headerTitle:
        'Best' + ' ' + categoryList[category.name] + ' ' + eventToString(category.event),
    });
  }, [navigation, category.name, category.event]);

  useEffect(() => {
    const sub = DataStore.observeQuery(Contender, (c) =>
      c.categoryId('eq', category.id),
    ).subscribe(({ items }) => {
      setContenders(items);
    });
    return () => sub.unsubscribe();
  }, [category]);

  const imdbIds = contenders.map((c) => c.movie?.imdbId);

  // TODO: Fetch data from imdbApi. Figure out a way to also cache that data so it refreshes/only fetches every 24 hours or so

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {imdbIds.map((imdbId) => {
        // TODO: this should display data fetched from the imdb api
        return (
          <TouchableText text={imdbId || ''} onPress={() => {}} style={{ margin: 10 }} />
        );
      })}
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender', { category });
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default Contenders;
