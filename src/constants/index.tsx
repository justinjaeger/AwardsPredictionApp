import React from 'react';
import { SubHeader } from '../components/Text';
import COLORS from './colors';

/**
 * Misc constants
 */

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const BOTTOM_TAB_HEIGHT = 50;

export const getHeaderTitle = (title: string) => {
  return () => <SubHeader>{title}</SubHeader>;
};

export const headerStyle = {
  backgroundColor: COLORS.goldDark,
};
export const headerStyleTall = {
  ...headerStyle,
  height: 120,
};
export const headerTitleStyle = { color: COLORS.white };
export const headerSettings: any = {
  headerStyle,
  headerTitleStyle,
};

export const tallHeaderSettings: any = {
  headerStyle: headerStyleTall,
  headerTitleStyle,
};
