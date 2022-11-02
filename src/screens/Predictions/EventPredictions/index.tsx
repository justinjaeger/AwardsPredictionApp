import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import PosterFromTmdbId from '../../../components/Images/PosterFromTmdbId';
import { useAppDispatch, useAuth, usePredictions } from '../../../store';
import {
  iCategory,
  iIndexedPredictionsByCategory,
  iPrediction,
} from '../../../store/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { thunkGetPersonalPredictionsByEvent } from '../../../store/thunks/getPersonalPredictionsByEvent';
import { thunkGetGlobalPredictionsByEvent } from '../../../store/thunks/getGlobalPredictionsByEvent';
import { Body } from '../../../components/Text';

type iFormattedCategories = { catId: string; catName: CategoryName };

const CategorySelect = (props: { tab: 'personal' | 'community' }) => {
  const { tab } = props;

  const dispatch = useAppDispatch();
  const { eventId, setCategory } = useCategory();
  //   const { userId } = useAuth();
  const userId = '4228868b-5300-4791-ab73-769a81de34a1'; // TODO: this is just a workaround because auth is broken
  const { events, globalPredictions, personalPredictions } = usePredictions();
  const navigation = useTypedNavigation<PredictionsParamList>();

  //   const [eventPredictions, setEventPredictions] = useState<
  //     iIndexedPredictionsByCategory | undefined
  //   >();

  const predictionData = tab === 'personal' ? personalPredictions : globalPredictions;
  const pd: iIndexedPredictionsByCategory | undefined = eventId
    ? predictionData[eventId] || {}
    : {};

  // TODO: We want this to be available up front in the redux store, need to create a getAllPredictions thing instead of waiting for them to click on a category... maybe. if we just have to laod once, not so bad
  useEffect(() => {
    if (!eventId || !userId) return;
    const event = events[eventId];
    if (!pd) {
      console.error('fetching ', tab);
      if (tab === 'personal') {
        dispatch(thunkGetPersonalPredictionsByEvent(event, userId));
      } else {
        dispatch(thunkGetGlobalPredictionsByEvent(event));
      }
    }
  }, [pd]);

  if (!userId) {
    return <Body>You miust sign in </Body>;
  }

  //   const [categories, setCategories] = useState<ListCategoriesQuery>();

  //   useAsyncEffect(async () => {
  //     if (!eventId) return;
  //     const { data: cs } = await ApiServices.getCategoriesByEvent(eventId);
  //     if (cs) {
  //       setCategories(cs);
  //     }
  //   }, [eventId]);

  if (!eventId) return null;
  //   const predictionData = tab === 'personal' ? personalPredictions : globalPredictions;
  //   const pd: iIndexedPredictionsByCategory | undefined = predictionData[eventId];

  const event = events[eventId];

  // Set header title
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: eventToString(e.awardsBody, e.type, e.year),
  //     });
  //   }, [navigation, event]);

  const onSelectCategory = async (catId: string) => {
    await setCategory(catId);
    navigation.navigate('Category');
  };

  //   const categoryList = getAwardsBodyCategories(event.awardsBody, event.year);

  //   const cats = categories?.listCategories?.items || [];
  const categoryList = Object.values(event.categories);
  //   const formattedCats: iFormattedCategories[] = categoryList.map((c) => ({
  //     catId: c.id,
  //     catName: CategoryName[c.name],
  //   }));
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    getAwardsBodyCategories(event.awardsBody, event.year),
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  // now display the prediction data underneath the categories

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedCategories.map(({ id, name }) => {
        const catPredictions: iPrediction[] | undefined = pd[id];
        return (
          <>
            <TouchableText
              text={name}
              onPress={() => onSelectCategory(id)}
              style={{ margin: 10 }}
              key={id}
            />
            {catPredictions?.map((p) =>
              p.contenderMovie ? (
                <PosterFromTmdbId
                  movieTmdbId={p.contenderMovie.tmdbId}
                  personTmdbId={p?.contenderPerson?.tmdbId}
                />
              ) : null,
            )}
          </>
        );
      })}
    </ScrollView>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(
    () => <CategorySelect tab={'community'} />,
    () => <CategorySelect tab={'personal'} />,
  );
};

export default TabsWrapper;

// export default CategorySelect;
