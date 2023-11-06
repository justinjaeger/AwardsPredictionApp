import React from 'react';
import { View } from 'react-native';
import AwardsBodyImage from '../components/AwardsBodyImage';
import { SubHeader } from '../components/Text';
import { AwardsBody } from '../types/api';
import ProfileImage from '../components/ProfileImage';

/**
 * Misc constants
 */

// https://developer.themoviedb.org/reference/configuration-details
/**
 * [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
  ]
 */
export const getTmdbImageUrl = (width: number) => {
  let ext = 'w780';
  if (width <= 92) {
    ext = 'w92';
  } else if (width <= 154) {
    ext = 'w154';
  } else if (width <= 185) {
    ext = 'w185';
  } else if (width <= 342) {
    ext = 'w342';
  } else if (width <= 500) {
    ext = 'w500';
  }
  // IF THIS IS TOO BIG:
  //   let ext = 'w500';
  //   if (width <= 154) {
  //     ext = 'w92';
  //   } else if (width <= 185) {
  //     ext = 'w154';
  //   } else if (width <= 342) {
  //     ext = 'w185';
  //   } else if (width <= 500) {
  //     ext = 'w342';
  //   }
  return `https://image.tmdb.org/t/p/${ext}`;
};

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

export const getHeaderTitleWithProfile = (
  title: string,
  userImage: string | undefined,
  onPressProfileImage: () => void,
) => {
  return () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ProfileImage
        imageSize={HEADER_HEIGHT}
        image={userImage}
        onPress={() => onPressProfileImage()}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <SubHeader>{title}</SubHeader>
    </View>
  );
};
