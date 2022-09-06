import React from 'react';
import { CategoryType, Song } from '../../models';
import PerformanceDetails from './PerformanceDetails';
import FilmDetails from './FilmDetails';
import { DetailContainer } from './styles';
import SongDetails from './SongDetails';

type iContenderDetailsProps = {
  movieTmdbId?: number;
  personTmdbId?: number;
  song?: Song | undefined;
  categoryType: CategoryType;
};

const ContenderDetails = (props: iContenderDetailsProps) => {
  const { movieTmdbId, categoryType, personTmdbId, song } = props;

  const DetailComponent = (() => {
    switch (categoryType) {
      case CategoryType.FILM:
        if (movieTmdbId) {
          return <FilmDetails movieTmdbId={movieTmdbId} />;
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
        if (movieTmdbId && song) {
          return <SongDetails movieTmdbId={movieTmdbId} song={song} />;
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
