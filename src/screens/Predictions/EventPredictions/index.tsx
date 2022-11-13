import React, { useLayoutEffect } from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { CategoryName } from '../../../API';
import { getAwardsBodyCategories, getCategorySlots } from '../../../constants/categories';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction, QueryKeys } from '../../../store/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { Body, SubHeader } from '../../../components/Text';
import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../../../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../../../services/queryFuncs/getPersonalPredictionsByEvent';
import { useAuth } from '../../../context/UserContext';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import MovieList from '../../../components/MovieList';
import { eventToString } from '../../../util/stringConversions';

const EventPredictions = (props: { tab: 'personal' | 'community' }) => {
  const { tab } = props;

  const { event: _event, setCategory } = useCategory();
  const { userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const event = _event as iEvent;

  useLayoutEffect(() => {
    const headerTitle = eventToString(event.awardsBody, event.type, event.year);
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const { data: predictionData, isLoading } = useQuery({
    queryKey: [
      tab === 'community' ? QueryKeys.COMMUNITY_EVENT : QueryKeys.PERSONAL_EVENT,
    ],
    queryFn:
      tab === 'community'
        ? () => getCommunityPredictionsByEvent(event)
        : () => getPersonalPredictionsByEvent(event.id, userId || ''),
  });

  if (isLoading) return null;
  if (!predictionData) return null;
  if (!userId && tab === 'personal') {
    return <Body>You must sign in </Body>;
  }
  if (!event) return null;

  const onSelectCategory = async (category: iCategory) => {
    setCategory(category);
    navigation.navigate('Category');
  };

  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categoryList = Object.values(event.categories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.primary }}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 100,
      }}
    >
      {orderedCategories.map((category) => {
        const catPredictions: iPrediction[] | undefined = predictionData[category.id];
        const slots = getCategorySlots(event.year, event.awardsBody, category.name);
        const truncatedPredictions = (catPredictions || [])?.slice(0, slots);
        return (
          <TouchableHighlight
            key={category.id}
            style={{
              width: '100%',
              alignItems: 'flex-start',
            }}
            underlayColor={COLORS.secondaryDark}
            onPress={() => onSelectCategory(category)}
          >
            <View>
              <SubHeader
                style={{
                  color: COLORS.lightest,
                  marginLeft: theme.windowMargin,
                  marginBottom: theme.windowMargin,
                  marginTop: theme.windowMargin,
                }}
              >
                {awardsBodyCategories[CategoryName[category.name]]?.name || ''}
              </SubHeader>
              <MovieList predictions={truncatedPredictions} />
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(
    <EventPredictions tab={'community'} />,
    <EventPredictions tab={'personal'} />,
  );
};

export default TabsWrapper;
