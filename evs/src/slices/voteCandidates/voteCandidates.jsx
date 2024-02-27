import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
    name: 'voteCandidates',
    initialState: {
        candidates: [],
    },
    reducers: {
        voteCandidate(state, action) {
            const candidateId = action.payload;
            const candidate = state.candidates.find((c) => c.id === parseInt(candidateId));
            if (candidate) {
                candidate.votes + 1;
            }
        },
    },
});

export const { voteCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
