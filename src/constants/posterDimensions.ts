import { getNumPostersInRow } from '../util/getNumPostersInRow';
import theme from './theme';

export const POSTER_DIMENSIONS = {
  height: 40,
  width: 27,
};

export const getPosterDimensionsByHeight = (height: number) => ({
  height,
  width: height * (POSTER_DIMENSIONS.width / POSTER_DIMENSIONS.height),
});

export const getPosterDimensionsByWidth = (width: number) => ({
  height: width * (POSTER_DIMENSIONS.height / POSTER_DIMENSIONS.width),
  width,
});

/**
 * Useful for displaying posters in a grid.
 */
export const getPosterDimensionsGrid = (screenWidth: number, slots: number) => {
  const marginsTotal = theme.windowMargin * 2;
  const postersInRow = getNumPostersInRow(slots);
  const posterMarginsTotal = theme.posterMargin * 2 * (postersInRow - 1);

  const totalWidth = (screenWidth - marginsTotal - posterMarginsTotal) / postersInRow;

  const posterDimensions = getPosterDimensionsByWidth(totalWidth);

  return posterDimensions;
};

export const getPosterContainerDimensionsGrid = (screenWidth: number, slots: number) => {
  const { height } = getPosterDimensionsGrid(screenWidth, slots);
  return height + theme.posterMargin * 2;
};

export enum PosterSize {
  XSMALL = 40,
  SMALL = 45,
  MEDIUM = 80,
  LARGE = 240,
}
