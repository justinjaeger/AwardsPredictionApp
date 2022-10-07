import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { CreateContenderParamList } from '../../navigation/types';
import { Category, CategoryType, AwardsBody } from '../../models';
import { getAwardsBodyCategories } from '../../constants/categories';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';

export type iCreateContenderProps = { category: Category };

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<CreateContenderParamList, 'CreateContender'>>();
  const navigation = useNavigation();

  // Set header title
  useLayoutEffect(() => {
    const e = category.event;
    if (!e) return;
    const categoryList = getAwardsBodyCategories(AwardsBody[e.awardsBody], e.year);
    const headerTitle = `Add ${categoryList[category.name]?.name || 'Contender'}`;
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const CreateComponent = (() => {
    switch (CategoryType[category.type]) {
      case CategoryType.FILM:
        return <CreateFilm category={category} />;
      case CategoryType.PERFORMANCE:
        return <CreatePerformance category={category} />;
      case CategoryType.SONG:
        return <CreateSong category={category} />;
    }
  })();

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      {CreateComponent}
    </ScrollView>
  );
};

export default CreateContender;
