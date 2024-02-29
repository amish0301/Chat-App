import React from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { orange } from '../styles/color'

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }} height={'4rem'}>
            <AppBar position='static' sx={{ bgcolor: orange }} >
                <Toolbar>
                    <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}>Talk-A-Tive</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header