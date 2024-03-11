import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd'

const apiURL = 'http://localhost:3000/campaigns'


export const fetchCampaigns = createAsyncThunk(
    'campaigns/fetchCampaigns', async () => {
        const response = await axios.get(apiURL)
        return response.data
    })

export const addCampaign = createAsyncThunk(
    'campaigns/addCampaigns', async (campaign) => {
        const response = await axios.post(apiURL, campaign)
        return response.data
    }
)


export const updateCampaign = createAsyncThunk('campaigns/updateCampagin', async (campaignData) => {
    const response = await axios.put(`${apiURL}/${campaignData.id}`, campaignData)
    return response.data
})

export const updateVotes = createAsyncThunk('campaigns/upadateVotes',
    async ({ campaignId, candidateId }) => {
        const response = await axios.patch(`${apiURL}/${campaignId}/candidates/${candidateId}`, { vote: 1 + 1 });
        return response.data;
    })

export const deleteCampaign = createAsyncThunk('campaigns/DeleteCampaign', async (id) => {
    axios.delete(`${apiURL}/${id}`)
    return id
})

const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        campaigns: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addCandidateToCampaign(state, action) {
            const { campaignId, candidate } = action.payload;
            const campaignIndex = state.candidates.findIndex(c => c.id === campaignId);
            if (campaignIndex !== -1) {
                state.campaigns[campaignIndex].candidates.push(candidate);
                message.success("Successfully Added")
            } else {
                message.error("Data Not Added!")
            }
        }
    },
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
            .addCase(addCampaign.fulfilled, (state, action) => {
                state.status = "New Campaign Added"
                // state.campaigns.push(action.payload)
                state.campaigns = [...state.campaigns, action.payload];

            })
            .addCase(updateCampaign.fulfilled, (state, action) => {
                const findIndex = state.campaigns.findIndex(c => c.id === action.payload.id)
                if (findIndex !== -1) {
                    state.campaigns[findIndex] = action.payload
                }
            }).addCase(deleteCampaign.fulfilled, (state, action) => {
                state.campaigns = state.campaigns.filter(c => c.id !== action.payload)
            }).addCase(
                updateVotes.pending, (state) => {
                    state.status = "Updating..."
                }
            )
            .addCase(updateVotes.fulfilled, (state, action) => {
                state.status = "Succeeded";
                // Update the votes for the candidate in the campaigns array
                const { id, votes } = action.payload;
                state.campaigns.forEach((campaign) => {
                    const candidateToUpdate = campaign.candidates.find((candidate) => candidate.id === id);
                    if (candidateToUpdate) {
                        candidateToUpdate.votes = votes;
                    }
                });
            })
    }

})

export const { addCandidateToCampaign } = campaignSlice.actions
export default campaignSlice.reducer

export const campaignActions = {
    ...campaignSlice.actions, fetchCampaigns, addCampaign, updateCampaign, deleteCampaign
}