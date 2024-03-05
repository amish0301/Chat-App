import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Person as PersonIcon, Info as InfoIcon, Phone as PhoneIcon, CalendarMonth as CalendarIcon, ModeComment } from '@mui/icons-material';
import moment from 'moment';

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={'row'} alignItems={'center'} spacing={'2rem'} color={'white'} textAlign={'center'} >
        {Icon && Icon}
        <Stack spacing={'0.5rem'}>
            <Typography variant='body2' color={'black'} align='left'>{heading}</Typography>
            <Typography variant='subtitle2' >{text}</Typography>
        </Stack>
    </Stack>
);

const Profile = () => {
    return (
        <div>
            <Box sx={{ marginBottom: '2rem', display: { xs: 'none', md: 'block' }}}>
                <Typography variant='h6' fontWeight={'bolder'} letterSpacing={1}>Profile</Typography>
            </Box>
            <Stack alignItems={'center'} spacing={'2rem'}>
                <Avatar sx={{ height: 200, width: 200, objectFit: 'contain', marginBottom: '1rem', border: '5px solid white' }} />
                <Stack spacing={'1rem'}>
                    <ProfileCard Icon={<PersonIcon />} heading={'Name'} text={'Amish Pithva'}/>
                    <ProfileCard Icon={<InfoIcon />} heading={'About'} text={'My name is amish.'}/>
                    <ProfileCard Icon={<PhoneIcon />} heading={'Phone'} text={'+91 8469312325'}/>
                    <ProfileCard Icon={<CalendarIcon />} heading={'Joined'} text={moment('2024-01-02T18:30:00.000Z').fromNow()}/>
                </Stack>
            </Stack>
        </div>
    )
}

export default Profile