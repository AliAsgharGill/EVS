import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import authSlice from '../slices/authSlice/authSlice';
import voteCandidates from '../slices/voteCandidates/voteCandidates';
import campaignSlice from '../slices/campaignSlice'

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    user: authSlice,
    myCandidates: voteCandidates,
    voteCandidates: voteCandidates,
    campaign: campaignSlice
  },
});

export default store;
