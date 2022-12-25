import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName } from '../../../API';
import MovieGrid from '../../../components/MovieGrid';
import { SubHeader } from '../../../components/Text';
import { getAwardsBodyCategories, getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import {
  iCategory,
  iEvent,
  iIndexedPredictionsByCategory,
  iPrediction,
} from '../../../types';
import sortByObjectOrder from '../../../util/sortByObjectOrder';

type iEventListProps = {
  isCollapsed: boolean;
  onSelectCategory: (category: iCategory) => void;
  predictionData: iIndexedPredictionsByCategory | undefined;
};

const EventList = (props: iEventListProps) => {
  const { isCollapsed, onSelectCategory, predictionData } = props;

  const { event: _event } = useCategory();
  const event = _event as iEvent;

  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categoryList = Object.values(event.categories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  return (
    <>
      {orderedCategories.map((category) => {
        const catPredictions: iPrediction[] | undefined = (predictionData || {})[
          category.id
        ];
        const predictions = catPredictions || [];
        const slots = getCategorySlots(event.year, event.awardsBody, category.name);
        const truncatedPredictions = (predictions || [])?.slice(0, slots);
        return (
          <TouchableHighlight
            key={category.id}
            style={{
              width: '100%',
              alignItems: isCollapsed ? 'center' : 'flex-start',
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
                {awardsBodyCategories[category.name]?.name || ''}
              </SubHeader>
              {!isCollapsed ? (
                <MovieGrid predictions={truncatedPredictions} noLine />
              ) : null}
            </View>
          </TouchableHighlight>
        );
      })}
    </>
  );
};

export default EventList;
