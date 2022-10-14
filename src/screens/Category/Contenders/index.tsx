import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AwardsBody,
  CategoryName,
  CategoryType,
  EventType,
  GetCategoryQuery,
  ListContendersQuery,
} from '../../../API';
import ContenderList from '../../../components/List/ContenderList';
import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { getContenderRank } from '../../../util/getContenderRank';
import {
  useAsyncEffect,
  useSubscriptionEffect,
  useTypedNavigation,
} from '../../../util/hooks';
import { fullEventToString } from '../../../util/stringConversions';

// NOTE: Similar to ViewPredictions
const Contenders = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<GlobalParamList, 'Contenders'>>();
  const navigation = useTypedNavigation<GlobalParamList>();

  const [category, setCategory] = useState<GetCategoryQuery>();
  const [contenders, setContenders] = useState<ListContendersQuery>();

  // NOTE: later, we'll just have the category live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  // Set header title
  useLayoutEffect(() => {
    const c = category?.getCategory;
    if (!c) return;
    const e = c.event;
    navigation.setOptions({
      headerTitle: fullEventToString(
        AwardsBody[e.awardsBody],
        EventType[e.type],
        e.year,
        CategoryName[c.name],
      ),
    });
  }, [navigation, category]);

  useSubscriptionEffect(async () => {
    const c = category?.getCategory;
    if (!c) return;
    const { data } = await ApiServices.getContendersByCategory(c.id);
    setContenders(data);
  }, []);

  const onPressFilm = (contenderId: string) => {
    if (!category?.getCategory) return;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.getCategory?.type,
    });
  };

  const onPressPerformance = async (contenderId: string, personId: string) => {
    if (!category?.getCategory) return;
    const { data } = await ApiServices.getPerson(personId);
    if (!data?.getPerson) return;
    const personTmdb = data.getPerson.tmdbId;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.getCategory?.type,
      personTmdb,
    });
  };

  const onPressThumbnail = (contenderId: string, personId?: string) => {
    if (!category?.getCategory) return;
    const cType = CategoryType[category?.getCategory.type];
    if (cType === CategoryType.PERFORMANCE && personId) {
      onPressPerformance(contenderId, personId);
    } else {
      onPressFilm(contenderId);
    }
  };

  // TODO: better loading state
  if (!contenders?.listContenders || !category?.getCategory) return null;

  const orderedContenders = contenders.listContenders.items.sort((c1, c2) => {
    if (!c1 || !c2) return 0;
    const c1Rank = getContenderRank(
      c1.numberOfUsersPredictingWin,
      c1.numberOfUsersPredictingNom,
      c1.numberOfUsersPredictingUnranked,
    );
    const c2Rank = getContenderRank(
      c2.numberOfUsersPredictingWin,
      c2.numberOfUsersPredictingNom,
      c2.numberOfUsersPredictingUnranked,
    );
    if (c1Rank > c2Rank) return 1;
    return -1;
  });

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <ContenderList
        categoryId={category.getCategory.id}
        orderedContenderIds={orderedContenders.map((c) => c?.id || '')}
        onPressThumbnail={onPressThumbnail}
      />
    </ScrollView>
  );
};

export default Contenders;
