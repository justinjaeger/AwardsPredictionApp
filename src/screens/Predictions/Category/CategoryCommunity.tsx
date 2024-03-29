import React from 'react';
import { View } from 'react-native';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import { formatLastUpdated } from '../../../util/formatDateTime';
import EventLink from '../../../components/EventLinkButton';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { eventToString } from '../../../util/stringConversions';

// Note: We ALSO use this for non-auth-user user profiles
const CategoryCommunity = ({
  showEventLink,
  bottomHeight,
}: {
  showEventLink?: boolean;
  bottomHeight?: number;
}) => {
  const { category: _category, event: _event, yyyymmdd } = useRouteParams();
  const category = _category!;
  const event = _event!;

  const { data: predictionSet, isLoading } = useQueryGetCommunityPredictions({
    yyyymmdd,
  });

  const { createdAt, totalUsersPredicting } = predictionSet?.categories[category] || {};
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
            position: 'absolute',
            width: '100%',
            top: 15,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          <BodyBold>{'Community predictions not yet tallied'}</BodyBold>
        </View>
      ) : null}
      <View style={{ width: '100%', height: '100%' }}>
        <MovieListCommunity
          predictions={predictions}
          lastUpdatedString={lastUpdatedString}
          totalUsersPredicting={totalUsersPredicting}
        />
      </View>
      <BottomFABContainer bottom={bottomHeight}>
        {showEventLink ? (
          <EventLink text={eventToString(event.awardsBody, event.year)} />
        ) : null}
        <ScreenshotMode predictions={predictions.slice(0, 20)} isCommunity={true} />
      </BottomFABContainer>
    </>
  );
};

export default CategoryCommunity;
