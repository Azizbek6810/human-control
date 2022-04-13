import {useDispatch, useSelector} from "react-redux";
import {Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {getProfile, onStart, SendMessageEmail} from "../../store/auth/auth";
import './login.css'
import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Base64} from "js-base64";

function Login() {

    const dispatch = useDispatch()
    const history = useHistory()

    const {isLoading, btnLoading, data, profileData,} = useSelector(state => state.auth)
    const [profile, setProfile] = useState(localStorage.getItem('Authority') ? JSON.parse(Base64.decode(localStorage.getItem('Authority'))) : "")
    const [username, setUserName] = useState('')

    useEffect(() => {
        localStorage.clear()
    }, [])
    console.log(profile)

    useEffect(() => {
        if (profileData.code === 0) {
            if (localStorage.getItem('posToken')) {
                history.push('/')
            }
        }
    }, [profileData])

    useEffect(() => {
        if (data.code === 0 && localStorage.getItem('posToken')) {
            dispatch(getProfile())
        }
    }, [data])

    function submit(event) {
        event.preventDefault()
        dispatch(onStart({userName: event.target[0].value, password: event.target[1].value}))
    }

    const getUserName = () => {
        dispatch(SendMessageEmail({userName: username}))
    }
    console.log(username)

    return (
        <div className={'login-background'}>
            <div className={'login-card'}>
                <form onSubmit={submit}>
                    <Typography align="center" variant="h4" component="h2">
                        Login
                    </Typography>
                    <TextField fullWidth required
                               type={"text"}
                               variant="standard"
                               label={'Имя пользователя'}
                               onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField fullWidth required type={"password"} variant="standard"
                               style={{marginBottom: 20, marginTop: 10}}
                               label={'Пароль'}/>
                    <div onClick={getUserName} className={'forgotPassword'}>
                        <Link to={'/forgot-password'} className={'forgotPassword'}>Forgot Password</Link>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {btnLoading ? <CircularProgress size={26} disableShrink/> :
                            <Button size={"small"} type={'submit'} variant={'contained'}
                                    color={'primary'} fullWidth>Login</Button>}
                    </div>
                    <div className={'registerClass'}><span
                        style={{color: "black", marginRight: "1%"}}>No account?</span>
                        <Link className={'btnReg'}
                              to={'/register'}>Registration
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login