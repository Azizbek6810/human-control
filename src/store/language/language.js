import {createSlice} from "@reduxjs/toolkit";
import {apiCall, updateLanguage} from "../config";

const language = createSlice({
    name: "language",
    initialState: {
        isLoading: false,
        isError: '',
        lang: 0,
        langData: ''
    },
    reducers: {
        onStart: (state) => {
            state.isLoading = true
            state.isError = false
        },
        onError: (state, action) => {
            state.isLoading = false
            state.isError = true
        },
        onSuccessLanguage: (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.isError = false
            state.lang = action.payload.data.language
            state.langData = action.payload
        }
    }
})

export const updateLanguages = (data) => apiCall({
    url: updateLanguage + data,
    method: "post",
    onStart: language.actions.onStart.type,
    onSuccess: language.actions.onSuccessLanguage.type,
    onError: language.actions.onError.type
})

export default language.reducer