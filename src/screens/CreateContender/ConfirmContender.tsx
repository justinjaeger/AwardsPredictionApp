import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import { Body } from '../../components/Text';
import { CreateContenderParamList } from '../../navigation/types';
import TmdbServices from '../../services/tmdb';
import { iGetMovieCreditsData, iGetMovieData } from '../../services/tmdb/movie';
import { TMDB_IMAGE_URL, POSTER_DIMENSIONS } from '../../util/constants';
// import { useNavigation } from '@react-navigation/native';

// move this somewhere else

// in this screen, do a query with all the details displayed, including the poster
// if the user submits, make sure there's no additional information that needs to be submitted (in the case of an actor, would be the person. in the case of a song, would be the song title.)
const ConfirmContender = () => {
  const {
    params: { tmdbId, category },
  } = useRoute<RouteProp<CreateContenderParamList, 'ConfirmContender'>>();
  //   const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iGetMovieData | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iGetMovieCreditsData | undefined>();

  useEffect(() => {
    TmdbServices.getMovie(tmdbId).then((res) => {
      setMovieDetails(res.data);
    });
    TmdbServices.getMovieCredits(tmdbId).then((res) => {
      setCastAndCrew(res.data);
    });
    // make request to get the movie's details (these will be cached using the tmdbId as the)
  }, [tmdbId]);

  const onConfirmContender = () => {
    // Create contender in DataStore
    // Cache contender
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      <SubmitButton text={'Confirm Contender'} onPress={onConfirmContender} />
      <Body>{movieDetails?.title || ''}</Body>
      {movieDetails?.posterPath ? (
        <Image
          style={{
            width: POSTER_DIMENSIONS.width * 10,
            height: POSTER_DIMENSIONS.height * 10,
          }}
          source={{
            uri: `${TMDB_IMAGE_URL}/${movieDetails.posterPath}`,
          }}
        />
      ) : null}
      <Body>{JSON.stringify(castAndCrew)}</Body>
    </ScrollView>
  );
};

export default ConfirmContender;
