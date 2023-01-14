import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName, ContenderAccolade } from '../../../API';
import MovieGrid from '../../../components/MovieGrid';
import { SubHeader } from '../../../components/Text';
import { getAwardsBodyCategories, getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iIndexedPredictionsByCategory } from '../../../types';
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
        const catPredictions = predictionData?.[category.id]?.predictions || [];
        const predictions = catPredictions || [];
        // once nominations happen, you want "slots" to be however many films are nominated. slots is undefined when noms have happened
        const slots = getCategorySlots(event, category.name);
        const slotsToUse =
          slots ||
          predictions.reduce((acc, pred) => {
            if (
              pred.accolade === ContenderAccolade.NOMINEE ||
              pred.accolade === ContenderAccolade.WINNER
            ) {
              acc += 1;
            }
            return acc;
          }, 0); // slots is undefined when
        const truncatedPredictions = predictions.slice(0, slotsToUse);
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
                  marginBottom: isCollapsed ? 0 : theme.windowMargin,
                  marginTop: isCollapsed ? 5 : theme.windowMargin,
                }}
              >
                {awardsBodyCategories[category.name]?.name || ''}
              </SubHeader>
              <MovieGrid
                predictions={truncatedPredictions}
                isCollapsed={isCollapsed}
                noLine
              />
            </View>
          </TouchableHighlight>
        );
      })}
    </>
  );
};

export default EventList;
