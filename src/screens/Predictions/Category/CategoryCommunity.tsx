import React from 'react';
import { View } from 'react-native';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import { formatLastUpdated } from '../../../util/formatDateTime';
import EventLink from './EventLink';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';

// Note: We ALSO use this for non-auth-user user profiles
const CategoryCommunity = ({ showEventLink }: { showEventLink?: boolean }) => {
  const { category: _category } = useRouteParams();
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
      {predictions.length === 0 ? (
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
      <View style={{ width: '100%', flex: 1 }}>
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
        />
      </View>
      <BottomFABContainer>
        {showEventLink ? <EventLink /> : null}
        <ScreenshotMode predictions={predictions.slice(0, 20)} isCommunity={true} />
      </BottomFABContainer>
    </>
  );
};

export default CategoryCommunity;
