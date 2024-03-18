/* eslint-disable sonarjs/no-duplicate-string */
import React, { memo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { getPosterDimensionsByWidth } from '../../../constants/posterDimensions';
import { getNumPredicting, getTotalNumPredicting } from '../../../util/getNumPredicting';
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
import { formatPercentage } from '../../../util/formatPercentage';
import { yyyymmddToDate } from '../../../util/yyyymmddToDate';
import { getContenderMeetsAccolade } from '../../../util/getContenderMeetsAccolade';

const VERTICAL_MARGINS = 10;
const POSTER_SIZE_FACTOR = 7;
const LEFT_SECTION = 80;

export const getContenderListItemHeight = (windowWidth: number) => {
  const { height: posterHeight } = getPosterDimensionsByWidth(
    windowWidth / POSTER_SIZE_FACTOR,
  );
  return posterHeight + VERTICAL_MARGINS * 2;
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
  totalNumPredictingTop?: number;
  totalUsersPredicting?: number;
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

/**
 * TODO: Check this on all other lists
 * We also need to have it so if the phase is beyond Nomination, it only dispays the win stat
 */
const ContenderListItem = ({
  prediction,
  ranking,
  draggable,
  highlighted,
  categoryType,
  subtitle: _subtitle,
  totalNumPredictingTop,
  totalUsersPredicting,
  iconRightProps,
  showHistogram,
  riskiness,
  accolade: contenderAccolade,
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
    yyyymmdd,
  } = useRouteParams();
  const category = _category!;
  const slots = getSlotsInPhase(phase, categoryData, true);
  const isList = event?.eventType === 'list';

  const { width: posterWidth, height: posterHeight } = getPosterDimensionsByWidth(
    windowWidth / POSTER_SIZE_FACTOR,
  );

  // note: numPredicting is only commnuity
  const { numPredicting: numPredictingIfIsCommunity } = prediction;

  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { movie, person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  const dataHasNotLoaded = !movie && !person && !song;

  const categoryInfo = movie?.categoryCredits
    ? categoryNameToTmdbCredit(category, movie.categoryCredits)
    : undefined;

  let title = '';
  let subtitle = '';
  if (categoryType === CategoryType.FILM) {
    title = movie?.title || '';
    subtitle = categoryInfo ? categoryInfo.join(', ') : movie?.studio ?? '';
  } else if (categoryType === CategoryType.PERFORMANCE) {
    title = person?.name || '';
    subtitle = movie?.title || '';
  } else if (categoryType === CategoryType.SONG) {
    title = song?.title || '';
    subtitle = movie?.title || '';
  }

  // The bar should be at 100% if everybody is predicting a nomination.
  // So like, every bar is out of 100% of all users
  const totalNumPredicting = getTotalNumPredicting(numPredictingIfIsCommunity || {});

  const thumbnailContainerWidth = posterWidth * 1.5;
  const rightIconContainerWidth = iconRightProps ? posterHeight - 10 : 0;

  // true when it's not a leaderboard
  const contenderMeetsAccolade = isLeaderboard
    ? contenderAccolade && phase
      ? getContenderMeetsAccolade(phase, contenderAccolade)
      : false
    : true;
  const accoladeToShow = contenderMeetsAccolade ? contenderAccolade : undefined;

  if (dataHasNotLoaded) {
    return (
      <View style={{ marginLeft: theme.windowMargin / 2 }}>
        <ListItemSkeleton posterWidth={posterWidth} />
      </View>
    );
  }

  const { win, nom } = getNumPredicting(prediction?.numPredicting ?? {}, slots ?? 5);

  const isHistory = yyyymmdd && yyyymmddToDate(yyyymmdd) < new Date();
  const nominationsHavePassed = Boolean(
    isHistory && event?.nomDateTime && new Date(event.nomDateTime) < new Date(),
  );
  const onlyShowWinStats = isLeaderboard ? phase === Phase.WINNER : nominationsHavePassed;

  const itemHeight = getContenderListItemHeight(windowWidth);
  const innerHeight = itemHeight - VERTICAL_MARGINS * 2;

  return (
    <View
      style={{
        backgroundColor: isActive
          ? COLORS.secondaryLight
          : highlighted
          ? hexToRgb(COLORS.secondaryLight, 0.15)
          : accoladeToShow
          ? 'rgba(255,255,255,0.03)'
          : isUnaccaloded
          ? 'rgba(0,0,0,0.5)'
          : COLORS.primaryDark,
        flexDirection: 'row',
        borderTopColor: hexToRgb(COLORS.primaryLight, 0.5),
        borderTopWidth: 1,
        padding: theme.posterMargin,
        height: itemHeight,
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
          isUnaccoladed={!contenderMeetsAccolade}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: VERTICAL_MARGINS,
          flexDirection: 'row',
          width: '100%',
          flex: 1,
        }}
      >
        <TouchableHighlight
          style={{
            flex: 2,
            flexDirection: 'row',
            width: windowWidth - thumbnailContainerWidth - rightIconContainerWidth,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100%',
          }}
          onPress={() => onPressItem()}
          underlayColor={COLORS.secondaryDark}
          onLongPress={onLongPress}
          // disabled={isActive}
        >
          <>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ height: innerHeight / 2 }}>
                <SubHeader
                  style={{
                    width: windowWidth,
                    shadowColor: 'black',
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    color: isUnaccaloded ? 'rgba(255,255,255,0.5)' : COLORS.white,
                  }}
                >
                  {title}
                </SubHeader>
                {subtitle ? (
                  <Body
                    style={{
                      width: windowWidth,
                      shadowColor: 'black',
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      color: isUnaccaloded ? 'rgba(255,255,255,0.5)' : COLORS.white,
                    }}
                  >
                    {`${subtitle}`}
                  </Body>
                ) : null}
                <View />
                <View style={{ flexDirection: 'row' }}>
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
              totalUsersPredicting !== undefined &&
              showHistogram ? (
                <View
                  style={{
                    height: innerHeight / 2,
                    zIndex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      width: LEFT_SECTION,
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Body style={{ color: COLORS.gray }}>{`${
                        isList ? '1ST' : 'WIN'
                      }: `}</Body>
                      <Body
                        style={{ color: COLORS.white, fontWeight: '700' }}
                      >{`${formatPercentage(win / totalUsersPredicting, true)}`}</Body>
                    </View>
                    {!onlyShowWinStats ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Body style={{ color: COLORS.gray }}>{`${
                          isList ? `TOP ${slots ?? 5}` : 'NOM'
                        }: `}</Body>
                        <Body
                          style={{ color: COLORS.white, fontWeight: '700' }}
                        >{`${formatPercentage(nom / totalUsersPredicting, true)}`}</Body>
                      </View>
                    ) : null}
                  </View>
                  <Histogram
                    numPredicting={numPredictingIfIsCommunity}
                    totalNumPredicting={totalNumPredicting}
                    totalNumPredictingTop={totalNumPredictingTop}
                    slots={slots}
                    totalWidth={
                      windowWidth -
                      thumbnailContainerWidth -
                      rightIconContainerWidth -
                      LEFT_SECTION
                    }
                    posterHeight={innerHeight / 2}
                    displayNoExtraSlots={isList || displayNoExtraSlots}
                  />
                </View>
              ) : null}
            </View>
          </>
        </TouchableHighlight>
        {iconRightProps ? (
          <TouchableHighlight
            style={{
              flex: 1,
              width: rightIconContainerWidth,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              paddingRight: 5,
              paddingLeft: 5,
              height: '100%',
              zIndex: 3,
            }}
            underlayColor={iconRightProps.underlayColor || 'transparent'}
            onPressIn={
              iconRightProps.enableOnPressIn ? iconRightProps.onPress : undefined
            }
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
    </View>
  );
};

export default memo(ContenderListItem);
