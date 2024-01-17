import { Divider } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iCategory, iPrediction } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import PosterFromTmdb from '../Images/PosterFromTmdb';
import MoviePosterSkeleton from '../Skeletons/MoviePosterSkeleton';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';

const MOVIES_IN_ROW = 5;

const MovieGrid = ({
  eventId,
  predictions,
  categoryInfo,
  totalWidth: _totalWidth,
  noLine,
  style,
  showAccolades,
}: {
  eventId: string;
  predictions: iPrediction[];
  categoryInfo?: iCategory;
  noLine?: boolean;
  totalWidth?: number;
  style?: StyleProp<ViewStyle>;
  showAccolades?: boolean;
}) => {
  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);
  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { width } = useWindowDimensions();
  const totalWidth = _totalWidth || width;

  const slots = categoryInfo?.slots || 5;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: theme.windowMargin,
          marginRight: theme.windowMargin,
          marginBottom: theme.windowMargin / 2,
          width: totalWidth,
        },
        style,
      ]}
    >
      {predictions.map((prediction, i) => {
        const { contenderId } = prediction;
        // HERE is where it gets the movie data, including poster
        // BUT ALSO it comes back here from event predictions
        const { movie, person } = getTmdbDataFromPrediction(prediction) || {};
        const accolade = contenderIdsToPhase && contenderIdsToPhase[contenderId];
        return (
          <View
            key={contenderId}
            style={{
              marginRight: theme.posterMargin * 2,
              marginBottom: theme.posterMargin * 2,
              position: 'relative',
            }}
          >
            {!noLine && i === slots ? (
              <Divider
                style={{
                  position: 'absolute',
                  width: totalWidth - theme.windowMargin * 2,
                  marginTop: theme.windowMargin / 2,
                  borderBottomWidth: 1,
                  borderColor: COLORS.secondary,
                }}
              />
            ) : null}
            {!noLine && i >= slots && i < slots + MOVIES_IN_ROW ? (
              // we want to give a margin on top if this is the row beneath the divider (since divider is absolute pos)
              <View style={{ marginTop: 20 }} />
            ) : null}
            {movie ? (
              <PosterFromTmdb
                movie={movie}
                person={person}
                width={
                  (totalWidth -
                    theme.posterMargin * (MOVIES_IN_ROW - 1) -
                    theme.windowMargin) /
                  MOVIES_IN_ROW
                }
                ranking={i + 1}
                accolade={showAccolades && accolade}
                isUnaccoladed={showAccolades && !accolade}
              />
            ) : (
              <MoviePosterSkeleton />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default MovieGrid;
