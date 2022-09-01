import * as ContenderService from './contender';
import * as MovieService from './movie';

const DS = {
  ...ContenderService,
  ...MovieService,
};

export default DS;
