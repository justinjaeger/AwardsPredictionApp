import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Poster from '../Images/Poster';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import { Body, Header, SmallHeader, SubHeader } from '../Text';
import { iPrediction } from '../../types/api';
import ExternalLinkButton from '../ExternalLinkButton';
import { useNavigation } from '@react-navigation/native';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { MainScreenNavigationProp } from '../../navigation/types';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import BasicModal from '../BasicModal';

const ContenderInfoModal = ({
  prediction,
  onNavigateAway,
}: {
  prediction: iPrediction;
  onNavigateAway?: () => void;
}) => {
  const webViewNavigation = useNavigation<MainScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { data: communityPredictions } = useQueryGetCommunityPredictions();
  const { movie, person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  const [showFullPoster, setShowFullPoster] = useState<boolean>(false);

  if (!communityPredictions) return null;

  const close = () => {
    onNavigateAway && onNavigateAway();
  };

  const posterPath = person?.posterPath ?? movie?.posterPath ?? null;
  const posterTitle = person?.name ?? movie?.title ?? '';
  const itemTitle = song?.title ?? person?.name ?? movie?.title ?? '';

  const { height: smHeight, width: smWidth } = getPosterDimensionsByWidth(
    width * 0.4 - 10,
  );

  const { height: bgHeight, width: bgWidth } = getPosterDimensionsByWidth(width);

  return (
    <>
      {showFullPoster ? (
        <BasicModal
          visible={showFullPoster}
          onClose={() => setShowFullPoster(false)}
          height={bgHeight}
          width={bgWidth}
        >
          <Poster
            path={posterPath} // this will render the loading state if null
            title={posterTitle}
            width={width}
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
          width={smWidth}
          onPress={() => {
            setShowFullPoster(true);
          }}
          styles={{ margin: 0, padding: 0 }}
        />
        <View
          style={{
            width: width * 0.6 - 5,
            paddingLeft: 10,
            height: smHeight,
            justifyContent: 'space-between',
          }}
        >
          <View>
            {itemTitle.length > 20 ? (
              <SmallHeader>{itemTitle ?? ''}</SmallHeader>
            ) : (
              <Header>{itemTitle ?? ''}</Header>
            )}
            <SubHeader style={{ paddingTop: 5 }}>
              {movie ? movie.categoryCredits.directing.join(',') : ''}
            </SubHeader>
            <Body style={{ paddingTop: 10 }}>{(movie && movie.cast) ?? ''}</Body>
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
                  close();
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
                text={person ? 'Movie Info' : 'More Info'}
                // eslint-disable-next-line sonarjs/no-identical-functions
                onPress={() => {
                  close();
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

export default ContenderInfoModal;
