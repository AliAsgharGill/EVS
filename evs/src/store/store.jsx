import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import voteCandidates from '../slices/voteCandidates/voteCandidates';
import campaignSlice from '../slices/campaignSlice'
import adminSlice from '../slices/adminSlice/adminSlice';
import userSlice from '../slices/userSlice/userSlice';
import dyanmicCandidateSlice from '../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    dynamicCandidates: dyanmicCandidateSlice,
    voteCandidates: voteCandidates,
    campaign: campaignSlice,
    admin: adminSlice,
    users: userSlice

  },
});

export default store;
