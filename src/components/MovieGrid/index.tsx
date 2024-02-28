import { Divider } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iCategory, iPrediction, Phase } from '../../models';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import PosterFromTmdb from '../Images/PosterFromTmdb';
import MoviePosterSkeleton from '../Skeletons/MoviePosterSkeleton';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';
import {
  getPosterDimensionsGrid,
  getPosterContainerDimensionsGrid,
} from '../../constants/posterDimensions';
import { getNumPostersInRow } from '../../util/getNumPostersInRow';
import { hexToRgb } from '../../util/hexToRgb';

const MovieGrid = ({
  eventId,
  predictions,
  categoryInfo,
  noLine,
  style,
  showAccolades,
  phase,
}: {
  eventId: string;
  predictions: iPrediction[];
  categoryInfo?: iCategory;
  noLine?: boolean;
  style?: StyleProp<ViewStyle>;
  // needed for leaderboards:
  showAccolades?: boolean;
  phase?: Phase;
}) => {
  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);
  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const { width } = useWindowDimensions();

  const slots = categoryInfo?.slots || 5;
  const moviesInRow = getNumPostersInRow(slots);

  const posterDimensions = getPosterDimensionsGrid(width, slots);
  const posterContainerHeight = getPosterContainerDimensionsGrid(width, slots);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: theme.windowMargin - theme.posterMargin,
          width,
        },
        style,
      ]}
    >
      {new Array(slots).fill(null).map((x, i) => {
        const prediction = predictions[i];
        if (!prediction) {
          return (
            <View
              style={{
                height: posterDimensions.height,
                width: posterDimensions.width,
                margin: theme.posterMargin,
                borderRadius: theme.borderRadius,
                borderColor: hexToRgb(COLORS.secondary, 0.1),
                backgroundColor: COLORS.primary,
              }}
            />
          );
        }
        const { contenderId } = prediction;
        const { movie, person } = getTmdbDataFromPrediction(prediction) || {};
        const accolade = contenderIdsToPhase && contenderIdsToPhase[contenderId];
        const accoladeMatchesPhase = phase === accolade;
        return (
          <View
            style={{
              height: posterContainerHeight,
              marginLeft: theme.posterMargin,
              marginRight: theme.posterMargin,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!noLine && i === slots ? (
              <Divider
                style={{
                  position: 'absolute',
                  width: width - theme.windowMargin * 2,
                  marginTop: theme.windowMargin / 2,
                  borderBottomWidth: 1,
                  borderColor: COLORS.secondary,
                }}
              />
            ) : null}
            {!noLine && i >= slots && i < slots + moviesInRow ? (
              // we want to give a margin on top if this is the row beneath the divider (since divider is absolute pos)
              <View style={{ marginTop: 20 }} />
            ) : null}
            {movie ? (
              <PosterFromTmdb
                movie={movie}
                person={person}
                posterDimensions={posterDimensions}
                ranking={i + 1}
                accolade={showAccolades && accoladeMatchesPhase ? accolade : undefined}
                isUnaccoladed={showAccolades && (!accoladeMatchesPhase || !accolade)}
              />
            ) : (
              <MoviePosterSkeleton posterDimensions={posterDimensions} />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default MovieGrid;
