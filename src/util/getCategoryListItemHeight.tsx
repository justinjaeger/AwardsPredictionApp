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
  windowWidth,
}: {
  categoryName: CategoryName | undefined;
  event: EventModel | undefined;
  windowWidth: number;
}) => {
  // determine how many rows we're going to show (e.g. best picture is 2)

  const slots = !categoryName ? 5 : event?.categories[categoryName]?.slots ?? 5;
  const moviesInRow = getNumPostersInRow(slots);

  // if there are more slots than movies in row, it's going to have extra rows
  const totalRows = Math.ceil(slots / moviesInRow);

  const heightToAdd = totalRows * getPosterContainerDimensionsGrid(windowWidth, slots);
  return CATEGORY_TOP_AREA_HEIGHT + heightToAdd + CATEGORY_BOTTOM_AREA_HEIGHT;
};
