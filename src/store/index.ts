// Imports: Dependencies
import { shallowEqual, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
// Imports: Reducers
import { authReducer, iSuperAuth, iSuperOnboard, onboardReducer } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  onboard: onboardReducer,
});

// Selectors: how to access data from redux store

export const useAuth = () =>
  useSelector(
    (state: iSuperAuth) => ({
      ...state.auth,
    }),
    shallowEqual,
  );

export const useOnboard = () =>
  useSelector(
    (state: iSuperOnboard) => ({
      ...state.onboard,
    }),
    shallowEqual,
  );
