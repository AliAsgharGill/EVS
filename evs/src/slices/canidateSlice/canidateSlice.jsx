import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const apiURL = 'http://localhost:3000/candidates'

export const fetchCandidates = createAsyncThunk(
  'candidate/fetchCandidate', async () => {
    const response = await axios.get(apiURL)
    return response.data
  }
)

export const addNewCanidate = createAsyncThunk(
  'candidates/addNewCandidate', async (candidate) => {
    const response = await axios.post(apiURL, candidate)
    return response.data
  }
)

export const updateCandidate = createAsyncThunk(
  'candidate/updateCandidate', async (candidate) => {
    const response = await axios.put(`${apiURL}/${candidate.id}`, candidate)
    return response.data
  }
)
export const voteCandidate = createAsyncThunk(
  'candidate/voteCandidate', async (id) => {
    const response = await axios.put(`${apiURL}/${id}`, id)
    return response.data
  }
)

export const updateCandidateVotes = createAsyncThunk(
  'candidates/updateVotes',
  async ({ id, votes }) => {
    const response = await axios.patch(`${apiURL}/${id}`, { votes });
    return response.data;
  }
);

export const deleteCandidate = createAsyncThunk(
  'candidate/deleteCanidate', async (id) => {
    await axios.delete(`${apiURL}/${id}`);
    return id;
  }
)

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidates: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addCandidate(state, action) {
      const { name, campaignId } = action.payload;
      const newCandidate = {
        id: state.length + 1,
        name,
        campaignId,
      };
      state.candidates.push(newCandidate);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCandidates.pending, (state) => {
        state.status = 'Loading...'
      },
    )
      .addCase(
        fetchCandidates.fulfilled, (state, action) => {
          state.status = "Succeeded";
          state.candidates = action.payload;
        },
      )
      .addCase(
        fetchCandidates.rejected, (state, action) => {
          state.status = "Failed";
          state.error = action.error.message
        }
      )
      .addCase(addNewCanidate.fulfilled, (state, action) => {
        state.candidates.push(action.payload)
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        const index = state.candidates.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.candidates[index] = action.payload
        }
      })
      .addCase(updateCandidateVotes.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(updateCandidateVotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedCandidate = action.payload;
        state.candidates.map(can => can.id === updatedCandidate.id ? { ...can, votes: updatedCandidate.votes } : can)
        // state.candidates = state.candidates.map(candidate =>
        //   candidate.id === updatedCandidate.id ? { ...candidate, votes: updatedCandidate.votes } : candidate
        // );
      })
      .addCase(updateCandidateVotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.candidates = state.candidates.filter(c => c.id !== action.payload)
      })

  },
});

export const { addCandidate } = candidateSlice.actions
export default candidateSlice.reducer;

export const candidatesActions = {
  ...candidateSlice.actions,
  fetchCandidates, addNewCanidate, updateCandidate, deleteCandidate, updateCandidateVotes
}