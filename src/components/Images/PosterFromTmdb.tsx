import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import Poster from './Poster';
import { Movie, Person, Phase } from '../../models';

export type iPosterFromTmdbProps = {
  posterDimensions: { width: number; height: number };
  ranking?: number;
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
  accolade?: Phase;
  isUnaccoladed?: boolean;
};

const PosterFromMovie = (props: iPosterFromTmdbProps & { movie: Movie }) => (
  <Poster
    path={props.movie.posterPath || null} // this will render the loading state if null
    title={props.movie.title || ''}
    {...props}
  />
);

const PosterFromPerson = (props: iPosterFromTmdbProps & { person: Person }) => (
  <Poster
    path={props.person.posterPath || null} // this will render the loading state if null
    title={props.person.name || ''}
    {...props}
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

export default React.memo(PosterFromTmdb);
