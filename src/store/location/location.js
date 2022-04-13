import {createSlice} from "@reduxjs/toolkit";
import {apiCall, locationGetPolygon} from "../config"


const location = createSlice({
    name: 'location',
    initialState: {
        isLoading: false,
        btnLoading: false,
        error: '',
        status: '',
        locationData: '',
        data: ''
    },
    reducers: {
        onStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        btnLoading: (state) => {
            state.isLoading = true
            state.error = false
        },
        onError: (state, action) => {
            state.error = true;
            state.isLoading = false
            state.btnLoading = false
            state.status = action.payload
        },
        onSuccessLocation: (state, action) => {
            state.isLoading = false
            state.btnLoading = false
            state.data = action.payload
            state.locationData = action.payload.data
        },

    }
})

export const getLocation = (id) => apiCall({
    url: locationGetPolygon + id,
    method: 'get',
    onStart: location.actions.onStart.type,
    onSuccess: location.actions.onSuccessLocation.type,
    onFail: location.actions.onError.type
})
export default location.reducer