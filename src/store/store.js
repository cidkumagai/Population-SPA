import { configureStore } from '@reduxjs/toolkit';
import populationReducer from '../population/populationSlice';

export const store = configureStore({
  reducer: {
    populations: populationReducer,
  },
});