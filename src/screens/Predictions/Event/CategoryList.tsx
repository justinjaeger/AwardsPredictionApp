import React, { useEffect } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryIsShortlisted, CategoryName, PredictionType } from '../../../API';
import MovieGrid from '../../../components/MovieGrid';
import { HeaderLight, SubHeader } from '../../../components/Text';
import { getAwardsBodyCategories, getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iIndexedPredictionsByCategory } from '../../../types';
import sortByObjectOrder from '../../../util/sortByObjectOrder';

type iCategoryListProps = {
  isCollapsed: boolean;
  onSelectCategory: (category: iCategory) => void;
  predictionData: iIndexedPredictionsByCategory | undefined;
  isAuthUserProfile?: boolean;
};

// Lists all categories inside an event
const CategoryList = (props: iCategoryListProps) => {
  const { isCollapsed, onSelectCategory, predictionData, isAuthUserProfile } = props;

  const { event: _event, eventCategories, date, reset } = useCategory();
  const isHistory = !!date;
  const event = _event as iEvent;

  // TODO:
  // If isPersonal and isHistory, need to get list of all nominated films
  // we could just do query for iIndexedPredictionsByCategory and get community predictions. let's just do that

  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categoryList = Object.values(eventCategories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  // reset category context when changing events
  useEffect(() => {
    reset();
  }, []);

  // filter out categories that are hidden until shortlisted
  const categoriesWithHidden = orderedCategories.filter((category) => {
    const cat = awardsBodyCategories[category.name];
    const hideUntilShortlisted = cat?.hideUntilShortlisted || false;
    // filter OUT (return false) if it's supposed to be hidden until shortlisted, AND category is not yet shortlisted
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (
      hideUntilShortlisted === true &&
      category.isShortlisted !== CategoryIsShortlisted.TRUE
    ) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <>
      {categoriesWithHidden.map((category) => {
        const catPredictions = predictionData?.[category.id]?.predictions || [];
        const predictions = catPredictions || [];
        const predictionType =
          predictions[0]?.predictionType || PredictionType.NOMINATION;
        // once nominations happen, you want "slots" to be however many films are nominated
        const slots = getCategorySlots(event, category.name, predictionType);
        const slotsToUse = slots !== 1 ? slots : 5; // slots is "1" when predictions have happened, so if predictions have happened, so for winner predictions let's just show top 5
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
                  marginBottom: isCollapsed ? 0 : 5,
                  marginTop: 5,
                }}
              >
                {awardsBodyCategories[category.name]?.name || ''}
              </SubHeader>
              {truncatedPredictions.length === 0 ? (
                <HeaderLight style={{ marginLeft: theme.windowMargin }}>
                  {isHistory || !isAuthUserProfile ? 'No Predictions' : 'Add Predictions'}
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

export default CategoryList;
