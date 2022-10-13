import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GetEventQuery, ListCategoriesQuery } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { Category, CategoryName } from '../../../models';
import { GlobalParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect, useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';

const CategorySelect = () => {
  const {
    params: { eventId },
  } = useRoute<RouteProp<GlobalParamList, 'CategorySelect'>>();
  const navigation = useTypedNavigation<GlobalParamList>();

  const [event, setEvent] = useState<GetEventQuery>();
  const [categories, setCategories] = useState<ListCategoriesQuery>();

  useAsyncEffect(async () => {
    const { data: e } = await ApiServices.getEvent(eventId);
    if (!e?.getEvent) return;
    setEvent(e);
    const { data: cs } = await ApiServices.getCategoriesByEvent(e?.getEvent?.id);
    if (cs) {
      setCategories(cs);
    }
  }, [eventId]);

  // Set header title
  useLayoutEffect(() => {
    const e = event?.getEvent;
    if (!e) return;
    if (event?.getEvent) {
      navigation.setOptions({
        headerTitle: eventToString(e.awardsBody, e.type, e.year),
      });
    }
  }, [navigation, event]);

  const onSelectCategory = (categoryId: string) => {
    navigation.navigate('Contenders', { categoryId });
  };

  // TODO: better loading state
  if (!event?.getEvent) return null;

  const categoryList = getAwardsBodyCategories(
    event.getEvent.awardsBody,
    event.getEvent.year,
  );

  const cs = (categories?.listCategories?.items || []) as Category[];
  const orderedCategories = sortByObjectOrder<CategoryName, Category>(
    categoryList,
    cs,
    cs.map((c) => CategoryName[c.name]),
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
            onPress={() => onSelectCategory(c.id)}
            style={{ margin: 10 }}
            key={c.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default CategorySelect;
