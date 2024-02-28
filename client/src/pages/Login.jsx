import React, { useState } from 'react'
import { Avatar, Container, Paper, TextField, Typography, Button, Stack, IconButton } from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useInputValidation, useStrongPassword } from '6pp';
import { userNameValidator } from '../utils/validator';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", userNameValidator);
    const password = useStrongPassword("");


    const handleToggle = () => {
        setShowPassword((prev) => !prev);
    }

    const toggleLogin = () => {
        setIsLogin((prev) => !prev);
    }

    return (
        <Container component={"main"} maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                {
                    isLogin ? (<>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Login</Typography>
                        <form style={{ width: '100%', marginTop: '1rem' }}>
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
                        <form style={{ width: '100%', marginTop: '1rem' }}>
                            {/* profile pic setter */}
                            <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                                <Avatar sx={{ width: '10rem', height: '10rem', objectFit: 'contain' }} />
                                <IconButton sx={{
                                    position: 'absolute', bottom: '0', right: '0', color: 'white', bgcolor: 'rgba(0,0,0,0.5)', ':hover': {
                                        bgcolor: 'rgba(0,0,0,0,7)'
                                    },
                                }} component='label'>
                                    <>
                                        <CameraIcon />
                                        <VisuallyHiddenInput type='file' />
                                    </>
                                </IconButton>
                            </Stack>
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
    )
}

export default Login