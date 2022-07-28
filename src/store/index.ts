// Imports: Dependencies
import { shallowEqual, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
// Imports: Reducers
import { authReducer, iSuperAuth } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
});

// Selectors: how to access data from redux store

export const useAuth = () =>
  useSelector(
    (state: iSuperAuth) => ({
      ...state.auth,
    }),
    shallowEqual,
  );
