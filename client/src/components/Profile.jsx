import { CalendarMonth as CalendarIcon, Close as CloseIcon, Info as InfoIcon, Person as PersonIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { Avatar, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transformImage } from '../lib/feature';
import { setIsProfileOpen } from '../redux/reducers/misc';
import { CustomBackdrop } from './styles/StyledComponents';

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={'row'} alignItems={'center'} spacing={'2rem'} color={'black'}>
        {Icon && Icon}
        <Stack spacing={'.5rem'} sx={{ textAlign: 'left', padding: '0 1rem', width: '100%', wordWrap: 'break-word' }}>
            <Typography variant='body2' color={'#789e90'} align='left'>{heading}</Typography>
            <Typography variant='subtitle2' fontWeight={'580'}>{text}</Typography>
        </Stack>
    </Stack>
);

const Profile = () => {

    const textTransform = (sentence) => {
        const texts = sentence.split(' ');
        const str = texts.map(word => word[0]?.toUpperCase() + word.slice(1)).join(' ');
        return str;
    }
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { isProfileOpen } = useSelector(state => state.utility);

    const closeHandler = () => {
        dispatch(setIsProfileOpen(false));
    }
    return (
        <Dialog
            sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
            }}
            open={isProfileOpen}
            onClose={closeHandler}
            fullWidth
            slots={{ backdrop: CustomBackdrop }}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <DialogTitle variant="h5">Profile</DialogTitle>
                <IconButton
                    size="large"
                    onClick={closeHandler}
                >
                    <CloseIcon sx={{ color: 'black', fontSize: '2rem' }} />
                </IconButton>
            </Stack>
            <Stack alignItems={'center'} spacing={'3rem'}>
                <Avatar
                    src={transformImage(user?.avatar?.url)}
                    sx={{
                        height: 200,
                        width: 200,
                        objectFit: 'contain',
                        marginBottom: '1rem',
                        border: '5px solid white',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                />
                <Stack spacing={'2rem'} sx={{ maxWidth: { xs: '100%', md: '70%' }, paddingBottom: '2rem' }}>
                    <ProfileCard
                        Icon={<PersonIcon />}
                        heading={'Name'}
                        text={textTransform(user?.name) || 'Your name'}
                    />
                    <ProfileCard
                        Icon={<InfoIcon />}
                        heading={'About'}
                        text={textTransform(user?.bio) || 'Say something about yourself'}
                    />
                    <ProfileCard Icon={<PhoneIcon />} heading={'Phone'} text={'+91 0000000000'} />
                    <ProfileCard
                        Icon={<CalendarIcon />}
                        heading={'Joined'}
                        text={moment(user?.createdAt).fromNow()}
                    />
                </Stack>
            </Stack>
        </Dialog>

    )
}

export default Profile