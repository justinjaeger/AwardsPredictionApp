import React from 'react';
import { CategoryType, Movie, Song } from '../../models';
import PerformanceDetails from './PerformanceDetails';
import FilmDetails from './FilmDetails';
import { DetailContainer } from './styles';
import SongDetails from './SongDetails';

type iContenderDetailsProps = {
  movie?: Movie;
  personTmdbId?: number;
  song?: Song | undefined;
  categoryType: CategoryType;
};

const ContenderDetails = (props: iContenderDetailsProps) => {
  const { movie, categoryType, personTmdbId, song } = props;

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
        if (movie && song) {
          return <SongDetails movie={movie} song={song} />;
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
