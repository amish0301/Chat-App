import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AppBar, Avatar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { Suspense, lazy } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transformImage } from '../../lib/feature';
import { setLoading, userNotExists } from '../../redux/reducers/auth';
import { resetNotificationCount } from '../../redux/reducers/chat';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsProfileOpen, setIsSearch } from '../../redux/reducers/misc';
import { serverURI } from '../../utils/config';
import Profile from '../Profile';
import { ProgressiveLoader } from './Loaders';

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
    const { user, loader } = useSelector(state => state.auth);

    const handleMobile = () => dispatch(setIsMobile(true));
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => dispatch(setIsNewGroup(true));

    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    }

    const navigate = useNavigate();
    const navigateToGroup = () => navigate('/groups');
    const navigateToHome = () => navigate('/');

    const logoutHandler = async () => {
        const toastId = toast.loading("Logging out...");
        dispatch(setLoading(true));

        try {
            const { data } = await axios.get(`${serverURI}/api/user/logout`, { withCredentials: true });
            toast.success(data.message, { id: toastId });
            dispatch(userNotExists());
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
        } finally {
            dispatch(setLoading(false));
        }
    }

    if (loader) return <ProgressiveLoader />;

    return (
        <>
            <Box sx={{ height: '100%', display: 'flex', flexGrow: 1 }}>
                <AppBar position='static' sx={{ bgcolor: '#f80759' }} >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' },
                                    fontFamily: 'Poppins, sans-serif',
                                    background: 'linear-gradient(90deg, #ff6f61, #ff8961)', 
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: 'bold', 
                                }}
                                onClick={navigateToHome}
                            >
                                Talk-A-Tive
                            </Typography>

                            {/* Menu Button for Mobile */}
                            <IconButton
                                color="inherit"
                                sx={{ display: { sm: 'none', xs: 'block' }, mt: '.5rem' }}
                                onClick={handleMobile}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
                            <IconBtn title={"Search"} icon={<PersonSearchIcon />} onClick={openSearch} />
                            <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />
                            <IconBtn title={"My Groups"} icon={<GroupIcon />} onClick={navigateToGroup} />
                            <IconBtn title={"Notifications"} icon={<NotificationsIcon />} value={notificationCount} onClick={openNotification} />
                            <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />
                        </Box>
                        <Tooltip title={"Profile"}>
                            <Avatar alt="profile_icon" src={transformImage(user?.avatar?.url)} sx={{ ml: 1, cursor: 'pointer', outline: 'none', border: 'none', width: { xs: '30px', sm: '35px' }, height: { xs: '30px', sm: '35px' } }} onClick={() => dispatch(setIsProfileOpen(true))} />
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
                        <Profile />
                    </Suspense>
                )
            }

        </>
    )
}

export default Header;