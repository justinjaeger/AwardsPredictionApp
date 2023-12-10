import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Poster from '../Images/Poster';
import {
  POSTER_DIMENSIONS,
  getPosterDimensionsByHeight,
  getPosterDimensionsByWidth,
} from '../../constants/posterDimensions';
import { Body, Header, SmallHeader, SubHeader } from '../Text';
import { iPrediction } from '../../types/api';
import ExternalLinkButton from '../ExternalLinkButton';
import { useNavigation } from '@react-navigation/native';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { MainScreenNavigationProp } from '../../navigation/types';
import BasicModal from '../BasicModal';
import useDevice from '../../util/device';

const ContenderInfoHeader = ({ prediction }: { prediction: iPrediction }) => {
  const { isPad } = useDevice();
  const webViewNavigation = useNavigation<MainScreenNavigationProp>();
  const { width, height } = useWindowDimensions();
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { movie, person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  const [showFullPoster, setShowFullPoster] = useState<boolean>(false);

  const posterPath = person?.posterPath ?? movie?.posterPath ?? null;
  const posterTitle = person?.name ?? movie?.title ?? '';
  const itemTitle = song?.title ?? person?.name ?? movie?.title ?? '';

  const posterToInfoRatio = isPad ? 0.3 : 0.4;

  const { height: smallPosterHeight, width: smallPosterWidth } =
    getPosterDimensionsByWidth(width * posterToInfoRatio - 10);

  const screenRatio = height / width;
  const posterRatio = POSTER_DIMENSIONS.height / POSTER_DIMENSIONS.width;
  const { height: fullPosterHeight, width: fullPosterWidth } =
    screenRatio < posterRatio
      ? getPosterDimensionsByHeight(height)
      : getPosterDimensionsByWidth(width);

  const subheader =
    song || person
      ? movie?.title ?? ''
      : movie?.categoryCredits.directing.join(',') ?? '';

  const bodyText = song || person ? '' : movie?.cast ?? '';

  return (
    <>
      {showFullPoster ? (
        <BasicModal
          visible={showFullPoster}
          onClose={() => setShowFullPoster(false)}
          height={fullPosterHeight}
          width={fullPosterWidth}
        >
          <Poster
            path={posterPath} // this will render the loading state if null
            title={posterTitle}
            width={fullPosterWidth}
            onPress={() => {
              setShowFullPoster(false);
            }}
          />
        </BasicModal>
      ) : null}
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <Poster
          path={posterPath} // this will render the loading state if null
          title={posterTitle}
          width={smallPosterWidth}
          onPress={() => {
            setShowFullPoster(true);
          }}
          styles={{ margin: 0, padding: 0 }}
        />
        <View
          style={{
            width: width * (1 - posterToInfoRatio) - 5,
            paddingLeft: 10,
            height: smallPosterHeight,
            justifyContent: 'space-between',
          }}
        >
          <View>
            {itemTitle.length > 20 ? (
              <SmallHeader>{itemTitle ?? ''}</SmallHeader>
            ) : (
              <Header>{itemTitle ?? ''}</Header>
            )}
            <SubHeader style={{ paddingTop: 5 }}>{subheader}</SubHeader>
            <Body style={{ paddingTop: 10 }}>{bodyText}</Body>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}
          >
            {person ? (
              <ExternalLinkButton
                text={'Actor Info'}
                onPress={() => {
                  webViewNavigation.navigate('WebView', {
                    uri: `https://www.themoviedb.org/person/${person.tmdbId}/`,
                    title: person.name || '',
                  });
                }}
              />
            ) : (
              <View />
            )}
            {movie ? (
              <ExternalLinkButton
                text={person || song ? 'Movie Info' : 'More Info'}
                onPress={() => {
                  webViewNavigation.navigate('WebView', {
                    uri: `https://www.themoviedb.org/movie/${movie.tmdbId}/`,
                    title: movie?.title || '',
                  });
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};

export default ContenderInfoHeader;
