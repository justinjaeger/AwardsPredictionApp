import React from 'react';
import { View } from 'react-native';
import { AwardsBody } from '../API';
import AwardsBodyImage from '../components/AwardsBodyImage';
import { SubHeader } from '../components/Text';
import COLORS from './colors';

/**
 * Misc constants
 */

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const TOP_TAB_HEIGHT = 50;
export const BOTTOM_TAB_HEIGHT = 50;
export const HEADER_HEIGHT = 40;

export const PAGINATED_USER_LIMIT = 20;

export const getHeaderTitle = (title: string) => {
  return () => <SubHeader>{title}</SubHeader>;
};

export const getHeaderTitleWithTrophy = (title: string, awardsBody: AwardsBody) => {
  return () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AwardsBodyImage awardsBody={awardsBody} white size={HEADER_HEIGHT} />
      <SubHeader>{title}</SubHeader>
    </View>
  );
};

export const headerStyle = {
  backgroundColor: COLORS.secondaryDark,
  height: 105,
};
export const headerTitleStyle = { color: COLORS.white };
export const headerSettings: any = {
  headerStyle,
  headerTitleStyle,
};
