import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import Poster from '../../components/Images/Poster';
import FormInput from '../../components/Inputs/FormInput';
import { BodyLarge } from '../../components/Text';
import { PosterSize } from '../../constants/posterDimensions';
import { Movie } from '../../models';
import { iCachedTmdbMovie } from '../../services/cache/types';
import DS from '../../services/datastore';
import TmdbServices from '../../services/tmdb';

// TODO: no list order yet. eventually have to define something
const ManageStudios = () => {
  const [movies, setMovies] = useState<Movie[] | undefined>();

  useEffect(() => {
    const sub = DataStore.observeQuery(Movie).subscribe(({ items }) => {
      setMovies(items);
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {movies ? movies.map((m) => <StudioItem movie={m} />) : null}
    </ScrollView>
  );
};

export default ManageStudios;

const StudioItem = (props: { movie: Movie }) => {
  const { movie } = props;
  const movieTmdbId = movie.tmdbId;

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [studio, setStudio] = useState<string>('');

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [movieTmdbId]);

  const onSubmitStudio = async () => {
    await DS.updateStudio(movie.id, studio);
    setStudio('');
  };

  return (
    <View
      style={{
        width: '100%',
        height: PosterSize.MEDIUM,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Poster
          path={tmdbMovie?.posterPath || null}
          title={tmdbMovie?.title || ''}
          onPress={() => {}}
        />
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {tmdbMovie?.title || ''}
          </BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {movie.studio || ''}
          </BodyLarge>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <FormInput label={'studio'} value={studio} setValue={setStudio} />
            <TouchableText text={'submit'} onPress={onSubmitStudio} />
          </View>
        </View>
      </View>
    </View>
  );
};
