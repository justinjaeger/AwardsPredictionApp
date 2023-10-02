import React from 'react';
import { View } from 'react-native';
import AwardsBodyImage from '../components/AwardsBodyImage';
import { SubHeader } from '../components/Text';
import { AwardsBody } from '../types/api';

/**
 * Misc constants
 */

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const TOP_TAB_HEIGHT = 50;
export const BOTTOM_TAB_HEIGHT = 50;
export const HEADER_HEIGHT = 40;

export const PAGINATED_USER_LIMIT = 20;
export const PAGINATED_USER_RECOMMENDATION_LIMIT = 10;

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
