/* eslint-disable sonarjs/no-duplicate-string */
import React, { memo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import { getTotalNumPredicting } from '../../../util/getNumPredicting';
import { Body, SubHeader } from '../../Text';
import { hexToRgb } from '../../../util/hexToRgb';
import { CategoryType, iPrediction, Phase } from '../../../models';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../../util/categoryNameToTmdbCredit';
import ListItemSkeleton from '../../Skeletons/ListItemSkeleton';
import theme from '../../../constants/theme';
import Histogram from '../../Histogram';
import PosterFromTmdb from '../../Images/PosterFromTmdb';
import CustomIcon from '../../CustomIcon';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getSlotsInPhase } from '../../../util/getSlotsInPhase';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export const getContenderListItemHeight = (windowWidth: number) => {
  const { height: posterHeight } = getPosterDimensionsByWidth(
    windowWidth / 9 - theme.posterMargin * 2,
  );
  return posterHeight + theme.posterMargin * 2;
};

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
  riskiness?: number;
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
  displayNoExtraSlots?: boolean;
  accolade?: Phase;
  isUnaccaloded?: boolean;
  itemRef?: React.LegacyRef<View>;
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
  riskiness,
  accolade,
  isUnaccaloded,
  displayNoExtraSlots, // for showing histogram
  onPressItem,
  onPressThumbnail,
  onLongPress,
  itemRef,
}: iContenderListItemProps) => {
  const { isActive } = draggable || {};
  const { width: windowWidth } = useWindowDimensions();

  const {
    event,
    phase,
    category: _category,
    categoryData,
    isLeaderboard,
  } = useRouteParams();
  const category = _category!;
  const { type } = categoryData!;
  const slots = getSlotsInPhase(phase, categoryData, true);
  const isList = event?.eventType === 'list';

  const { width: posterWidth, height: posterHeight } = getPosterDimensionsByWidth(
    windowWidth / 9 - theme.posterMargin * 2,
  );

  // note: numPredicting is only commnuity
  const { numPredicting: numPredictingIfIsCommunity } = prediction;

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
  const totalNumPredicting = getTotalNumPredicting(numPredictingIfIsCommunity || {});

  const thumbnailContainerWidth = posterWidth * 1.5;
  const rightIconContainerWidth = iconRightProps ? posterHeight - 10 : 0;

  const accoladeMatchesPhase = phase === accolade;
  const accoladeToShow = accoladeMatchesPhase ? accolade : undefined;

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
          : accoladeToShow
          ? 'rgba(255,255,255,0.03)'
          : isUnaccaloded
          ? 'rgba(0,0,0,0.5)'
          : COLORS.primaryDark,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderTopColor: hexToRgb(COLORS.primaryLight, 0.5),
        borderTopWidth: 1,
        padding: theme.posterMargin,
        height: getContenderListItemHeight(windowWidth),
      }}
      ref={itemRef}
    >
      <TouchableOpacity
        style={{
          width: thumbnailContainerWidth,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
        onPress={() => {
          if (onPressThumbnail) {
            onPressThumbnail();
          } else {
            onPressItem();
          }
        }}
        onLongPress={() => {
          if (onPressThumbnail) {
            onPressThumbnail();
          } else if (onLongPress) {
            onLongPress();
          } else {
            onPressItem();
          }
        }}
      >
        <PosterFromTmdb
          movie={movie}
          person={person}
          posterDimensions={{
            width: posterWidth,
            height: posterHeight,
          }}
          ranking={ranking}
          accolade={isLeaderboard ? accoladeToShow : undefined}
          isUnaccoladed={isUnaccaloded}
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
              flexDirection: 'column',
              height: '100%',
              paddingLeft: 5,
              zIndex: 2,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
              }}
            >
              <SubHeader
                style={{
                  shadowColor: 'black',
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  color: isUnaccaloded ? 'rgba(255,255,255,0.5)' : COLORS.white,
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
                    color: isUnaccaloded ? 'rgba(255,255,255,0.5)' : COLORS.white,
                  }}
                >
                  {` • ${subtitle}`}
                </Body>
              ) : null}
              <View />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              {riskiness ? (
                <Body
                  style={{
                    fontWeight: '700',
                    width: '100%',
                    textAlign: 'right',
                    marginBottom: 5,
                    paddingRight: theme.windowMargin,
                  }}
                >{`${riskiness.toString()}pts`}</Body>
              ) : null}
            </View>
          </View>
          {numPredictingIfIsCommunity &&
          totalNumPredictingTop !== undefined &&
          showHistogram ? (
            <Histogram
              numPredicting={numPredictingIfIsCommunity}
              totalNumPredicting={totalNumPredicting}
              totalNumPredictingTop={totalNumPredictingTop}
              slots={slots}
              totalWidth={windowWidth - thumbnailContainerWidth - rightIconContainerWidth}
              posterHeight={posterHeight}
              displayNoExtraSlots={isList || displayNoExtraSlots}
            />
          ) : null}
        </>
      </TouchableHighlight>
      {iconRightProps ? (
        <TouchableHighlight
          style={{
            height: posterHeight,
            width: rightIconContainerWidth,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            paddingRight: 5,
            paddingLeft: 5,
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
