import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {InputAdornment, TextField, Button, Box, Typography, IconButton} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import {Base64} from "js-base64";
import {updateUser} from "../../store/user/user";
import {Language} from "../../Component/Language/Language";


function Profile() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [user] = useState(JSON.parse(Base64.decode(localStorage.getItem('Authority'))).data)
    const {userName, birthDate, email, firstName, lastName, middleName, password, userId} = user
    // const [showPassword, setShowPassword] = useState(false);
    // const [showPassword2, setShowPassword2] = useState(false);
    const {userMessage} = useSelector(state => state.user)
    const {lang} = useSelector(state => state.language)
    const {username, firstname, middlename, Email, updateProfile, lastname, Birthday, CancelBtn, MyProfile} = Language

    function onSubmit(e) {
        e.preventDefault()
        dispatch(updateUser(
            {
                userName: e.target[0].value,
                firstName: e.target[1].value,
                lastName: e.target[2].value,
                middleName: e.target[3].value,
                email: e.target[4].value,
                birthDate: e.target[5].value,
                // password: e.target[6].value,
                // newPassword: e.target[7].value
            },
            {userId: userId}))
    }

    // const handleClick = () => {
    //     setShowPassword(prev => !prev);
    // }
    // const handleClick2 = () => {
    //     setShowPassword2(prev => !prev);
    // }

    return (
        <>
            <div className={'profilePage'}>
            </div>
            <div className={'formProfile'}>
                <form className={'flex'} onSubmit={onSubmit} style={{boxSizing: 'border-box'}}>
                    <Typography variant={'h5'} style={{marginBottom: '2vh'}}>{MyProfile[lang]}</Typography>
                    <TextField
                        name={'userName'}
                        style={{marginBottom: "10px", width: '65%'}}
                        type="text"
                        label={username[lang]}
                        variant="standard"
                        defaultValue={userName}
                        required
                    />
                    <TextField
                        name={'firstName'}
                        style={{marginBottom: "10px", width: '65%'}}
                        type="text"
                        label={firstname[lang]}
                        variant="standard"
                        defaultValue={firstName}
                        required
                    />
                    <TextField
                        name={'lastName'}
                        style={{marginBottom: "10px", width: '65%'}}
                        type="text"
                        label={lastname[lang]}
                        variant="standard"
                        defaultValue={lastName}
                        required
                    />
                    <TextField
                        name={'middleName'}
                        style={{marginBottom: "10px", width: '65%'}}
                        type="text"
                        label={middlename[lang]}
                        variant="standard"
                        defaultValue={middleName}
                        required
                    />
                    <TextField
                        name={'email'}
                        style={{marginBottom: "10px", width: '65%'}}
                        type={'email'}
                        label={Email[lang]}
                        variant="standard"
                        defaultValue={email}
                        required
                    />
                    <TextField
                        name={'birthDate'}
                        style={{marginBottom: "20px", width: '65%'}}
                        type={"date"}
                        InputLabelProps={{shrink: true, required: true}}
                        label={Birthday[lang]}
                        variant="standard"
                        defaultValue={birthDate}
                        required
                    />
                    {/*<TextField*/}
                    {/*    type={showPassword ? 'text' : 'password'}*/}
                    {/*    name={'password'}*/}
                    {/*    variant={'standard'}*/}
                    {/*    label={'password'}*/}
                    {/*    style={{marginBottom: '10px', width: "60%"}}*/}
                    {/*    defaultValue={password}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                <IconButton*/}
                    {/*                    onClick={handleClick}*/}
                    {/*                    edge="end"*/}
                    {/*                >*/}
                    {/*                    {showPassword ? <Visibility/> : <VisibilityOff/>}*/}
                    {/*                </IconButton>*/}
                    {/*            </InputAdornment>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    type={showPassword2 ? 'text' : 'password'}*/}
                    {/*    name={'newPassword'}*/}
                    {/*    variant={'standard'}*/}
                    {/*    label={'newPassword'}*/}
                    {/*    style={{marginBottom: '20px', width: "60%"}}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                <IconButton*/}
                    {/*                    onClick={handleClick2}*/}
                    {/*                    edge="end"*/}
                    {/*                >*/}
                    {/*                    {showPassword2 ? <Visibility/> : <VisibilityOff/>}*/}
                    {/*                </IconButton>*/}
                    {/*            </InputAdornment>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <div style={{display: "flex"}}>
                        <Button type={'submit'} style={{marginRight: "5%"}} variant={'contained'}
                                color={'primary'}>{updateProfile[lang]}</Button>
                        <Button type={'button'} variant={'contained'}
                                color={'error'} onClick={() => history.push('/')}>{CancelBtn[lang]}</Button>
                    </div>
                </form>

            </div>

        </>
    );
}

export default Profile;