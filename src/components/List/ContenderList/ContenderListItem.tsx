/* eslint-disable sonarjs/no-duplicate-string */
import React, { memo } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import { useEvent } from '../../../context/EventContext';
import { getTotalNumPredicting } from '../../../util/getNumPredicting';
import { Body, SubHeader } from '../../Text';
import { hexToRgb } from '../../../util/hexToRgb';
import { CategoryType, iPrediction } from '../../../types/api';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../../util/categoryNameToTmdbCredit';
import ListItemSkeleton from '../../Skeletons/ListItemSkeleton';
import theme from '../../../constants/theme';
import Histogram from '../../Histogram';
import PosterFromTmdb from '../../Images/PosterFromTmdb';
import CustomIcon from '../../CustomIcon';

export type iContenderListItemProps = {
  prediction: iPrediction;
  categoryType: CategoryType;
  ranking?: number;
  disabled?: boolean;
  highlighted?: boolean;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  subtitle?: string;
  onPressItem: () => void;
  onPressThumbnail?: () => void;
  onLongPress?: () => void;
  totalNumPredictingTop?: number; // important when rendering histogram
  iconRightProps?: {
    iconName: string;
    onPress: () => void;
    enableOnPressIn?: boolean;
    backgroundColor?: string;
    iconColor?: string;
    iconSize?: number;
    underlayColor?: string;
  };
  showHistogram?: boolean;
};

const ContenderListItem = ({
  prediction,
  ranking,
  draggable,
  highlighted,
  categoryType,
  subtitle: _subtitle,
  totalNumPredictingTop,
  iconRightProps,
  showHistogram,
  onPressItem,
  onPressThumbnail,
  onLongPress,
}: iContenderListItemProps) => {
  const { isActive } = draggable || {};
  const { width: windowWidth } = useWindowDimensions();

  const SMALL_POSTER = windowWidth / 10;

  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;
  const { slots: _slots, type } = event.categories[category];
  const slots = _slots || 5;

  const { width: posterWidth, height: posterHeight } =
    getPosterDimensionsByWidth(SMALL_POSTER);

  // note: numPredicting is only commnuity
  const { numPredicting } = prediction;

  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { movie, person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  const dataHasNotLoaded = !movie && !person && !song;

  const categoryInfo = movie?.categoryCredits
    ? categoryNameToTmdbCredit(category, movie?.categoryCredits)
    : undefined;

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = movie?.title || '';
      subtitle = categoryInfo ? categoryInfo.join(',') : movie?.studio ?? '';
      break;
    case CategoryType.PERFORMANCE:
      if (!person) break;
      title = person?.name || '';
      subtitle = movie?.title || '';
      break;
    case CategoryType.SONG:
      title = song?.title || '';
      subtitle = movie?.title || '';
      break;
  }

  // The bar should be at 100% if everybody is predicting a nomination.
  // So like, every bar is out of 100% of all users
  const totalNumPredicting = getTotalNumPredicting(numPredicting || {});

  const thumbnailContainerWidth = posterWidth * 1.5;
  const rightIconContainerWidth = iconRightProps ? posterHeight + 10 : 0;

  if (dataHasNotLoaded) {
    return (
      <View style={{ marginLeft: theme.windowMargin / 2 }}>
        <ListItemSkeleton posterWidth={posterWidth} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: isActive
          ? COLORS.secondaryDark
          : highlighted
          ? hexToRgb(COLORS.secondaryLight, 0.15)
          : 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 3,
        paddingTop: 3,
      }}
    >
      <TouchableOpacity
        style={{
          width: thumbnailContainerWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (onPressThumbnail) {
            onPressThumbnail();
          } else {
            onPressItem();
          }
        }}
      >
        <PosterFromTmdb
          movie={movie}
          person={person}
          width={posterWidth}
          ranking={ranking}
        />
      </TouchableOpacity>
      <TouchableHighlight
        style={{
          flexDirection: 'row',
          width: windowWidth - thumbnailContainerWidth - rightIconContainerWidth,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          height: '100%',
        }}
        onPress={() => onPressItem()}
        underlayColor={COLORS.secondaryDark}
        onLongPress={onLongPress}
        disabled={isActive}
      >
        <>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'baseline',
              paddingLeft: 5,
              zIndex: 2,
              width: '100%',
            }}
          >
            <SubHeader
              style={{
                shadowColor: 'black',
                shadowOpacity: 1,
                shadowRadius: 5,
              }}
            >
              {title}
            </SubHeader>
            {type !== CategoryType.FILM ? (
              <Body
                style={{
                  shadowColor: 'black',
                  shadowOpacity: 1,
                  shadowRadius: 5,
                }}
              >
                {` • ${subtitle}`}
              </Body>
            ) : null}
          </View>
          {numPredicting && totalNumPredictingTop !== undefined && showHistogram ? (
            <Histogram
              numPredicting={numPredicting}
              totalNumPredicting={totalNumPredicting}
              totalNumPredictingTop={totalNumPredictingTop}
              slots={slots}
              totalWidth={windowWidth - thumbnailContainerWidth - rightIconContainerWidth}
              posterHeight={posterHeight}
            />
          ) : null}
        </>
      </TouchableHighlight>
      {iconRightProps ? (
        <TouchableHighlight
          style={{
            height: posterHeight,
            width: posterHeight + 10,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          underlayColor={iconRightProps.underlayColor || 'transparent'}
          onPress={iconRightProps.onPress}
          onPressIn={iconRightProps.enableOnPressIn ? iconRightProps.onPress : undefined}
        >
          <View
            style={{
              backgroundColor: iconRightProps.backgroundColor,
              justifyContent: 'center',
              borderRadius: theme.borderRadius,
              height: posterWidth,
              width: posterWidth,
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <CustomIcon
              name={iconRightProps.iconName}
              size={iconRightProps.iconSize || 24}
              color={iconRightProps.iconColor || COLORS.white}
              styles={{ borderRadius: 100 }}
            />
          </View>
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

export default memo(ContenderListItem);
