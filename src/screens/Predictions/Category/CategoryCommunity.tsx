import React from 'react';
import { View } from 'react-native';
import { iCategoryProps } from '.';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import { useEvent } from '../../../context/EventContext';
import { formatLastUpdated } from '../../../util/formatDateTime';
import EventLink from './EventLink';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';

// Note: We ALSO use this for non-authenticated user profiles
const CategoryCommunity = ({
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
      <View style={{ width: '100%' }}>
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
        />
      </View>
    </>
  );
};

export default CategoryCommunity;
