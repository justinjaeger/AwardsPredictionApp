import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { SubHeader } from '../Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbPerson } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';

type iPersonDetailsProps = {
  tmdbId: number;
  returnPersonDetails?: (md: iCachedTmdbPerson | undefined) => void;
};

const PersonDetails = (props: iPersonDetailsProps) => {
  const { tmdbId, returnPersonDetails } = props;

  const navigation = useNavigation();

  const [personDetails, setPersonDetails] = useState<iCachedTmdbPerson | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbPerson(tmdbId).then((res) => {
      setPersonDetails(res.data);
      returnPersonDetails && returnPersonDetails(res.data);
    });
  }, [tmdbId, returnPersonDetails]);

  if (!personDetails) {
    // TODO: return loading state
    return null;
  }

  return (
    <>
      <SubHeader style={{ margin: 10 }}>{personDetails.name || ''}</SubHeader>
      {personDetails ? (
        <Poster
          path={personDetails.profilePath}
          size={PosterSize.LARGE}
          title={personDetails.name}
        />
      ) : null}
      <TouchableText
        text={'View in Imdb'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}`,
            title: personDetails.name,
          });
        }}
      />
      <TouchableText
        text={'Filmography'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}/filmotype`,
            title: personDetails.name,
          });
        }}
      />
    </>
  );
};

export default PersonDetails;
