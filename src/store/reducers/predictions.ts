import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  iIndexedEvents,
  iIndexedPredictionsByCategory,
  iIndexedPredictionsByEvent,
} from '../types';
import thunkGetPersonalPredictionsByEvent from '../thunks/getPersonalPredictionsByEvent';

interface iPredictionState {
  events: iIndexedEvents;
  globalPredictions: iIndexedPredictionsByEvent;
  personalPredictions: iIndexedPredictionsByEvent;
}

const initialState: iPredictionState = {
  events: {},
  globalPredictions: {},
  personalPredictions: {},
};

export const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    getAllEvents: (
      state,
      action: PayloadAction<{
        events: iIndexedEvents;
      }>,
    ) => {
      state.events = action.payload.events;
    },
    getGlobalPredictionsByEvent: (
      state,
      action: PayloadAction<{
        eventId: string;
        globalPredictionData: iIndexedPredictionsByCategory;
      }>,
    ) => {
      state.globalPredictions = {
        ...state.globalPredictions,
        [action.payload.eventId]: action.payload.globalPredictionData,
      };
    },
    getPersonalPredictionsByEvent: (
      state,
      action: PayloadAction<{
        eventId: string;
        personalPredictionData: iIndexedPredictionsByCategory;
      }>,
    ) => {
      state.globalPredictions = {
        ...state.personalPredictions,
        [action.payload.eventId]: action.payload.personalPredictionData,
      };
    },
  },
});

export const {
  getAllEvents,
  getGlobalPredictionsByEvent,
  getPersonalPredictionsByEvent,
} = predictionsSlice.actions;

export default predictionsSlice.reducer;
