import { Divider } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import PosterFromTmdbId from '../Images/PosterFromTmdbId';
import { iCategory, iPrediction, Movie, Person } from '../../types/api';
import { useAsyncStorePrefetch } from '../../context/AsyncStorePrefetch';

const MovieGrid = ({
  predictions,
  categoryInfo,
  isCollapsed,
  totalWidth: _totalWidth,
  noLine,
  style,
}: {
  predictions: iPrediction[];
  categoryInfo?: iCategory;
  isCollapsed?: boolean;
  noLine?: boolean;
  totalWidth?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const { store } = useAsyncStorePrefetch();
  const { width } = useWindowDimensions();
  const totalWidth = _totalWidth || width;

  const slots = categoryInfo?.slots || 5;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: theme.windowMargin - theme.posterMargin / 2,
          marginRight: theme.windowMargin - theme.posterMargin / 2,
          marginBottom: isCollapsed ? 0 : theme.windowMargin,
          width: totalWidth,
        },
        style,
      ]}
    >
      {predictions.map(({ movieId, personId, contenderId }, i) => {
        const movie = store.get(movieId) as Movie;
        const person = store.get(personId) as Person | undefined;
        return (
          <View key={contenderId}>
            {!noLine && i === slots ? (
              <Divider
                style={{
                  position: 'absolute',
                  width: totalWidth - theme.windowMargin * 2,
                  marginTop: 10,
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: COLORS.secondary,
                }}
              />
            ) : null}
            {movie ? (
              <>
                {!noLine && i >= slots && i < slots + 5 ? (
                  // we want to give a margin on top if this is the row beneath the divider (since divider is absolute pos)
                  <View style={{ marginTop: 20 }} />
                ) : null}
                <PosterFromTmdbId
                  movieTmdbId={movie.tmdbId}
                  personTmdbId={person?.tmdbId}
                  width={
                    (totalWidth - theme.windowMargin * 2 + theme.posterMargin) /
                    (isCollapsed ? 10 : 5)
                  }
                  ranking={isCollapsed ? undefined : i + 1}
                />
              </>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default MovieGrid;
