import {createSlice} from "@reduxjs/toolkit";
import {Base64} from "js-base64";
import {
    userLogin,
    userUserInfo,
    userRegister,
    apiCall,
    sendMessageEmail,
    getVeryfyCode,
    setNewPassword
} from "../config";

const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        btnLoading: false,
        error: '',
        status: '',
        data: '',
        profileData: '',
        roleSupperAdmin: false,
        roleAdmin: false,
        roleUser: false,
        registerData: '',
        sendEmailStatus: '',
        verifyCodeStatus: "",
        newPasswordStatus: ''
    },
    reducers: {
        onStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        btnLoading: (state) => {
            state.btnLoading = true
            state.error = false
        },
        onError: (state, action) => {
            state.isLoading = false
            state.error = true;
            state.status = action.payload
            state.btnLoading = false
        },
        onSuccessLogin: (state, action) => {
            localStorage.setItem('posToken', Base64.encode(action.payload.data.token))
            state.isLoading = false
            state.btnLoading = false
            state.data = action.payload.status
        },
        getProfileData: (state, action) => {
            console.log(action.payload)
            state.isLoading = false
            state.profileData = action.payload.status
            localStorage.setItem('Authority', Base64.encode(JSON.stringify((action.payload))))
        },
        registration: (state, action) => {
            state.isLoading = false
            state.registerData = action.payload.status
        },
        onSendMessageMail: (state, action) => {
            state.isLoading = false
            state.sendEmailStatus = action.payload.status
        },
        getVerifyCode: (state, action) => {
            state.isLoading = false
            state.verifyCodeStatus = action.payload.status
        },
        SuccessNewPassword: (state, action) => {
            state.isLoading = false
            state.newPasswordStatus = action.payload.status
        }
    }
})

export const onStart = (data) => apiCall({
    url: userLogin,
    method: 'post',
    data,
    onStart: auth.actions.btnLoading.type,
    onSuccess: auth.actions.onSuccessLogin.type,
    onFail: auth.actions.onError.type
})

export const getProfile = () => apiCall({
    url: userUserInfo,
    method: 'get',
    onStart: auth.actions.onStart.type,
    onSuccess: auth.actions.getProfileData.type,
    onFail: auth.actions.onError.type
})

export const getRegister = (data) => apiCall({
    url: userRegister,
    method: "post",
    data,
    onStart: auth.actions.onStart.type,
    onSuccess: auth.actions.registration.type,
    onFail: auth.actions.onError.type
})

export const SendMessageEmail = (data) => apiCall({
    url: sendMessageEmail,
    method: "post",
    data,
    onStart: auth.actions.onStart.type,
    onSuccess: auth.actions.onSendMessageMail.type,
    onFail: auth.actions.onError.type
})

export const getVerifyCode = (data) => apiCall({
    url: getVeryfyCode,
    method: "post",
    data,
    onStart: auth.actions.onStart.type,
    onSuccess: auth.actions.getVerifyCode.type,
    onFail: auth.actions.onError.type
})

export const SetNewPassword = (data) => apiCall({
    url: setNewPassword,
    method: "post",
    data,
    onStart: auth.actions.onStart.type,
    onSuccess: auth.actions.SuccessNewPassword.type,
    onFail: auth.actions.onError.type
})

export default auth.reducer