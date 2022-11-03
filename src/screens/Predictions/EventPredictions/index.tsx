import React from 'react';
import { ScrollView } from 'react-native';
import { CategoryName } from '../../../API';
import { TouchableText } from '../../../components/Buttons';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import PosterFromTmdbId from '../../../components/Images/PosterFromTmdbId';
import { useAuth } from '../../../store';
import { iCategory, iEvent, iPrediction } from '../../../store/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { Body } from '../../../components/Text';
import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../../../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../../../services/queryFuncs/getPersonalPredictionsByEvent';

const CategorySelect = (props: { tab: 'personal' | 'community' }) => {
  const { tab } = props;

  const { event: _event, setCategory } = useCategory();
  const { userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  if (!_event?.id) {
    console.error('NO EVENT IN useCategory');
  }
  const event = _event as iEvent; // FLAG because declaring

  const queryFn =
    tab === 'community'
      ? () => getCommunityPredictionsByEvent(event)
      : () => getPersonalPredictionsByEvent(event.id, userId || '');

  const { data: predictionData, isLoading } = useQuery({
    queryKey: ['getPredictions'],
    queryFn: queryFn,
  });

  if (isLoading) return null;
  if (!predictionData) return null;

  if (!userId) {
    return <Body>You miust sign in </Body>;
  }
  if (!event) return null;

  const onSelectCategory = async (category: iCategory) => {
    setCategory(category);
    navigation.navigate('Category');
  };

  const categoryList = Object.values(event.categories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    getAwardsBodyCategories(event.awardsBody, event.year),
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {orderedCategories.map((category) => {
        const catPredictions: iPrediction[] | undefined = predictionData[category.id];
        return (
          <>
            <TouchableText
              text={category.name}
              onPress={() => onSelectCategory(category)}
              style={{ margin: 10 }}
              key={category.id}
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
