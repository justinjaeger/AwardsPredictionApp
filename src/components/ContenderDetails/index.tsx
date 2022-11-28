import React from 'react';
import PerformanceDetails from './PerformanceDetails';
import FilmDetails from './FilmDetails';
import { DetailContainer } from './styles';
import SongDetails from './SongDetails';
import { CategoryType } from '../../API';

type iContenderDetailsProps = {
  categoryType: CategoryType;
  movieTmdbId?: number;
  movieStudio?: string | undefined;
  personTmdbId?: number;
  songId?: string | undefined;
};

const ContenderDetails = (props: iContenderDetailsProps) => {
  const { movieTmdbId, movieStudio, categoryType, personTmdbId, songId } = props;

  const DetailComponent = (() => {
    switch (categoryType) {
      case CategoryType.FILM:
        if (movieTmdbId) {
          return <FilmDetails movieTmdbId={movieTmdbId} movieStudio={movieStudio} />;
        }
        break;
      case CategoryType.PERFORMANCE:
        if (personTmdbId) {
          return (
            <PerformanceDetails personTmdbId={personTmdbId} movieTmdbId={movieTmdbId} />
          );
        }
        break;
      case CategoryType.SONG:
        if (movieTmdbId && songId) {
          return <SongDetails movieTmdbId={movieTmdbId} songId={songId} />;
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
