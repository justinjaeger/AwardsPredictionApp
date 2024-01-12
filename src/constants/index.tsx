import React from 'react';
import { View } from 'react-native';
import { SubHeader } from '../components/Text';
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
  let ext = 'w154';
  if (width >= 500) {
    ext = 'w780';
  } else if (width >= 342) {
    ext = 'w500';
  } else if (width >= 120) {
    ext = 'w342';
  }
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

export const getTwoLineHeaderTitle = (title: string) => {
  return () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
