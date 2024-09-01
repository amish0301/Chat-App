import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Person as PersonIcon, Info as InfoIcon, Phone as PhoneIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material';
import moment from 'moment';
import { transformImage } from '../lib/feature';

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={'row'} alignItems={'center'} spacing={'2rem'} color={'white'}>
        {Icon && Icon}
        <Stack spacing={'.5rem'} sx={{ textAlign: 'left', padding: '0 1rem', width: '100%', wordWrap: 'break-word' }}>
            <Typography variant='body2' color={'#789e90'} align='left'>{heading}</Typography>
            <Typography variant='subtitle2' fontWeight={'580'}>{text}</Typography>
        </Stack>
    </Stack>
);

const Profile = ({ user }) => {

    const textTransform = (text) => {
        const texts = text.split(' ');
        const str = texts.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        return str;
    }

    return (
        <div>
            <Box sx={{ marginBottom: '2rem' }}>
                <Typography variant='h6' fontWeight={'bolder'} letterSpacing={1}>Profile</Typography>
            </Box>
            <Stack alignItems={'center'} spacing={'3rem'}>
                <Avatar src={transformImage(user?.avatar?.url)} sx={{ height: 200, width: 200, objectFit: 'contain', marginBottom: '1rem', border: '5px solid white' }} />
                <Stack spacing={'2rem'} sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
                    <ProfileCard Icon={<PersonIcon />} heading={'Name'} text={textTransform(user?.name) || "Your name"} />
                    <ProfileCard Icon={<InfoIcon />} heading={'About'} text={textTransform(user?.bio) || "say somthing about your self"} />
                    <ProfileCard Icon={<PhoneIcon />} heading={'Phone'} text={'+91 3135323231'} />
                    <ProfileCard Icon={<CalendarIcon />} heading={'Joined'} text={moment(user.createdAt).fromNow()} />
                </Stack>
            </Stack>
        </div>
    )
}

export default Profile