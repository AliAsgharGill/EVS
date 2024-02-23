import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signUpUser = createAsyncThunk('signUpUser', async (body) => {
    const response = await axios.get('http://localhost:3000/candidates', body, {
        headers: {
            'Content-Type': "application/json",
        },
    });
    return await response.json();
})


const initialState = {
    msg: '',
    user: '',
    token: '',
    loading: false,
    error: ''
}


const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(signUpUser.fulfilled, (state, { payload: { error, msg } }) => {
            state.loading = false
            if (error) {
                state.error = error
            } else {
                state.msg = msg
            }
        }
        ).addCase(
            signUpUser.rejected, (state) => {
                state.loading = true

            }
        )
    }
})

export default authSlice.reducer