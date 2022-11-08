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
import { iCategory, iEvent } from '../../../../store/types';

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const { category: _category, event: _event } = useCategory();
  const navigation = useTypedNavigation<CreateContenderParamList>();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // Set header title (TODO: delete)
  useLayoutEffect(() => {
    const categoryList = getAwardsBodyCategories(
      AwardsBody[event.awardsBody],
      event.year,
    );
    const headerTitle = `Add ${categoryList[category.name]?.name || 'Contender'}`;
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const CreateComponent = (() => {
    switch (CategoryType[category.type]) {
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
