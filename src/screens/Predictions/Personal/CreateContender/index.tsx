import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { CreateContenderParamList } from '../../../../navigation/types';
import { getAwardsBodyCategories } from '../../../../constants/categories';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';
import { useTypedNavigation } from '../../../../util/hooks';
import { AwardsBody, CategoryType } from '../../../../API';
import { useCategory } from '../../../../context/CategoryContext';

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const { category } = useCategory();
  const navigation = useTypedNavigation<CreateContenderParamList>();

  const cat = category?.getCategory;

  // Set header title
  useLayoutEffect(() => {
    const e = cat?.event;
    if (!e || !cat) return;
    const categoryList = getAwardsBodyCategories(AwardsBody[e.awardsBody], e.year);
    const headerTitle = `Add ${categoryList[cat.name]?.name || 'Contender'}`;
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const CreateComponent = (() => {
    if (!cat) return null;
    switch (CategoryType[cat.type]) {
      case CategoryType.FILM:
        return <CreateFilm />;
      case CategoryType.PERFORMANCE:
        return <CreatePerformance />;
      case CategoryType.SONG:
        return <CreateSong />;
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
