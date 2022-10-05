import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import ContenderList from '../../../components/List/ContenderList';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { CategoryType, Contender } from '../../../models';
import { GlobalParamList } from '../../../navigation/types';
import DS from '../../../services/datastore';
import { useSubscriptionEffect } from '../../../util/hooks';
import { eventToString } from '../../../util/stringConversions';

// TODO: no list order yet. eventually have to define something
const Contenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<GlobalParamList, 'Contenders'>>();
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
    // TODO: order contenders in display
    // const orderedContenders = _contenders.sort((c1,c2)=>{
    //     if (c1.)
    // })
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

  const onPressThumbnail = (() => {
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
        onPressThumbnail={onPressThumbnail}
      />
    </ScrollView>
  );
};

export default Contenders;
