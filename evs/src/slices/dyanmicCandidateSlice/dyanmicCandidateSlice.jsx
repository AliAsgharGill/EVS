import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    candidates: [],
    status: 'idle',
    error: null,
};

export const fetchDynamicCandidates = createAsyncThunk('candidates/fetchDynamicCandidates', async () => {
    const response = await axios.get('http://localhost:3000/dynamicCandidates')
    return response.data
})

export const updateCandidateVotes = createAsyncThunk(
    'candidates/updateCandidateVotes',
    async ({ campaignId, candidateId, votes }) => {
        const response = await axios.put(`http://localhost:3000/campaigns/${campaignId}/candidates/${candidateId}`, { votes });
        return response.data;
    }
);

export const addCandidate = createAsyncThunk(
    'candidates/addCandidate',
    async (candidate) => {
        // console.log("Received Data", candidate);
        const response = await axios.post('http://localhost:3000/dynamicCandidates', candidate)
        return response.data
    }
)

const dyanmicCandidatesSlice = createSlice({
    name: 'dynamicCandidates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDynamicCandidates.pending, (state) => {
                state.status = 'idle'
            }).addCase(fetchDynamicCandidates.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.candidates = action.payload
            }).addCase(fetchDynamicCandidates.rejected, (state, action) => {
                state.status = 'Failed'
                action.error = action.error.message
            })
            .addCase(updateCandidateVotes.pending, (state) => {
                state.status = 'loading';
                console.log("Loading Done");
            })
            .addCase(updateCandidateVotes.fulfilled, (state, action) => {
                state.status = 'idle';
                const updatedCandidate = action.payload;
                const campaignIndex = state.candidates.findIndex(campaign => campaign.id === updatedCandidate.campaignId);
                const candidateIndex = state.candidates[campaignIndex].candidates.findIndex(candidate => candidate.id === updatedCandidate.id);
                state.candidates[campaignIndex].candidates[candidateIndex].votes = updatedCandidate.votes;
                console.log("Fulfilled Done");
            })
            .addCase(updateCandidateVotes.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
                console.log("Rej Done");
            })
            .addCase(addCandidate.pending, (state) => {
                state.status = "idle"
                console.log("Add Candidate Pending");
            }).addCase(addCandidate.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.candidates = action.payload
                console.log("Add Candidate Fulfilled ");
            }).addCase(addCandidate.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error.message
                console.log("Add Candidate Rejected");
            })
    },
});

export default dyanmicCandidatesSlice.reducer;
export const campaignActions = {
    ...dyanmicCandidatesSlice, updateCandidateVotes, fetchDynamicCandidates, addCandidate
}