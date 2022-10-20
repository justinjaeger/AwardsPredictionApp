import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AwardsBody,
  CategoryName,
  CategoryType,
  EventType,
  GetCategoryQuery,
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

type iSortedContenders = {
  points: number;
  contenderId: string;
}[];

// NOTE: Similar to ViewPredictions
const Contenders = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<GlobalParamList, 'Contenders'>>();
  const navigation = useTypedNavigation<GlobalParamList>();

  const [category, setCategory] = useState<GetCategoryQuery>();
  const [rankedContenders, setRankedContenders] = useState<iSortedContenders>([]);

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
    const cs = data?.listContenders?.items;
    if (!cs) return;
    const contendersWithRank: iSortedContenders = await Promise.all(
      cs.map(async (c) => {
        const nullResult = { points: 0, contenderId: '' }; // never going to actually happen
        if (!c?.id) return nullResult;
        const { data } = await ApiServices.getNumberPredicting(c.id);
        if (!data) return nullResult;
        const rank = getContenderRank(
          data?.predictingWin,
          data?.predictingNom,
          data?.predictingUnranked,
        );
        return {
          contenderId: c.id,
          points: rank,
        };
      }),
    );
    const sortedContenders = contendersWithRank.sort((c1, c2) => {
      if (!c1 || !c2) return 0;
      if (c1.points > c2.points) return -1;
      return 1;
    });
    setRankedContenders(sortedContenders);
  }, [category]);

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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <ContenderList
        categoryId={categoryId}
        orderedContenderIds={rankedContenders.map((c) => c?.contenderId || '')}
        onPressThumbnail={onPressThumbnail}
      />
    </ScrollView>
  );
};

export default Contenders;
