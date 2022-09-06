import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { Category, CategoryName } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { useAsyncEffect } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

const CategorySelect = () => {
  const {
    params: { event },
  } = useRoute<RouteProp<HomeParamList, 'CategorySelect'>>();
  const navigation = useNavigation();

  const [categories, setCategories] = useState<Category[]>([]);

  // Set header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: eventToString(event),
    });
  }, [navigation, event]);

  useAsyncEffect(async () => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const _categories = (await DataStore.query(Category)).filter(
      (c) => c.event?.id === event.id,
    );
    setCategories(_categories);
  }, []);

  const onSelectCategory = (c: Category) => {
    navigation.navigate('Contenders', { category: c });
  };

  const categoryList = getAwardsBodyCategories(event);

  const orderedCategories = sortByObjectOrder<CategoryName, Category>(
    categoryList,
    categories,
    categories.map((c) => CategoryName[c.name]),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedCategories.map((c) => {
        const catData = categoryList[CategoryName[c.name]] || undefined;
        return (
          <TouchableText
            text={catData?.name || ''}
            onPress={() => onSelectCategory(c)}
            style={{ margin: 10 }}
          />
        );
      })}
    </ScrollView>
  );
};

export default CategorySelect;