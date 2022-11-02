import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  iIndexedEvents,
  iIndexedPredictions,
  iIndexedPredictionsByEvent,
} from '../types';

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
        globalPredictionData: iIndexedPredictions;
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
        personalPredictionData: iIndexedPredictions;
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
