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
import { getTotalNumPredicting } from '../../../util/getNumPredicting';
import { Body, SubHeader } from '../../Text';
import { hexToRgb } from '../../../util/hexToRgb';
import { CategoryName, CategoryType, iPrediction, Phase } from '../../../types/api';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../../util/categoryNameToTmdbCredit';
import ListItemSkeleton from '../../Skeletons/ListItemSkeleton';
import theme from '../../../constants/theme';
import Histogram from '../../Histogram';
import PosterFromTmdb from '../../Images/PosterFromTmdb';
import CustomIcon from '../../CustomIcon';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getSlotsInPhase } from '../../../util/getSlotsInPhase';
import { getContenderRiskiness } from '../../../util/getContenderRiskiness';
import useQueryGetEventAccolades from '../../../hooks/queries/useQueryGetEventAccolades';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { formatDecimalAsPercentage } from '../../../util/formatPercentage';

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
  accolade?: Phase;
};

/**
 * TODO: Display Accolade
 * THEN TODO: Display riskiness, which is a function of:
 * - whatever the community predicted for that contender
 *
 * TODO: I think we should LIFT the points/riskiness calculation OUT OF HERE and put it in the overall list component
 * BECAUSE: First, we don't care about community rankings what the points are.
 * Second, we want the TOTAL NUM OF POINTS
 * Third, it's weird to do this big calculation inside of a single item
 */
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

  const SMALL_POSTER = windowWidth / 9;

  const {
    eventId,
    phase,
    yyyymmdd,
    category: _category,
    categoryData,
  } = useRouteParams();
  const category = _category!;
  const { type } = categoryData!;
  const slots = getSlotsInPhase(phase, categoryData);

  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);

  // TODO: Is this A LOT to put inside each contende rlist item, or does it not matter?
  // All this "riskiness" stuff
  // Also, because we're calculating it no matter what the props are!
  const { data: predictionSet } = useQueryGetCommunityPredictions({
    yyyymmdd,
  });
  const { predictions: communityPredictions, totalUsersPredicting } =
    predictionSet.categories[category as CategoryName];
  const numPredictingContender = (communityPredictions ?? []).find(
    (p) => p.contenderId === prediction.contenderId,
  )?.numPredicting;
  const riskiness = getContenderRiskiness(
    numPredictingContender,
    slots,
    totalUsersPredicting,
  );

  const { width: posterWidth, height: posterHeight } =
    getPosterDimensionsByWidth(SMALL_POSTER);

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

  if (dataHasNotLoaded) {
    return (
      <View style={{ marginLeft: theme.windowMargin / 2 }}>
        <ListItemSkeleton posterWidth={posterWidth} />
      </View>
    );
  }

  const showAccolades = !!yyyymmdd;
  const accolade = contenderIdsToPhase?.[prediction.contenderId];
  const userDidPredictWithinSlots = ranking && ranking <= slots;
  const userScoredPoints = !!(userDidPredictWithinSlots && accolade);

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
        height: posterHeight,
      }}
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
          width={posterWidth}
          ranking={ranking}
          accolade={showAccolades && accolade}
        />
      </TouchableOpacity>
      {userScoredPoints ? <Body>{riskiness.toString() + 'pts • '}</Body> : null}
      <Body>{formatDecimalAsPercentage(100 - riskiness) + '% predicting'}</Body>
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
