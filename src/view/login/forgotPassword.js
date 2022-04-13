import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getVerifyCode} from "../../store/auth/auth";
import {useHistory} from "react-router-dom";

function ForgotPassword() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [handleSubmit, setHandleSubmit] = useState(false)
    const {verifyCodeStatus} = useSelector(state => state.auth)

    useEffect(() => {
        if (verifyCodeStatus.code === 0) {
            history.push('/new-password')
        }
    }, [verifyCodeStatus])

    function onsubmit(e) {
        e.preventDefault()
        dispatch(getVerifyCode({
            userName: e.target[0].value,
            verifiCod: e.target[1].value
        }))

    }

    return (
        <div className={'login-background'}>
            <Grid className={'login-card'}>
                <form onSubmit={onsubmit}>
                    <Typography align="center" variant="h6">
                        We send verify code to your email. Please enter your code
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        type={"text"}
                        variant="standard"
                        label={'UserName'}
                    />
                    <TextField
                        fullWidth
                        required
                        type={"text"}
                        variant="standard"
                        style={{marginBottom: 20, marginTop: 10}}
                        label={'verifyCode'}
                        inputProps={{maxLength: 6}}
                    />
                    <div style={{textAlign: 'center'}}>
                        <Button size={"small"} type={'submit'} variant={'contained'}
                                color={'primary'} fullWidth>Verify</Button>
                    </div>
                </form>
            </Grid>
        </div>
    );
}

export default ForgotPassword;