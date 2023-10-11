import React from 'react';
import { Animated, View } from 'react-native';
import { iCategoryProps } from '.';
import LastUpdatedText from '../../../components/LastUpdatedText';
import MovieGrid from '../../../components/MovieGrid';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useEvent } from '../../../context/EventContext';
import { formatLastUpdated } from '../../../util/formatDateTime';
import EventLink from './EventLink';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';

// Note: We ALSO use this for non-authenticated user profiles
const CategoryCommunity = ({
  collapsedOpacity,
  expandedOpacity,
  delayedDisplay,
  gridOpacity,
  isIndividualProfile,
  showEventLink,
}: iCategoryProps & { isIndividualProfile?: boolean }) => {
  const { category: _category } = useEvent();
  const category = _category!;

  const { data: predictionSet, isLoading } = useQueryGetCommunityPredictions();

  const { createdAt, predictions } = predictionSet?.categories[category] || {};
  const lastUpdatedString = formatLastUpdated(new Date(createdAt || ''));

  if (!predictions) {
    return null;
  }

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <>
      {predictions && predictions.length === 0 ? (
        <View
          style={{
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BodyBold>
            {!isIndividualProfile
              ? 'Community predictions not yet tallied'
              : 'No predictions for this date'}
          </BodyBold>
        </View>
      ) : null}
      {showEventLink ? <EventLink userId={undefined} /> : null}
      <Animated.ScrollView
        style={{
          display: delayedDisplay === 'grid' ? 'flex' : 'none',
          opacity: gridOpacity,
          width: '100%',
        }}
        contentContainerStyle={{
          paddingBottom: 100,
          marginTop: theme.windowMargin,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: gridOpacity }}>
          <LastUpdatedText lastUpdated={lastUpdatedString} style={{ top: -35 }} />
          <MovieGrid predictions={predictions} />
        </Animated.View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          display: delayedDisplay === 'list' ? 'flex' : 'none',
          opacity: expandedOpacity,
          width: '100%',
        }}
      >
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
          disableHeader={isIndividualProfile}
        />
      </Animated.View>
      <Animated.View
        style={{
          display: delayedDisplay === 'list-collapsed' ? 'flex' : 'none',
          opacity: collapsedOpacity,
        }}
      >
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
          isCollapsed
          disableHeader={isIndividualProfile}
        />
      </Animated.View>
    </>
  );
};

export default CategoryCommunity;
