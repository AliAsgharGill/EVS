import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: []
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        logoutUser: (state) => {
            state.currentUser = null
        }
    }
})
export const { setUser, logoutUser } = userSlice.actions
export const selectUser = state => state.users.currentUser
export default userSlice.reducer    