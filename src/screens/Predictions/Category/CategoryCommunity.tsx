import React from 'react';
import { View } from 'react-native';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import { useEvent } from '../../../context/EventContext';
import { formatLastUpdated } from '../../../util/formatDateTime';
import EventLink from './EventLink';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import BottomFABContainer from '../../../components/BottomFABContainer';

// Note: We ALSO use this for non-authenticated user profiles
const CategoryCommunity = ({ showEventLink }: { showEventLink?: boolean }) => {
  const { category: _category } = useEvent();
  const category = _category!;

  const { data: predictionSet, isLoading } = useQueryGetCommunityPredictions();

  const { createdAt } = predictionSet?.categories[category] || {};
  const predictions = sortPredictions(
    predictionSet?.categories[category]?.predictions ?? [],
  );
  const lastUpdatedString = formatLastUpdated(new Date(createdAt || ''));

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <>
      {predictions?.length === 0 ? (
        <View
          style={{
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BodyBold>{'Community predictions not yet tallied'}</BodyBold>
        </View>
      ) : null}
      {showEventLink ? <EventLink userId={undefined} /> : null}
      <View style={{ width: '100%' }}>
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
        />
      </View>
      <BottomFABContainer>
        <ScreenshotMode predictions={predictions.slice(0, 20)} />
      </BottomFABContainer>
    </>
  );
};

export default CategoryCommunity;
