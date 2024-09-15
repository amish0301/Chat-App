import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, CircularProgress, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { bgGradiant } from '../components/styles/color';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { userExists } from '../redux/reducers/auth';
import { setIsLogin, setIsShowPassword } from '../redux/reducers/misc';
import { loginConfig, serverURI, signupConfig } from '../utils/config';
import { userNameValidator } from '../utils/validator';

const Login = () => {
    const dispatch = useDispatch();
    const { isLogin, isShowPassword } = useSelector(state => state.utility);
    const [isLoading, setIsLoading] = useState(false);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", userNameValidator);
    const password = useStrongPassword("");
    const avatar = useFileHandler("single");

    const handleLogin = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Verifying Credentials...");
        setIsLoading(true)

        try {
            const { data } = await axios.post(`${serverURI}/api/user/login`, {
                username: username.value,
                password: password.value,
            }, loginConfig);

            toast.success(data.message, { id: toastId });
            dispatch(userExists(data.user));
        } catch (error) {
            toast.error(error?.response?.data?.message || "User Not Exist, Please Sign Up", { id: toastId });
        } finally {
            setIsLoading(false);
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
        const toastId = toast.loading("Creating an Account...");
        setIsLoading(true)

        try {
            const { data } = await axios.post(`${serverURI}/api/user/signup`, formData, signupConfig);
            dispatch(userExists(data.user));
            toast.success(data.message, { id: toastId });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong, Please try again", { id: toastId });
        } finally {
            setIsLoading(false);
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
                                    <TextField required fullWidth label='Password' type={isShowPassword ? 'text' : 'password'} margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler} />
                                    <span className='togglePassIcon' onClick={() => dispatch(setIsShowPassword(!isShowPassword))}>{isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : "Login"}
                                </Button>
                                <Typography textAlign={'center'} m={'1rem'} textTransform={'uppercase'}>or</Typography>
                                <Button className='btn_login_signup' variant='text' color='secondary' fullWidth onClick={() => dispatch(setIsLogin(false))} disabled={isLoading}>Sign Up</Button>
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
                                    <TextField required fullWidth label='Password' type={isShowPassword ? 'text' : 'password'} margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler} />
                                    <span className='togglePassIcon' onClick={() => dispatch(setIsShowPassword(!isShowPassword))}>{isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                {/* validating password */}
                                {
                                    password.error && (<Typography color={"error"} variant="caption">{password.error}</Typography>)
                                }
                                <TextField required fullWidth label='Bio' margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler} />
                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>
                                    {isLoading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Sign Up'}
                                </Button>
                                <Typography textAlign={'center'} m={'1rem'} textTransform={'uppercase'}>or</Typography>
                                <Button className='btn_login_signup' variant='text' color='secondary' fullWidth onClick={() => dispatch(setIsLogin(true))} disabled={isLoading}>Login</Button>
                            </form>
                        </>)
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login