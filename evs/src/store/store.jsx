import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import authSlice from '../slices/authSlice/authSlice';
import voteCandidates from '../slices/voteCandidates/voteCandidates';
import campaignSlice from '../slices/campaignSlice'
import programmingSlice from '../slices/programmingSlice/programmingSlice';
import adminSlice from '../slices/adminSlice/adminSlice';
import userSlice from '../slices/userSlice/userSlice';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    user: authSlice,
    myCandidates: voteCandidates,
    voteCandidates: voteCandidates,
    campaign: campaignSlice,
    programming: programmingSlice,
    admin: adminSlice,
    users: userSlice
  },
});

export default store;
