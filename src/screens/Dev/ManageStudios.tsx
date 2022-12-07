import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ListMoviesQuery } from '../../API';
import { TouchableText } from '../../components/Buttons';
import Poster from '../../components/Images/Poster';
import FormInput from '../../components/Inputs/FormInput';
import { BodyLarge } from '../../components/Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../services/cache/types';
import ApiServices from '../../services/graphql';
import TmdbServices from '../../services/tmdb';
import { useAsyncEffect } from '../../util/hooks';

// TODO: no list order yet. eventually have to define something
const ManageStudios = () => {
  const [movies, setMovies] = useState<ListMoviesQuery>();

  useAsyncEffect(async () => {
    const { data } = await ApiServices.getAllMovies();
    setMovies(data);
  }, []);

  const ms = movies?.listMovies?.items;

  if (!ms) return null;

  const sortedItems = ms.sort((m) => {
    if (!m) return 0;
    return !!m.studio === false ? -1 : 1;
  });

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {sortedItems.map((m) => {
        if (!m) return null;
        return (
          <StudioItem
            movieTmdbId={m.tmdbId}
            movieId={m.id}
            movieStudio={m.studio || undefined}
          />
        );
      })}
    </ScrollView>
  );
};

export default ManageStudios;

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
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {tmdbMovie?.title || ''}
          </BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {movieStudio || ''}
          </BodyLarge>
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
