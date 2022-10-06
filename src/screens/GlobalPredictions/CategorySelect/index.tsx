import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { Category, CategoryName } from '../../../models';
import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

const CategorySelect = () => {
  const {
    params: { event },
  } = useRoute<RouteProp<GlobalParamList, 'CategorySelect'>>();
  const navigation = useNavigation();

  const [categories, setCategories] = useState<Category[]>([]);

  // Set header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: eventToString(event),
    });
  }, [navigation, event]);

  useAsyncEffect(async () => {
    const { data: cs } = await ApiServices.getCategoriesByEvent(event.id);
    if (cs) {
      setCategories(cs);
    }
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
            key={c.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default CategorySelect;
