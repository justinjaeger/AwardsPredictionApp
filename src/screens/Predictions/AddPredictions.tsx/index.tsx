import React from 'react';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { CategoryType } from '../../../types/api';
import { useEvent } from '../../../context/EventContext';
import CreatePerformance from '../CreateContender/CreatePerformance';
import CreateSong from '../CreateContender/CreateSong';
import CreateFilm from '../CreateContender/CreateFilm';

const AddPredictions = () => {
  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;
  const { type } = event.categories[category];

  const CreateComponent = (() => {
    switch (type) {
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

export default AddPredictions;
