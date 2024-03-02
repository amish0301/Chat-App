import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'

const ProfileCard = ({ text, icon, heading }) => {
    <Stack direction={'row'} alignItems={'center'} color={'white'} textAlign={'center'} spacing={'1rem'}>
        {icon && icon}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography variant='caption' color={'gray'}>{heading}</Typography>
        </Stack>
    </Stack>
}

const Profile = () => {
    return (
        <Stack spacing={'2rem'} alignItems={'center'}>
            <Avatar sx={{ height: 200, width: 200, objectFit: 'contain', marginBottom: '1rem', border: '5px solid white' }} />
            <ProfileCard heading={'Bio'} text={'dasdasddasddad'} />
        </Stack>
    )
}

export default Profile