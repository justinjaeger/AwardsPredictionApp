import { Divider } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import { PredictionType } from '../../API';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iPrediction } from '../../types';
import PosterFromTmdbId from '../Images/PosterFromTmdbId';

const MovieGrid = (props: {
  predictions: iPrediction[];
  isCollapsed?: boolean;
  noLine?: boolean;
  totalWidth?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const { predictions, isCollapsed, totalWidth: _totalWidth, style } = props;
  let noLine = props.noLine;
  const { width } = useWindowDimensions();
  const totalWidth = _totalWidth || width;
  const { event, category } = useCategory();

  const predictionType = predictions[0]?.predictionType || PredictionType.NOMINATION;

  // don't want to show divider after noms have happened
  const slots =
    event && category ? getCategorySlots(event, category.name, predictionType) : 1;
  if (slots === 1) {
    noLine = true;
  }

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
      {predictions.map((p, i) => (
        <View key={p.contenderId}>
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
          {p.contenderMovie ? (
            <>
              {!noLine && i >= slots && i < slots + 5 ? (
                // we want to give a margin on top if this is the row beneath the divider (since divider is absolute pos)
                <View style={{ marginTop: 20 }} />
              ) : null}
              <PosterFromTmdbId
                movieTmdbId={p.contenderMovie.tmdbId}
                personTmdbId={p.contenderPerson?.tmdbId}
                width={
                  (totalWidth - theme.windowMargin * 2 + theme.posterMargin) /
                  (isCollapsed ? 10 : 5)
                }
                ranking={isCollapsed ? undefined : i + 1}
                accolade={p.accolade}
                predictionType={p.predictionType}
              />
            </>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default MovieGrid;
