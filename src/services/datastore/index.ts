import * as ContenderService from './contender';
import * as MovieService from './movie';
import * as PersonService from './person';

const DS = {
  ...ContenderService,
  ...MovieService,
  ...PersonService,
};

export default DS;
