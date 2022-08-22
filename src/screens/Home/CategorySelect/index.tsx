import { RouteProp, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { Header } from '../../../components/Text';
import { AwardsBody, Category, CategoryName } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { getCategoryList } from '../../../util/constants';
import { useAsyncEffect } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';

const CategorySelect = () => {
  const {
    params: { event },
  } = useRoute<RouteProp<HomeParamList, 'CategorySelect'>>();

  const [categories, setCategories] = useState<Category[]>([]);

  useAsyncEffect(async () => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const categories = (await DataStore.query(Category)).filter(
      (c) => c.event?.id === event.id,
    );
    setCategories(categories);
  }, [event]);

  const categoryList = getCategoryList(AwardsBody[event.awardsBody], event.year);

  const orderedCategories = sortByObjectOrder<CategoryName, Category>(
    categoryList,
    categories,
    categories.map((c) => CategoryName[c.name]),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <Header>Categories</Header>
      {orderedCategories.map((cat) => {
        const catName = categoryList[CategoryName[cat.name]] || '';
        return <TouchableText text={catName} onPress={() => {}} style={{ margin: 10 }} />;
      })}
    </ScrollView>
  );
};

export default CategorySelect;
