import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://localhost:3000/programming'

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
    const response = await axios.get(apiURL)
    return response.data
}
)

export const addLanguage = createAsyncThunk('languages/addLanguage', async (language) => {
    const response = await axios.post(apiURL, language)
    return response.data
})

export const updateLanguage = createAsyncThunk('languages/updateLanguage', async (language) => {
    const response = await axios.put(`${apiURL}/${language.id}`, language)
    return response.data
})

export const deleteLanguage = createAsyncThunk('languages/deleteLanguage', async (id) => {
    axios.delete(`${apiURL}/${id}`)
    return id
})

const programmingSlice = createSlice({
    name: 'programming',
    initialState: {
        status: 'idle',
        languages: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLanguages.pending, (state) => {
            state.status = 'Loading'
        })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.languages = action.payload
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.status = 'Error'
                state.error = action.error.message
            })
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.languages.push(action.payload)
            })
            .addCase(updateLanguage.fulfilled, (state, action) => {
                const { id } = action.payload;
                const existingLanguage = state.languages.find(language => language.id === id)
                if (existingLanguage) {
                    Object.assign(existingLanguage, action.payload)
                }
            })
            .addCase(deleteLanguage.fulfilled, (state, action) => {
                state.languages = state.languages.filter(language => language.id !== action.payload)
            })
    }
})




export default programmingSlice.reducer

export const languageActions = {
    ...programmingSlice.actions, fetchLanguages, addLanguage, updateLanguage, deleteLanguage
}