import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice';
import authSlice from '../slices/authSlice';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    user: authSlice

  },
}); ``

export default store;
