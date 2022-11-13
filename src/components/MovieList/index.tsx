import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import theme from '../../constants/theme';
import { iPrediction } from '../../store/types';
import PosterFromTmdbId from '../Images/PosterFromTmdbId';

const MovieList = (props: { predictions: iPrediction[] }) => {
  const { predictions } = props;
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: theme.windowMargin - theme.posterMargin / 2,
        marginRight: theme.windowMargin - theme.posterMargin / 2,
        marginBottom: theme.windowMargin,
      }}
    >
      {predictions.map((p, i) =>
        p.contenderMovie ? (
          <PosterFromTmdbId
            movieTmdbId={p.contenderMovie.tmdbId}
            personTmdbId={p.contenderPerson?.tmdbId}
            width={(width - theme.windowMargin * 2 + theme.posterMargin) / 5}
            ranking={i + 1}
          />
        ) : null,
      )}
    </View>
  );
};

export default MovieList;
