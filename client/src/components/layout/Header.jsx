import React, { Suspense, lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip, Backdrop, Badge, Avatar } from '@mui/material'
import { orange } from '../styles/color'
import MenuIcon from '@mui/icons-material/Menu';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import { serverURI } from '../../utils/config';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsSearch, setIsMobile, setIsNewGroup, setIsNotification, setIsProfileOpen } from '../../redux/reducers/misc';
import { resetNotificationCount } from '../../redux/reducers/chat';
import { transformImage } from '../../lib/feature';
import Profile from '../Profile';

const SearchDialog = lazy(() => import('../dialogs/SearchDialog'));
const Notification = lazy(() => import('../dialogs/Notification'));
const NewGroup = lazy(() => import('../dialogs/NewGroup'));

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" onClick={onClick} size='large'>
                {
                    value ? <Badge badgeContent={value} color="error"><NotificationsIcon /></Badge> : icon
                }
            </IconButton>
        </Tooltip>
    );
}

const Header = () => {

    const dispatch = useDispatch();
    const { isSearch, isNewGroup, isNotification, isProfileOpen } = useSelector(state => state.utility);
    const { notificationCount } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.auth);

    const handleMobile = () => dispatch(setIsMobile(true));
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => dispatch(setIsNewGroup(true));

    const openNotification = () => {
        dispatch(setIsNotification(prev => !prev));
        dispatch(resetNotificationCount());
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
                <AppBar position='static' sx={{ bgcolor: '#f80759' }} >
                    <Toolbar>
                        <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }} onClick={navigateToHome}>Talk-A-Tive</Typography>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <IconBtn title={"Search"} icon={<PersonSearchIcon />} onClick={openSearch} />
                            <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />
                            <IconBtn title={"My Groups"} icon={<GroupIcon />} onClick={navigateToGroup} />
                            <IconBtn title={"Notifications"} icon={<NotificationsIcon />} value={notificationCount} onClick={openNotification} />
                            <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />
                        </Box>
                        <Tooltip title={"Profile"}>
                            <Avatar alt="profile_icon" src={transformImage(user?.avatar?.url)} sx={{ ml: 1, cursor: 'pointer', outline: 'none', border: 'none' }} onClick={() => dispatch(setIsProfileOpen(true))} />
                        </Tooltip>
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
            {
                isProfileOpen && (
                    <Suspense fallback={<Backdrop open />}>
                        <Profile user={user} />
                    </Suspense>
                )
            }

        </>
    )
}

export default Header;