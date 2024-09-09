import React, { useState } from 'react'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, Dashboard as DashboardIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
import { matBlack } from '../styles/color'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/reducers/misc'
import { adminLogout } from '../../redux/thunks/admin'

const Link = styled(LinkComponent)(
    `text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    :hover {
        background-color: #A9A9A9;
    }`
)

// Routes
const adminTabs = [
    {
        name: "Dashboard",
        icon: <DashboardIcon />,
        path: "/admin/dashboard",
    },
    {
        name: "User",
        icon: <ManageAccountsIcon />,
        path: "/admin/users",
    },
    {
        name: "Chats",
        icon: <GroupsIcon />,
        path: "/admin/chats",
    },
    {
        name: "Messages",
        icon: <MessageIcon />,
        path: "/admin/messages",
    },
];

const TabItem = ({ Icon, name }) => {
    return (
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
            {Icon}
            <Typography variant='body1' sx={{ fontWeight: '600' }}>{name}</Typography>
        </Stack>
    );
}

const SideBar = ({ w = '100%', dispatch }) => {
    const location = useLocation();
    const logoutHandler = () => {
        dispatch(adminLogout());
    }

    return (
        <Stack w={w} p={'2rem'} spacing={'2rem'}>
            <Typography variant='h5' textTransform={'uppercase'}>talk-a-tive</Typography>

            {/* admin tabs */}
            <Stack spacing={'2rem'}>
                {
                    adminTabs.map((tab, i) => (
                        <Link key={tab.path} to={tab.path} sx={location.pathname === tab.path && {
                            bgcolor: matBlack,
                            color: 'white'
                        }}>
                            <TabItem Icon={tab.icon} name={tab.name} />
                        </Link>
                    ))
                }
            </Stack>

            <Link onClick={logoutHandler}>
                <TabItem Icon={<ExitToAppIcon />} name={'Logout'} />
            </Link>
        </Stack>
    );
}

const AdminLayout = ({ children }) => {
    const { isAdmin } = useSelector(state => state.auth);
    const { isMobile } = useSelector(state => state.utility);
    const dispatch = useDispatch();

    const handleMobile = () => {
        dispatch(setIsMobile(prev => !prev));
    }
    const handleClose = () => setIsMobile(false);

    if (!isAdmin) return <Navigate to={'/admin'} replace />

    return (
        <Grid container minHeight={'100vh'}>
            <Box sx={{ display: { xs: 'block', sm: 'none', position: 'fixed', right: '1rem', top: '0.5rem' } }}>
                <IconButton onClick={handleMobile}>
                    {isMobile ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </Box>
            <Grid item md={4} lg={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <SideBar dispatch={dispatch} />
            </Grid>
            <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: '#f5f5f5' }}>
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>
                <SideBar w={'50vw'} dispatch={dispatch} />
            </Drawer>
        </Grid>
    )
}

export default AdminLayout