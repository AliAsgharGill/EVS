import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchCandidates = createAsyncThunk(
  'candidate/fetchCandidate', async () => {
    const response = await axios.get('http://localhost:3000/candidates')
    return response.data
  }
)

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidates: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
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
  }

});

export default candidateSlice.reducer;
