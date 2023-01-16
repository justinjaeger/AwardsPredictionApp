import React from 'react';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';
import { CategoryType } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iPrediction } from '../../../types';

export type iCreateContenderProps = {
  onSelectPrediction: (p: iPrediction) => void;
};

// TODO: should only be able to do this if logged in
const CreateContender = (props: iCreateContenderProps) => {
  const { onSelectPrediction } = props;

  const { category: _category } = useCategory();

  const category = _category as iCategory;

  const CreateComponent = (() => {
    switch (category.type) {
      case CategoryType.FILM:
        return <CreateFilm onSelectPrediction={onSelectPrediction} />;
      case CategoryType.PERFORMANCE:
        return <CreatePerformance onSelectPrediction={onSelectPrediction} />;
      case CategoryType.SONG:
        return <CreateSong onSelectPrediction={onSelectPrediction} />;
    }
  })();

  return <>{CreateComponent}</>;
};

export default CreateContender;
