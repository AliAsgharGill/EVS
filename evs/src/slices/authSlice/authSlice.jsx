import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signUpUser = createAsyncThunk('signUpUser', async (body) => {
    const response = await axios.post('http://localhost:3000/signup', body, {
        headers: {
            'Content-Type': "application/json",
        },
    });
    return await response.json();
})

export const signInUser = createAsyncThunk('signInUser', async (body) => {
    const response = await axios.post('http://localhost:3000/signin', body, {
        headers: {
            'Content-Type': "application/json",
        },
    });
    return await response.json();
})

export const addNewCandidate = createAsyncThunk('addNewCandidate', async (body) => {
    const response = await axios.post('http://localhost:3000/candidates', body, {
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
    reducers: {
        addToken: (state) => { state.token = localStorage.getItem("token") },
        addUser: (state) => { state.user = localStorage.getItem("user") },
        logout: (state) => { state.token = null, localStorage.clear() }
    },
    extraReducers: (builder) => {
        // for signUp
        builder.addCase(signUpUser.pending, (state) => {
            state.loading = true
        })

            .addCase(signUpUser.fulfilled, (state, { payload: { error, msg } }) => {
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


        // for signIn
        builder.addCase(signInUser.pending, (state) => {
            state.loading = true
        })

            .addCase(signInUser.fulfilled, (state, { payload: { error, msg, token, user } }) => {
                state.loading = false
                if (error) {
                    state.error = error
                } else {
                    state.msg = msg,
                        state.token = token,
                        state.user = user

                    localStorage.setItem('msg', msg)
                    localStorage.setItem('token', JSON.stringify(user))
                    localStorage.setItem('user', user)

                }
            }
            ).addCase(
                signInUser.rejected, (state) => {
                    state.loading = true

                }
            )
        // for adding new candidate
        builder.addCase(addNewCandidate.pending, (state) => {
            state.loading = true
        })

            .addCase(addNewCandidate.fulfilled, (state, { payload: { error, msg, token, user } }) => {
                state.loading = false
                if (error) {
                    state.error = error
                } else {
                    state.msg = msg,
                        state.token = token,
                        state.user = user

                    localStorage.setItem('msg', msg)
                    localStorage.setItem('token', JSON.stringify(user))
                    localStorage.setItem('user', user)

                }
            }
            ).addCase(
                addNewCandidate.rejected, (state) => {
                    state.loading = true

                }
            )


    }
})
export const { addToken, addUser, logout, } = authSlice.actions

export default authSlice.reducer