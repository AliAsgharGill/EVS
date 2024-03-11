import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiURL = 'http://localhost:3000/allowedUsers'

export const addAllowedUser = createAsyncThunk(
    'campaigns/addAllowedUser', async (user) => {
        const response = await axios.post(apiURL, user)
        return response.data
    }
)

export const fetchAllowedUsers = createAsyncThunk(
    'campaigns/fetchAllowedUsers', async () => {
        const response = await axios.get(apiURL)
        return response.data
    })


const allowUserSlice = createSlice({
    name: 'allowedUser',
    initialState: {
        allowedUser: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllowedUsers.pending, (state) => {
            state.status = "Loading..."
        })
            .addCase(fetchAllowedUsers.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.allowedUser = action.payload
            })
            .addCase(fetchAllowedUsers.rejected, (state, action) => {
                state.status = 'Failed'
                state.error = action.error.message
            })
            .addCase(addAllowedUser.fulfilled, (state, action) => {
                state.status = "Allowed User Added"
                state.allowedUser = [...state.allowedUser, action.payload];

            })
    }
})
export default allowUserSlice.reducer

export const allowUserActions = {
    ...allowUserSlice.actions, addAllowedUser, fetchAllowedUsers
}