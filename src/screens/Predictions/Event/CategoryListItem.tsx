import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName, Phase, iCategoryPrediction, iPrediction } from '../../../models';
import COLORS from '../../../constants/colors';
import { HeaderLight, SubHeader } from '../../../components/Text';
import theme from '../../../constants/theme';
import MovieGrid from '../../../components/MovieGrid';
import { sortPredictions } from '../../../util/sortPredictions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getCategoryIsHidden } from '../../../util/getCategoryIsHidden';
import { getSlotsInPhase } from '../../../util/getSlotsInPhase';
import useQueryGetEventAccolades from '../../../hooks/queries/useQueryGetEventAccolades';

// TODO: make this work for HISTORY, and not just leaderboards.
// The problem right now with using this as History is, it's hiding the non-shortlisted categories
// First solution to this would be to just not anticipate any shortlist leaderboards at all,
// Second is to have some prop that indicates it's a leaderboard and not history
// - In the case that it IS leaderboard, we can say, if it's before shortlist, hide non shortlisted categories
// - In the case that it's history, we can say, if it's before shortlist, show the normal/nomination slots. Don't hide, don't expand what's visible

/**
 * TODO: WOULD BE NICE: If the ones you didn't get, which are not displayed, are show just beneath
 * For both history AND leaderboard would be nice
 * However idk how I'd access that contender info. Because accolades just contains the contenderId.
 * I COULD just do a bulk fetch for contenderIds that aren't in our predictions, but that could be heavy for the super early predictions
 *
 * MIGHT WANT TO RECONSIDER the structure of Accolade table
 * Because, if I ever want to just DISPLAY WHAT GOT NOMINATED, it would be nice to be able to do that.
 * But instead, I have to reference the community predictions.
 * I mean, I COULD just get the most recent community predictions and use that data though. And filter that for what's accoladed.
 * But otherwise, we can key by event and store an object somewhere that has the accolades for that event, such that they're structured like a predictionset / the apidata can be used
 */
const CategoryListItem = ({
  item: [category, categoryPrediction],
  onPress,
  isAuthProfile,
}: {
  item: [CategoryName, iCategoryPrediction | undefined];
  onPress: (category: CategoryName) => void;
  isAuthProfile: boolean;
}) => {
  // yyyymmdd is not necessarily a leaderboard. When it's history, we don't event want to display shortlist performance
  const { eventId, event, yyyymmdd, phase, isLeaderboard } = useRouteParams();
  const awardsBodyCategories = event?.categories;

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

  const slots =
    isLeaderboard && phase
      ? getSlotsInPhase(phase, maybeUndefinedCategoryData)
      : _categorySlots;

  const categoryIsHidden = getCategoryIsHidden(event, category);
  // hide hidden categories (like shorts)
  if (categoryIsHidden) return null;

  const predictions = categoryPrediction
    ? sortPredictions(categoryPrediction.predictions)
    : [];

  // once nominations happen, you want "slots" to be however many films are nominated
  const truncatedPredictions: iPrediction[] = predictions.slice(0, slots || 5);

  const showAccolades = !!yyyymmdd;

  // we need to know the number of predictions that are in the PHASE
  const numCorrectInCategory = truncatedPredictions.filter(
    (prediction) => contenderIdsToPhase?.[prediction.contenderId] === phase,
  ).length;

  return (
    <TouchableHighlight
      key={category}
      style={{
        width: '100%',
        alignItems: 'flex-start',
      }}
      underlayColor={COLORS.secondaryDark}
      onPress={() => onPress(category)}
    >
      <View>
        <View
          style={{
            paddingRight: 45, // bad but idk
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <SubHeader
            style={{
              color: COLORS.lightest,
              marginLeft: theme.windowMargin,
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            {name}
          </SubHeader>
          {showAccolades ? (
            <SubHeader
              style={{
                color: COLORS.white,
                marginLeft: theme.windowMargin,
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              {`${numCorrectInCategory}/${slots}`}
            </SubHeader>
          ) : null}
        </View>
        {truncatedPredictions.length === 0 ? (
          <HeaderLight style={{ marginLeft: theme.windowMargin }}>
            {!isAuthProfile ? 'No Predictions' : 'Add Predictions'}
          </HeaderLight>
        ) : null}
        <MovieGrid
          eventId={event?._id}
          predictions={truncatedPredictions}
          categoryInfo={awardsBodyCategories[category]}
          showAccolades={showAccolades}
          phase={phase}
          noLine
        />
      </View>
    </TouchableHighlight>
  );
};

export default CategoryListItem;
