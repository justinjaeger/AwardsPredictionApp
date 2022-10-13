import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GetCategoryQuery, ListContendersQuery } from '../../../API';
import ContenderList from '../../../components/List/ContenderList';
import { EventType, AwardsBody, CategoryType, CategoryName } from '../../../models';
import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import {
  useAsyncEffect,
  useSubscriptionEffect,
  useTypedNavigation,
} from '../../../util/hooks';
import { fullEventToString } from '../../../util/stringConversions';

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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <ContenderList
        categoryId={category.getCategory.id}
        contenders={contenders}
        onPressThumbnail={onPressThumbnail}
      />
    </ScrollView>
  );
};

export default Contenders;
