import React, { useState } from 'react';
import { View } from 'react-native';
import { CategoryName } from '../../../API';
import {
  getPosterDimensionsByWidth,
  PosterSize,
} from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iNumberPredicting } from '../../../types';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge, Label } from '../../Text';

type iFilmListItemProps = {
  tmdbMovieId: number;
  movieStudio: string | undefined;
  categoryName: CategoryName;
  communityRankings: iNumberPredicting | undefined;
  ranking?: number;
  size?: PosterSize;
  width?: number;
  onPress: () => void;
};

const FilmListItem = (props: iFilmListItemProps) => {
  const {
    communityRankings,
    tmdbMovieId,
    movieStudio,
    categoryName,
    ranking,
    size,
    width,
    onPress,
  } = props;

  // TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();

  useAsyncEffect(async () => {
    const { status, data } = await TmdbServices.getTmdbMovie(tmdbMovieId);
    if (status === 'success') {
      setTmdbMovie(data);
    }
  }, [tmdbMovieId]);

  const categoryInfo = tmdbMovie?.categoryInfo?.[categoryName];

  const height = width
    ? getPosterDimensionsByWidth(width).height
    : size || PosterSize.MEDIUM;

  const { win, nom } = getNumPredicting(communityRankings || {});

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginLeft: theme.windowMargin,
        height,
      }}
    >
      <Poster
        path={tmdbMovie?.posterPath || null}
        title={tmdbMovie?.title || ''}
        width={width}
        ranking={ranking}
        onPress={onPress}
      />
      <View style={{ flexDirection: 'column' }}>
        <BodyLarge style={{ marginLeft: 10 }}>{tmdbMovie?.title || ''}</BodyLarge>
        {categoryName === CategoryName.PICTURE ? (
          <Label style={{ marginTop: 1, marginLeft: 10 }}>{movieStudio || ''}</Label>
        ) : null}
        {categoryInfo ? (
          <BodyLarge style={{ marginLeft: 10 }}>{categoryInfo.join(', ')}</BodyLarge>
        ) : null}
        {communityRankings && size !== PosterSize.SMALL ? (
          <>
            <BodyLarge style={{ marginLeft: 10 }}>{`pred win: ${win}`}</BodyLarge>
            <BodyLarge style={{ marginLeft: 10 }}>{`pred nom: ${nom}`}</BodyLarge>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default FilmListItem;
