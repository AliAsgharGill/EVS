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
    async (participant) => {
        const response = await axios.patch(`http://localhost:3000/dynamicCandidates/${participant.id}`, { votes: participant.votes + 1 });
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
export const updateCandidate = createAsyncThunk(
    'candidate/updateCandidate', async (candidate) => {
        const response = await axios.put(`http://localhost:3000/dynamicCandidates/${candidate.id}`, candidate)
        return response.data
    }
)
export const deleteCandidate = createAsyncThunk(
    'candidate/deleteCanidate', async (id) => {
        await axios.delete(`http://localhost:3000/dynamicCandidates/${id}`);
        return id;
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
                state.candidates = state.candidates.map((candidate) =>
                    candidate.id === action.payload.id ? { ...candidate, votes: action.payload.votes } : candidate
                );
                // const updatedCandidate = action.payload;
                // console.log("updatedCandidate", updatedCandidate);
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
            }).addCase(updateCandidate.fulfilled, (state, action) => {
                const index = state.candidates.findIndex((c) => c.id === action.payload.id)
                if (index !== -1) {
                    state.candidates[index] = action.payload
                }
            }).addCase(deleteCandidate.fulfilled, (state, action) => {
                state.candidates = state.candidates.filter(c => c.id !== action.payload)
            })
    },
});

export default dyanmicCandidatesSlice.reducer;
export const campaignActions = {
    ...dyanmicCandidatesSlice, updateCandidateVotes, fetchDynamicCandidates, addCandidate, deleteCandidate, updateCandidate
}