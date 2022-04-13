import {createSlice} from "@reduxjs/toolkit";
import {apiCall, userUpdate} from '../config'

const user = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        isError: false,
        userMessage: ''
    },
    reducers: {
        onStart: (state) => {
            state.isLoading = true
            state.isError = false
        },
        onFail: (state) => {
            state.isLoading = false
            state.isError = true
        },
        userUpdateSuccess: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.userMessage = action.payload.message
        }
    }
})

export const updateUser = (data, params) => apiCall({
    url: userUpdate,
    method: 'post',
    data,
    params: params,
    onStart: user.actions.onStart.type,
    onSuccess: user.actions.userUpdateSuccess.type,
    onFail: user.actions.onFail.type
})

export default user.reducer