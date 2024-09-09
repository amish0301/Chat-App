import { useInputValidation } from '6pp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bgGradiant } from '../../components/styles/color';
import { adminLogin, getAdmin } from '../../redux/thunks/admin';

const AdminLogin = () => {
    const { isAdmin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const secretKey = useInputValidation("");
    const [showPassword, setShowPassword] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(() => {
        dispatch(getAdmin());
    }, [dispatch]);

    if (isAdmin) return <Navigate to={'/admin/dashboard'} replace />

    return (
        <div style={{ backgroundImage: bgGradiant }}>
            <Container component={"main"} maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                    <>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Admin Login</Typography>
                        <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={submitHandler}>
                            <div className='passField'>
                                <TextField required fullWidth label='Secret Key' type={showPassword ? 'text' : 'password'} margin='normal' variant='outlined' value={secretKey.value} onChange={secretKey.changeHandler} />
                                <span className='togglePassIcon' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                            </div>
                            <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth>
                                Login
                            </Button>
                        </form>
                    </>
                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin