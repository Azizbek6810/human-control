import React, {useEffect} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {SetNewPassword} from "../../store/auth/auth";

function NewPassword() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {newPasswordStatus} = useSelector(state => state.auth)

    useEffect(() => {
        if (newPasswordStatus.code === 0) {
            history.push('/login')
        }
    }, [newPasswordStatus])

    function onsubmit(e) {
        e.preventDefault()
        dispatch(SetNewPassword({
            userName: e.target[0].value,
            newPassword: e.target[1].value
        }))

    }


    return (
        <div className={'login-background'}>
            <Grid className={'login-card'}>
                <form onSubmit={onsubmit}>
                    <Typography align="center" variant="h6">
                        Reset your password
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        type={"text"}
                        variant="standard"
                        label={'UserName'}
                        name={'userName'}
                    />
                    <TextField
                        fullWidth
                        required
                        type={"text"}
                        variant="standard"
                        style={{marginBottom: 20, marginTop: 10}}
                        label={'newPassword'}
                        name={'newPassword'}
                    />
                    <div style={{textAlign: 'center'}}>
                        <Button size={"small"} type={'submit'} variant={'contained'}
                                color={'primary'} fullWidth>Reset</Button>
                    </div>
                </form>
            </Grid>
        </div>
    );
}

export default NewPassword;