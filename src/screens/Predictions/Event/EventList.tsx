import React, { useEffect } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName, ContenderAccolade, PredictionType } from '../../../API';
import MovieGrid from '../../../components/MovieGrid';
import { HeaderLight, SubHeader } from '../../../components/Text';
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

  const { event: _event, date, reset } = useCategory();
  const isHistory = !!date;
  const event = _event as iEvent;

  // TODO:
  // If isPersonal and isHistory, need to get list of all nominated films
  // we could just do query for iIndexedPredictionsByCategory and get community predictions. let's just do that

  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categoryList = Object.values(event.categories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  // reset category context when changing events
  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      {orderedCategories.map((category) => {
        const catPredictions = predictionData?.[category.id]?.predictions || [];
        const predictions = catPredictions || [];
        const predictionType =
          predictions[0]?.predictionType || PredictionType.NOMINATION;
        // once nominations happen, you want "slots" to be however many films are nominated
        const slots = getCategorySlots(event, category.name, predictionType);
        // slots is "1" when predictions have happened, so if predictions have happened, we want to show all the nominees rather than the slots (in the case that Critics Choice nominates 11 films with 10 slots for ex)
        const slotsToUse =
          slots !== 1
            ? slots
            : predictions.reduce((acc, pred) => {
                if (
                  pred.accolade === ContenderAccolade.NOMINEE ||
                  pred.accolade === ContenderAccolade.WINNER
                ) {
                  acc += 1;
                }
                return acc;
              }, 0);
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
              {truncatedPredictions.length === 0 ? (
                <HeaderLight style={{ marginLeft: theme.windowMargin }}>
                  {isHistory ? 'No Predictions' : 'Add Predictions'}
                </HeaderLight>
              ) : null}
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
