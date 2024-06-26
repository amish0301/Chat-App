import React, { useState } from 'react'
import { Avatar, Container, Paper, TextField, Typography, Button, Stack, IconButton } from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { userNameValidator } from '../utils/validator';
import { bgGradiant } from '../components/styles/color';
import { serverURI } from '../utils/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", userNameValidator);
    const password = useStrongPassword("");
    const avatar = useFileHandler("single");
    const dispatch = useDispatch();

    const handleToggle = () => {
        setShowPassword((prev) => !prev);
    }

    const toggleLogin = () => {
        setIsLogin((prev) => !prev);
    }

    // Need to FIX
    const handleLogin = async (e) => {
        e.preventDefault();

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        };

        try {
            const { data } = await axios.post(`${serverURI}/api/user/login`, {
                username: username.value,
                password: password.value,
            }, config);

            await dispatch(userExists(data.user));
            toast.success(data.message);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        if (!avatar.file) return toast.error("Please upload your profile picture");

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        try {
            const { data } = await axios.post(`${serverURI}/api/user/signup`, formData, config);
            dispatch(userExists(data.user));
            toast.success(data.message);
        } catch (error) {
            console.log(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div style={{ backgroundImage: bgGradiant }}>
            <Container component={"main"} maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                    {
                        isLogin ? (<>
                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Login</Typography>
                            <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleLogin}>
                                <TextField required fullWidth label='Username' margin='normal' variant='outlined' autoFocus value={username.value} onChange={username.changeHandler} />
                                {/* validating username */}
                                {
                                    username.error && (<Typography color={"error"} variant="caption">{username.error}</Typography>)
                                }
                                <div className='passField'>
                                    <TextField required fullWidth label='Password' type={showPassword ? 'text' : 'password'} margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler} />
                                    <span className='togglePassIcon' onClick={handleToggle}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                {/* validating password */}
                                {
                                    password.error && (<Typography color={"error"} variant="caption">{password.error}</Typography>)
                                }
                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth>Login</Button>
                                <Typography textAlign={'center'} m={'1rem'} textTransform={'uppercase'}>or</Typography>
                                <Button className='btn_login_signup' variant='text' color='secondary' fullWidth onClick={toggleLogin}>Sign Up</Button>
                            </form>
                        </>) : (<>
                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Sign Up</Typography>
                            <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSignUp}>
                                {/* profile pic setter */}
                                <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                                    <Avatar sx={{ width: '10rem', height: '10rem', objectFit: 'contain' }} src={avatar.preview} />
                                    <IconButton sx={{
                                        position: 'absolute', bottom: '0', right: '0', color: 'white', bgcolor: 'rgba(0,0,0,0.5)', ':hover': {
                                            bgcolor: 'rgba(0,0,0,0,7)', color: 'black'
                                        },
                                    }} component='label'>
                                        <>
                                            <CameraIcon />
                                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                        </>
                                    </IconButton>
                                </Stack>
                                {/* validating avatar */}
                                {
                                    avatar.error && (<Typography color={"error"} variant="caption" m={'1rem auto'}>{avatar.error}</Typography>)
                                }
                                <TextField required fullWidth label='Name' margin='normal' variant='outlined' autoFocus value={name.value} onChange={name.changeHandler} />
                                <TextField required fullWidth label='Username' margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler} />
                                {/* validating username */}
                                {
                                    username.error && (<Typography color={"error"} variant="caption">{username.error}</Typography>)
                                }
                                <div className="passField">
                                    <TextField required fullWidth label='Password' type={showPassword ? 'text' : 'password'} margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler} />
                                    <span className='togglePassIcon' onClick={handleToggle}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                {/* validating password */}
                                {
                                    password.error && (<Typography color={"error"} variant="caption">{password.error}</Typography>)
                                }
                                <TextField required fullWidth label='Bio' margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler} />
                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth>Sign Up</Button>
                                <Typography textAlign={'center'} m={'1rem'} textTransform={'uppercase'}>or</Typography>
                                <Button className='btn_login_signup' variant='text' color='secondary' fullWidth onClick={toggleLogin}>Login</Button>
                            </form>
                        </>)
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login