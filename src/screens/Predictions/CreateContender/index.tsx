import React, { useLayoutEffect } from 'react';
import { getAwardsBodyCategories } from '../../../constants/categories';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';
import { useTypedNavigation } from '../../../util/hooks';
import { AwardsBody, CategoryType } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent } from '../../../types';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { PredictionsParamList } from '../../../navigation/types';
import { getHeaderTitle } from '../../../constants';

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const { category: _category, event: _event } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

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
      headerTitle: getHeaderTitle(headerTitle),
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

  return <BackgroundWrapper>{CreateComponent}</BackgroundWrapper>;
};

export default CreateContender;
