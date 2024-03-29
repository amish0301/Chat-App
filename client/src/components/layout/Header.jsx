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

const SearchDialog = lazy(() => import('../dialogs/SearchDialog'));
const Notification = lazy(() => import('../dialogs/Notification'));
const NewGroup = lazy(() => import('../dialogs/NewGroup'));

const Header = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleMobile = () => {
        setIsMobile(prev => !prev);
    }
    const openSearch = () => {
        setIsSearch(prev => !prev);
    }
    const openNewGroup = () => {
        setIsNewGroup(prev => !prev);
    }

    const openNotification = () => {
        setIsNotification(prev => !prev);
        setIsNotificationOpen(prev => !prev);
    }

    const navigate = useNavigate();
    const navigateToGroup = () => navigate('/groups');
    const navigateToHome = () => navigate('/');
    const logoutHandler = () => { 
        
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={'4rem'}>
                <AppBar position='static' sx={{ bgcolor: orange }} >
                    <Toolbar>
                        <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer'}} onClick={navigateToHome}>Talk-A-Tive</Typography>
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
                                    {isNotificationOpen  ? <NotificationsIcon /> : <NotificationsNoneIcon />}
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

export default Header