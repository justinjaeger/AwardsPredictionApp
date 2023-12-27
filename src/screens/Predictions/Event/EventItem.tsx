import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName, iCategoryPrediction, iPrediction } from '../../../types/api';
import COLORS from '../../../constants/colors';
import { HeaderLight, SubHeader } from '../../../components/Text';
import theme from '../../../constants/theme';
import MovieGrid from '../../../components/MovieGrid';
import { sortPredictions } from '../../../util/sortPredictions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getCategoryIsHidden } from '../../../util/getCategoryIsHidden';

// NOTE: Typescript is failing me here, but categoryPrediction is sometimes undefined!!
const EventItem = ({
  item: [category, categoryPrediction],
  onPress,
  isAuthProfile,
}: {
  item: [CategoryName, iCategoryPrediction | undefined];
  onPress: (category: CategoryName) => void;
  isAuthProfile: boolean;
}) => {
  const { event } = useRouteParams();
  const awardsBodyCategories = event?.categories;
  if (!awardsBodyCategories) return null;

  const maybeUndefinedCategoryData = awardsBodyCategories[category];
  const { name, slots } = maybeUndefinedCategoryData || {};
  const categoryIsHidden = getCategoryIsHidden(event, category);
  // hide hidden categories (like shorts)
  if (categoryIsHidden) return null;

  const predictions = categoryPrediction
    ? sortPredictions(categoryPrediction.predictions)
    : [];
  // once nominations happen, you want "slots" to be however many films are nominated
  const truncatedPredictions: iPrediction[] = predictions.slice(0, slots || 5);

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
        {truncatedPredictions.length === 0 ? (
          <HeaderLight style={{ marginLeft: theme.windowMargin }}>
            {!isAuthProfile ? 'No Predictions' : 'Add Predictions'}
          </HeaderLight>
        ) : null}
        <MovieGrid
          predictions={truncatedPredictions}
          categoryInfo={awardsBodyCategories[category]}
          noLine
        />
      </View>
    </TouchableHighlight>
  );
};

export default EventItem;
