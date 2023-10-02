import React from 'react';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';
import { useEvent } from '../../../context/EventContext';
import { CategoryType, iPrediction } from '../../../types/api';

export type iCreateContenderProps = {
  onSelectPrediction: (prediction: iPrediction) => void;
};

// TODO: should only be able to do this if logged in
const CreateContender = ({ onSelectPrediction }: iCreateContenderProps) => {
  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;
  const { type } = event.categories[category];

  const CreateComponent = (() => {
    switch (type) {
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
