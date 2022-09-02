import React from 'react';
import { CategoryType } from '../../models';
import { iCachedTmdbMovie } from '../../services/cache/types';
import PerformanceDetails from './PerformanceDetails';
import FilmDetails from './FilmDetails';
import { DetailContainer } from './styles';
import PersonDetails from './PersonDetails';

type iContenderDetailsProps = {
  movieTmdbId?: number;
  personTmdbId?: number;
  categoryType: CategoryType;
  returnContenderDetails?: (md: iCachedTmdbMovie | undefined) => void;
};

const ContenderDetails = (props: iContenderDetailsProps) => {
  const { movieTmdbId, categoryType, personTmdbId } = props;

  return (
    <DetailContainer>
      {categoryType === CategoryType.PERFORMANCE && personTmdbId ? (
        movieTmdbId ? (
          <PerformanceDetails personId={personTmdbId} movieId={movieTmdbId} />
        ) : movieTmdbId ? (
          <PersonDetails tmdbId={personTmdbId} />
        ) : null
      ) : movieTmdbId ? (
        <FilmDetails tmdbId={movieTmdbId} />
      ) : null}
    </DetailContainer>
  );
};

export default ContenderDetails;
