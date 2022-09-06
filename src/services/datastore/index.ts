import * as ContenderService from './contender';
import * as MovieService from './movie';
import * as PersonService from './person';
import * as SongService from './song';

const DS = {
  ...ContenderService,
  ...MovieService,
  ...PersonService,
  ...SongService,
};

export default DS;
