import { RouteProp, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { Header } from '../../../components/Text';
import { AwardsBody, Category, CategoryName, Event } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { getCategoryList } from '../../../util/constants';

const CategorySelect = () => {
  const {
    params: { event },
  } = useRoute<RouteProp<HomeParamList, 'CategorySelect'>>();

  const [categories, setCategories] = useState<Category[]>([]);

  // CATEGORIES
  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(Category, (c) => {
      // BROKEN -- I cannot access eventId property on Category like I want to. Instead I just see event, which is a problem because I need to query by eventId
      return c.name('eq', 'hi');
    }).subscribe(({ items }) => {
      setCategories(items);
    });
    return () => sub.unsubscribe();
  }, [event]);

  const categoryList = getCategoryList(AwardsBody[event.awardsBody], event.year);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <Header>Events</Header>
      {categories.map((cat) => {
        const catName = categoryList.get(CategoryName[cat.name]) || '';
        return <TouchableText text={catName} onPress={() => {}} style={{ margin: 10 }} />;
      })}
    </ScrollView>
  );
};

export default CategorySelect;
