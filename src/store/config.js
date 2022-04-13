import {createAction} from "@reduxjs/toolkit";

export const apiCall = createAction('api/apiCall')

//auth

export const userLogin = 'user/login'
export const userUserInfo = 'user/userInfo'
export const userRegister = 'user/register'
export const updateLanguage = 'user/updateLang/'
export const userUpdate = 'user/editUser'
export const getVeryfyCode = 'user/login/verifiCod'
export const setNewPassword = 'user/login/newPassword'
export const sendMessageEmail = 'user/login/sendMessageMail'

// location
export const locationGetPolygon = 'location/getPolygons/'

export const apiKey = 'AIzaSyCiIWmKISFxPIshj9ellMzv2aquZ5crqeU'