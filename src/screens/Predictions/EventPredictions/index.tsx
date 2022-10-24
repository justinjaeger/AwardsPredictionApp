import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryName, ListCategoriesQuery } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { PredictionsParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect, useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { eventToString } from '../../../util/stringConversions';
import { useCategory } from '../../../context/CategoryContext';
import { usePredictions } from '../../../context/PredictionContext';
import { Body } from '../../../components/Text';

type iFormattedCategories = { catId: string; catName: CategoryName };

const CategorySelect = () => {
  const { event, setCategory } = useCategory();
  const { predictionData } = usePredictions();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [categories, setCategories] = useState<ListCategoriesQuery>();

  const eventId = event?.getEvent?.id;

  useAsyncEffect(async () => {
    if (!eventId) return;
    const { data: cs } = await ApiServices.getCategoriesByEvent(eventId);
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

  const onSelectCategory = async (catId: string) => {
    await setCategory(catId);
    navigation.navigate('Category');
  };

  // TODO: better loading state
  if (!event?.getEvent) return null;

  const categoryList = getAwardsBodyCategories(
    event.getEvent.awardsBody,
    event.getEvent.year,
  );

  const cats = categories?.listCategories?.items || [];
  const formattedCats: iFormattedCategories[] = cats.map((c) => ({
    catId: c?.id || '',
    catName: c ? CategoryName[c.name] : CategoryName.PICTURE, // C should never actually be undefined
  }));
  const orderedCategories = sortByObjectOrder<CategoryName, iFormattedCategories>(
    categoryList,
    formattedCats,
    cats.map((cat) => (cat ? CategoryName[cat.name] : CategoryName.PICTURE)), // Should never actually default to CategoryName.PICTURE
  );

  // now display the prediction data underneath the categories

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedCategories.map(({ catId, catName }) => {
        const catData = categoryList[CategoryName[catName]] || undefined;
        return (
          <>
            <TouchableText
              text={catData?.name || ''}
              onPress={() => onSelectCategory(catId)}
              style={{ margin: 10 }}
              key={catId}
            />
            {predictionData[catId]?.map((p) => (
              <Body>{p.contenderId}</Body>
            ))}
          </>
        );
      })}
    </ScrollView>
  );
};

export default CategorySelect;
