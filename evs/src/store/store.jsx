import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import authSlice from '../slices/authSlice/authSlice';
import voteCandidates from '../slices/voteCandidates/voteCandidates';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    user: authSlice,
    myCandidates: voteCandidates
  },
}); ``

export default store;
