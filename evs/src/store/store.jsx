import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/canidateSlice/canidateSlice';
import voteCandidates from '../slices/voteCandidates/voteCandidates';
import campaignSlice from '../slices/campaignSlice'
import adminSlice from '../slices/adminSlice/adminSlice';
import userSlice from '../slices/userSlice/userSlice';

const store = configureStore({
  reducer: {
    candidates: candidateReducer,    
    myCandidates: voteCandidates,
    voteCandidates: voteCandidates,
    campaign: campaignSlice,
    admin: adminSlice,
    users: userSlice
  },
});

export default store;
