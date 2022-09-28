import React from 'react';
import { CategoryType, Movie } from '../../models';
import PerformanceDetails from './PerformanceDetails';
import FilmDetails from './FilmDetails';
import { DetailContainer } from './styles';
import SongDetails from './SongDetails';

type iContenderDetailsProps = {
  movie?: Movie;
  personTmdbId?: number;
  songId?: string | undefined;
  categoryType: CategoryType;
};

const ContenderDetails = (props: iContenderDetailsProps) => {
  const { movie, categoryType, personTmdbId, songId } = props;

  const DetailComponent = (() => {
    switch (categoryType) {
      case CategoryType.FILM:
        if (movie) {
          return <FilmDetails movie={movie} />;
        }
        break;
      case CategoryType.PERFORMANCE:
        if (personTmdbId) {
          return <PerformanceDetails personTmdbId={personTmdbId} movie={movie} />;
        }
        break;
      case CategoryType.SONG:
        if (movie && songId) {
          return <SongDetails movie={movie} songId={songId} />;
        }
        break;
      default:
        return null;
    }
    return null;
  })();

  return <DetailContainer>{DetailComponent}</DetailContainer>;
};

export default ContenderDetails;
