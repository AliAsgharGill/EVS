import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        currentAdmin: null
    },
    reducers: {
        setAdmin: (state, action) => {
            state.currentAdmin = action.payload
        },
        clearAdmin: (state) => {
            state.currentAdmin = null
        }
    }
})
export const { setAdmin, clearAdmin } = adminSlice.actions
export default adminSlice.reducer