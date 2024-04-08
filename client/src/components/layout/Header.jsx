import React, { Suspense, lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip, Backdrop } from '@mui/material'
import { orange } from '../styles/color'
import MenuIcon from '@mui/icons-material/Menu';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import { serverURI } from '../../utils/config';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsSearch, setIsMobile, setIsNewGroup } from '../../redux/reducers/misc';

const SearchDialog = lazy(() => import('../dialogs/SearchDialog'));
const Notification = lazy(() => import('../dialogs/Notification'));
const NewGroup = lazy(() => import('../dialogs/NewGroup'));

const Header = () => {

    const dispatch = useDispatch();

    const { isSearch, isNewGroup } = useSelector(state => state.utility);
    const [isNotification, setIsNotification] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleMobile = () => dispatch(setIsMobile(true));
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => dispatch(setIsNewGroup(true));

    const openNotification = () => {
        setIsNotification(prev => !prev);
        setIsNotificationOpen(prev => !prev);
    }

    const navigate = useNavigate();
    const navigateToGroup = () => navigate('/groups');
    const navigateToHome = () => navigate('/');

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${serverURI}/api/user/logout`, { withCredentials: true });
            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={'100%'}>
                <AppBar position='static' sx={{ bgcolor: orange }} >
                    <Toolbar>
                        <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }} onClick={navigateToHome}>Talk-A-Tive</Typography>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <Tooltip title={"Search"}>
                                <IconButton color='inherit' size='large' onClick={openSearch}>
                                    <PersonSearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"New Group"}>
                                <IconButton color='inherit' size='large' onClick={openNewGroup}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Manage Groups"}>
                                <IconButton color='inherit' size='large' onClick={navigateToGroup}>
                                    <GroupIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Notifications"}>
                                <IconButton color='inherit' size='large' onClick={openNotification}>
                                    {isNotificationOpen ? <NotificationsIcon /> : <NotificationsNoneIcon />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Logout"}>
                                <IconButton color='inherit' size='large' onClick={logoutHandler}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* if any below component is open then corresponding dialogbox will be open */}
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}><SearchDialog /></Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}><Notification /></Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}><NewGroup /></Suspense>
                )
            }

        </>
    )
}

export default Header;