import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import Poster from './Poster';
import { Movie, Person, Phase } from '../../types/api';

type iPosterFromTmdbProps = {
  width: number;
  ranking?: number;
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
  accolade?: Phase;
};

const PosterFromMovie = ({
  movie,
  width,
  onPress,
  ranking,
  styles,
  accolade,
}: iPosterFromTmdbProps & { movie: Movie }) => (
  <Poster
    path={movie.posterPath || null} // this will render the loading state if null
    title={movie.title || ''}
    width={width}
    ranking={ranking}
    onPress={onPress}
    styles={styles}
    accolade={accolade}
  />
);

const PosterFromPerson = ({
  person,
  onPress,
  width,
  ranking,
  styles,
  accolade,
}: iPosterFromTmdbProps & { person: Person }) => (
  <Poster
    path={person.posterPath || null} // this will render the loading state if null
    title={person.name || ''}
    width={width}
    ranking={ranking}
    onPress={onPress}
    styles={styles}
    accolade={accolade}
  />
);

const PosterFromTmdb = (
  props: iPosterFromTmdbProps & {
    movie?: Movie;
    person?: Person;
  },
) =>
  props.person ? (
    <PosterFromPerson {...props} person={props.person} />
  ) : props.movie ? (
    <PosterFromMovie {...props} movie={props.movie} />
  ) : null;

// maybe it's the memoization?
export default React.memo(PosterFromTmdb);
