import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import Snackbar from '../../components/Snackbar';

const TMDB_URL = 'https://api.themoviedb.org/3';

export interface iTMDBServiceReturn<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

export const handleError = (message?: string, error?: any): iTMDBServiceReturn<any> => {
  console.error(message, JSON.stringify(error));
  const m = error.message || message;
  Snackbar.error(m || '');
  return { status: 'error', message: m, error: error.name };
};

const search = async (
  searchText: string,
  minYear: number,
): Promise<iTMDBServiceReturn<any>> => {
  try {
    const url = `${TMDB_URL}/search/movie/?query=${searchText.toLowerCase()}&api_key=${TMDB_API_KEY}`;
    // fetch(url)
    //   .then((r) => r.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error('err', err));
    // console.error('url', url);
    const u =
      'https://api.themoviedb.org/3/search/movie/?query=everything&api_key=d9a96448d1a564273c49ec13f752084f';
    axios(u)
      .then((res) => console.error('res', res))
      .catch((err) => console.error('err', err, JSON.stringify(err)));
    // console.log('res', res);
    return { status: 'success' };
    // TODO: sort by popularity, filter by minYear
  } catch (err) {
    return handleError('error searching tmdb', err);
  }
};

const TMDBServices = {
  search,
};

export default TMDBServices;
