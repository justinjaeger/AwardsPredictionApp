import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { GetContenderQuery } from '../../../API';
import ContenderDetails from '../../../components/ContenderDetails';
import { PredictionsParamList } from '../../../navigation/types';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';

const ContenderDetailsScreen = () => {
  const {
    params: { categoryType, contenderId, personTmdb },
  } = useRoute<RouteProp<PredictionsParamList, 'ContenderDetails'>>();

  const [contender, setContender] = useState<GetContenderQuery>();

  // NOTE: shouldn't have to do this if we can store the contender in context (else we resort to passing in contenderId)
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getContenderById(contenderId);
    setContender(data);
  }, [contenderId]);

  const c = contender?.getContender;
  if (!c) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        alignSelf: 'center',
        paddingTop: '5%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <ContenderDetails
        movieTmdbId={c.movie.tmdbId}
        movieStudio={c.movie.studio || undefined}
        personTmdbId={personTmdb}
        songId={c.songId || undefined}
        categoryType={categoryType}
      />
    </ScrollView>
  );
};

export default ContenderDetailsScreen;
