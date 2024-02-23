import React from 'react';
import { CategoryName, EventModel, WithId, iCategoryPrediction } from '../../../models';
import CategoryListItem from './CategoryListItem';
import DualTabsWrapper from '../../../components/DualTabsWrapper';

const CategoryItem = ({
  event,
  categoryName,
  tab1Prediction,
  tab2Prediction,
  onSelectCategory,
}: {
  event: WithId<EventModel>;
  categoryName: CategoryName;
  tab1Prediction: iCategoryPrediction;
  tab2Prediction: iCategoryPrediction;
  onSelectCategory: (isCommunityTab: boolean) => void;
}) => {
  return (
    <DualTabsWrapper
      tab1={
        <CategoryListItem
          key={categoryName + '1'}
          item={[categoryName, tab1Prediction]}
          onPress={() => onSelectCategory(false)}
          event={event}
        />
      }
      tab2={
        <CategoryListItem
          key={categoryName + '2'}
          item={[categoryName, tab2Prediction]}
          onPress={() => onSelectCategory(true)}
          event={event}
        />
      }
    />
  );
};

export default CategoryItem;
