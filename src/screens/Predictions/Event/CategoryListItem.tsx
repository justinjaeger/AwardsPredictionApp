import React from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { CategoryName, EventModel, Phase, WithId, iPrediction } from '../../../models';
import COLORS from '../../../constants/colors';
import { SubHeader } from '../../../components/Text';
import theme from '../../../constants/theme';
import MovieGrid from '../../../components/MovieGrid';
import { sortPredictions } from '../../../util/sortPredictions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getCategoryIsHidden } from '../../../util/getCategoryIsHidden';
import { getSlotsInPhase } from '../../../util/getSlotsInPhase';
import useQueryGetEventAccolades from '../../../hooks/queries/useQueryGetEventAccolades';
import CustomIcon from '../../../components/CustomIcon';
import { CATEGORY_BOTTOM_AREA_HEIGHT, CATEGORY_TOP_AREA_HEIGHT } from './constants';
import { getCategoryListItemHeight } from '../../../util/getCategoryListItemHeight';
import { getContenderMeetsAccolade } from '../../../util/getContenderMeetsAccolade';

export type iCategoryListItem = [CategoryName, iPrediction[]];

const CategoryListItem = ({
  item: [category, categoryPrediction],
  onPress,
  event,
  tab,
}: {
  item: iCategoryListItem;
  onPress: (category: CategoryName) => void;
  event: WithId<EventModel>;
  tab: 'personal' | 'community';
}) => {
  const { width } = useWindowDimensions();
  // yyyymmdd is not necessarily a leaderboard. When it's history, we don't event want to display shortlist performance
  const { yyyymmdd, phase, isLeaderboard } = useRouteParams();
  const awardsBodyCategories = event?.categories;
  const eventId = event?._id;

  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);

  if (!awardsBodyCategories) return null;

  const maybeUndefinedCategoryData = awardsBodyCategories[category];
  const {
    name,
    slots: _categorySlots,
    isShortlisted,
    isHiddenBeforeShortlist,
  } = maybeUndefinedCategoryData || {};

  // effectively, hides categories that are not shortlisted, when it's a shortlist leaderboard
  if (phase === Phase.SHORTLIST && (!isShortlisted || isHiddenBeforeShortlist))
    return null;

  const categoryIsHidden = getCategoryIsHidden(event, category);
  // hide hidden categories (like shorts)
  if (categoryIsHidden) return null;

  const slotsToDisplay =
    isLeaderboard && phase
      ? getSlotsInPhase(phase, maybeUndefinedCategoryData, isLeaderboard)
      : _categorySlots;
  const slotsWhichAreCorrect =
    isLeaderboard && phase
      ? getSlotsInPhase(phase, maybeUndefinedCategoryData)
      : _categorySlots;

  // they're already sorted but if that's the case this is not expensive so may as well for safety
  const predictions = sortPredictions(categoryPrediction);
  const predictionsToDisplay: iPrediction[] = predictions.slice(0, slotsToDisplay || 5);
  const predictionsWithinSlots: iPrediction[] = predictions.slice(
    0,
    slotsWhichAreCorrect || 5,
  );

  const showAccolades = !!yyyymmdd;

  // we need to know the number of predictions that are in the PHASE
  const numCorrectInCategory = predictionsWithinSlots.filter((prediction) => {
    const contenderPhase = contenderIdsToPhase?.[prediction.contenderId];
    if (!contenderPhase || !phase) return false;
    return getContenderMeetsAccolade(phase, contenderPhase);
  }).length;

  const height = getCategoryListItemHeight({
    categoryName: category,
    event,
    windowWidth: width,
  });

  return (
    <TouchableHighlight
      style={{
        height,
        width: '100%',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.primaryLight,
        backgroundColor: COLORS.primaryDark,
      }}
      underlayColor={COLORS.secondaryDark}
      onPress={() => onPress(category)}
    >
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingLeft: theme.windowMargin,
            paddingRight: theme.windowMargin,
            height: CATEGORY_TOP_AREA_HEIGHT,
          }}
        >
          <SubHeader style={{ color: COLORS.lightest }}>{name}</SubHeader>
          {showAccolades ? (
            <SubHeader style={{ color: COLORS.white }}>
              {`${numCorrectInCategory}/${slotsWhichAreCorrect}`}
            </SubHeader>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {predictionsToDisplay.length === 0 && tab === 'personal' ? (
                <SubHeader style={{ fontWeight: '400' }}>Add</SubHeader>
              ) : null}
              <CustomIcon
                name={'chevron-right-outline'}
                color={COLORS.gray}
                size={24}
                styles={{ right: -6 }}
              />
            </View>
          )}
        </View>
        <MovieGrid
          eventId={event?._id}
          predictions={predictionsToDisplay}
          categoryInfo={awardsBodyCategories[category]}
          showAccolades={showAccolades}
          phase={phase}
          noLine
          style={{
            paddingBottom: CATEGORY_BOTTOM_AREA_HEIGHT,
          }}
        />
      </>
    </TouchableHighlight>
  );
};

export default CategoryListItem;
