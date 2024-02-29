import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiURL = 'http://localhost:3000/campaigns'

export const fetchCampaigns = createAsyncThunk(
    'campaigns/fetchCampaigns', async () => {
        const response = await axios.get(apiURL)
        return response.data
    })

const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        campaigns: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCampaigns.pending, (state) => {
            state.status = "Loading..."
        })
            .addCase(fetchCampaigns.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.campaigns = action.payload
            })
            .addCase(fetchCampaigns.rejected, (state, action) => {
                state.status = 'Failed'
                state.error = action.error.message
            })
    }

})

export default campaignSlice.reducer

export const campaignActions = {
    ...campaignSlice.actions, fetchCampaigns
}