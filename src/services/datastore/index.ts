import * as ContenderService from './contender';
import * as MovieService from './movie';
import * as PersonService from './person';
import * as SongService from './song';
import * as PredictionService from './user/predictions';

const DS = {
  ...ContenderService,
  ...MovieService,
  ...PersonService,
  ...SongService,
  ...PredictionService,
};

export default DS;
