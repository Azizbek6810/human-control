import React, {useEffect, useState} from 'react';
import './login.css'
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {FormControl, FormHelperText, Grid, Input, InputLabel, Button, TextField, CircularProgress} from "@mui/material";
import {Language} from "../../Component/Language/Language";
import {getRegister} from "../../store/auth/auth";

function Register(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('')
    const {userName, firstname, lastname, Email, middleName, password} = Language
    const {btnLoading, registerData} = useSelector(state => state.auth)

    useEffect(() => {
        if (registerData.code === 0) {
            history.replace('/login')
        }
    }, [registerData, history])

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(getRegister({
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            middleName: event.target[2].value,
            userName: event.target[3].value,
            birthDate: event.target[4].value,
            email: event.target[5].value,
            password: event.target[6].value,
        }))
    }

    return (
        <div className={'login-background'}>
            <Grid style={{
                background: "white",
                opacity: "0.8",
                paddingRight: "3%",
                paddingLeft: "3%",
                paddingBottom: "1%",
                paddingTop: "1%",
                borderRadius: "10px",
            }}>
                <h2 className={'h2'}>Registration</h2>
                <form onSubmit={onSubmit}>
                    <TextField
                        name={'firstName'}
                        type={'text'}
                        variant={'standard'}
                        label={'firstname'}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'lastName'}
                        type={'text'}
                        variant={'standard'}
                        label={'lastname'}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'middleName'}
                        type={'text'}
                        variant={'standard'}
                        label={'middlename'}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'userName'}
                        type={'text'}
                        variant={'standard'}
                        label={'username'}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'birthDate'}
                        type={"date"}
                        variant={'standard'}
                        label={'birthday'}
                        InputLabelProps={{shrink: true, required: true}}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'email'}
                        type={'email'}
                        variant={'standard'}
                        label={'email'}
                        style={{marginBottom: 10, display: "block"}}
                        required
                    />
                    <TextField
                        name={'password'}
                        type={'password'}
                        variant={'standard'}
                        label={'password'}
                        style={{marginBottom: 20, display: "block"}}
                        required
                    />
                    <div style={{textAlign: 'center'}}>
                        {btnLoading ? <CircularProgress size={26} disableShrink/> :
                            <Button size={"small"} type={'submit'} variant={'contained'}
                                    color={'primary'}>Register</Button>}
                    </div>
                </form>
                <div className={'registerClass'}><span
                    style={{color: "black", marginRight: "1%"}}>To Login?</span>
                    <Link className={'btnReg'}
                          to={'/login'}>Login
                    </Link>
                </div>
            </Grid>
        </div>
    );
}

export default Register;