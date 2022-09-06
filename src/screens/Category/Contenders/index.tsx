import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import ContenderList from '../../../components/List/ContenderList';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { Category, CategoryType, Contender } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import DS from '../../../services/datastore';
import { useSubscriptionEffect } from '../../../util/hooks';
import { eventToString } from '../../../util/stringConversions';

export type iContendersProps = { category: Category; contenders: Contender[] };

// TODO: no list order yet. eventually have to define something
const Contenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<HomeParamList, 'Contenders'>>();
  const navigation = useNavigation();

  const [contenders, setContenders] = useState<Contender[]>([]);

  // Set header title
  useLayoutEffect(() => {
    const categoryList = getAwardsBodyCategories(category.event);
    navigation.setOptions({
      headerTitle:
        'Best' +
        ' ' +
        categoryList[category.name]?.name +
        ' ' +
        eventToString(category.event),
    });
  }, [navigation, category.name, category.event]);

  useSubscriptionEffect(async () => {
    const _contenders = (await DataStore.query(Contender)).filter(
      (c) => c.category?.id === category.id,
    );
    setContenders(_contenders);
  }, []);

  const onPressFilm = async (contender: Contender) => {
    navigation.navigate('ContenderDetails', {
      contender,
      categoryType: category.type,
    });
  };

  const onPressPerformance = async (contender: Contender) => {
    let personTmdb;
    if (contender.contenderPersonId) {
      const { data: p } = await DS.getPersonById(contender.contenderPersonId);
      if (p) {
        personTmdb = p.tmdbId;
      }
    }
    navigation.navigate('ContenderDetails', {
      contender,
      categoryType: category.type,
      personTmdb,
    });
  };

  const onPressItem = (() => {
    switch (CategoryType[category.type]) {
      case CategoryType.FILM:
      case CategoryType.SONG:
        return onPressFilm;
      case CategoryType.PERFORMANCE:
        return onPressPerformance;
    }
  })();

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <ContenderList
        category={category}
        contenders={contenders}
        onPressItem={onPressItem}
      />
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
