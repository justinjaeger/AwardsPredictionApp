import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import ContenderDetails from '../../../components/ContenderDetails';
import { GlobalParamList } from '../../../navigation/types';

const ContenderDetailsScreen = () => {
  const {
    params: { categoryType, contender, personTmdb },
  } = useRoute<RouteProp<GlobalParamList, 'ContenderDetails'>>();

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
        movie={contender.movie}
        personTmdbId={personTmdb}
        songId={contender.contenderSongId || undefined}
        categoryType={categoryType}
      />
    </ScrollView>
  );
};

export default ContenderDetailsScreen;
