import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './redux/notesSlice';

// Redux store setup
export const store = configureStore({
  reducer: {
    note: notesReducer, // Notes state management
  },
});
