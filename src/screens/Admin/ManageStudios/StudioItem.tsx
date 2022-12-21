import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import Poster from '../../../components/Images/Poster';
import FormInput from '../../../components/Inputs/FormInput';
import { BodyBold } from '../../../components/Text';
import { PosterSize } from '../../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import ApiServices from '../../../services/graphql';
import TmdbServices from '../../../services/tmdb';

const StudioItem = (props: {
  movieTmdbId: number;
  movieId: string;
  movieStudio?: string | undefined;
}) => {
  const { movieTmdbId, movieId, movieStudio } = props;

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [studio, setStudio] = useState<string>(movieStudio || '');

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [movieTmdbId]);

  const onSubmitStudio = async () => {
    await ApiServices.updateStudio(movieId, studio);
  };

  return (
    <View
      key={movieId}
      style={{
        width: '100%',
        height: PosterSize.MEDIUM,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Poster
          path={tmdbMovie?.posterPath || null}
          width={100}
          title={tmdbMovie?.title || ''}
          onPress={() => {}}
        />
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <BodyBold style={{ marginTop: 10, marginLeft: 10 }}>
            {tmdbMovie?.title || ''}
          </BodyBold>
          <BodyBold style={{ marginTop: 10, marginLeft: 10 }}>
            {movieStudio || ''}
          </BodyBold>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              justifyContent: 'space-between',
            }}
          >
            <FormInput label={'studio'} value={studio} setValue={setStudio} />
            <TouchableText text={'SUBMIT'} onPress={onSubmitStudio} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudioItem;
