import { getPosterContainerDimensionsGrid } from '../constants/posterDimensions';
import { CategoryName, EventModel } from '../models';
import {
  CATEGORY_BOTTOM_AREA_HEIGHT,
  CATEGORY_TOP_AREA_HEIGHT,
} from '../screens/Predictions/Event/constants';
import { getNumPostersInRow } from './getNumPostersInRow';

export const getCategoryListItemHeight = ({
  categoryName,
  event,
  numUserPredictionsInCategory,
  windowWidth,
}: {
  categoryName: CategoryName;
  event: EventModel;
  numUserPredictionsInCategory: number;
  windowWidth: number;
}) => {
  // if no predictions,
  if (numUserPredictionsInCategory === 0) {
    return CATEGORY_TOP_AREA_HEIGHT;
  }

  // determine how many rows we're going to show (e.g. best picture is 2)
  const categoryData = event?.categories[categoryName];
  if (!categoryData) return 0;

  const slots = categoryData.slots ?? 5;
  const moviesInRow = getNumPostersInRow(slots);

  // if there are more slots than movies in row, it's going to have extra rows
  const totalRows = Math.ceil(slots / moviesInRow);

  const heightToAdd = totalRows * getPosterContainerDimensionsGrid(windowWidth, slots);
  return CATEGORY_TOP_AREA_HEIGHT + heightToAdd + CATEGORY_BOTTOM_AREA_HEIGHT;
};
