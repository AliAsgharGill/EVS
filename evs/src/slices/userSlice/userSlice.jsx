import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        clearUser: (state) => {
            state.currentUser = null
        }
    }
})
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer    