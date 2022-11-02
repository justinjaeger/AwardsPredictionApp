import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './reducers/auth';
import predictionsReducer from './reducers/predictions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore } from 'redux';

// Middleware: Redux Persist Config
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, // Storage Method (React Native)
// };

// const reducer = combineReducers({
//   auth: authReducer,
//   predictions: predictionsReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = createStore(persistedReducer);
export const store = configureStore({
  reducer: {
    auth: authReducer,
    predictions: predictionsReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// HOOKS: Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// SELECTORS: how to access data from redux store
export const useAuth = () => useAppSelector((state: RootState) => state.auth);
export const usePredictions = () =>
  useAppSelector((state: RootState) => state.predictions);
