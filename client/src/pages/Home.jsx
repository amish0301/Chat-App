import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../components/styles/color';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography p={'2rem'} variant='h5' align='center'>
        Select a friend to chat
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);