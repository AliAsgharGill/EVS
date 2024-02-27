import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
    name: 'voteCandidates',
    initialState: {
        candidates: [
            { id: 1, name: 'Ali', votes: 0 },
            { id: 2, name: 'Ahmed', votes: 0 },
            { id: 3, name: 'Dawood', votes: 0 },
        ],
    },
    reducers: {
        voteCandidate(state, action) {
            const candidateId = action.payload;
            const candidate = state.candidates.find((c) => c.id === parseInt(candidateId));
            if (candidate) {
                candidate.votes++;
            }
        },
    },
});

export const candidatesActions = candidateSlice.actions;
export default candidateSlice.reducer;
