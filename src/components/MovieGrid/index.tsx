import { Divider } from '@ui-kitten/components';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iPrediction } from '../../types';
import PosterFromTmdbId from '../Images/PosterFromTmdbId';

const MovieGrid = (props: { predictions: iPrediction[]; noLine?: boolean }) => {
  const { predictions, noLine } = props;
  const { width } = useWindowDimensions();
  const { event, category } = useCategory();

  const slots =
    category && event
      ? getCategorySlots(event.year, event?.awardsBody, category.name)
      : undefined;

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
      {predictions.map((p, i) => (
        <>
          {!noLine && i === slots ? (
            <Divider
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                borderBottomWidth: 1,
                borderColor: COLORS.secondary,
              }}
            />
          ) : null}
          {p.contenderMovie ? (
            <PosterFromTmdbId
              movieTmdbId={p.contenderMovie.tmdbId}
              personTmdbId={p.contenderPerson?.tmdbId}
              width={(width - theme.windowMargin * 2 + theme.posterMargin) / 5}
              ranking={i + 1}
            />
          ) : null}
        </>
      ))}
    </View>
  );
};

export default MovieGrid;
