import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import authSlice from '../slices/authSlice/authSlice';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    user: authSlice

  },
}); ``

export default store;
