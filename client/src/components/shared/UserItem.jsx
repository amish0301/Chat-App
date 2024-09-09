import React, { memo } from 'react'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { transformImage } from '../../lib/feature';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
    const { name, _id, avatar } = user;
    return (
        <ListItem>
            <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} width={'100%'} sx={{
                boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                padding: '1rem 1rem',
                borderRadius: '1rem',
            }}>
                <Avatar src={transformImage(avatar)} />
                <Typography variant='body1' sx={{ flexGrow: 1, display: '-webkit-flex', WebkitLineClamp: 1, WebkitFlexDirection: 'column', textOverflow: 'ellipsis' }} >{name}</Typography>

                <IconButton size='small' sx={{ bgcolor: isAdded ? "error.main" : "primary.main", color: 'white', '&:hover': { bgcolor: isAdded ? 'error.dark' : 'primary.dark' } }} onClick={() => handler(_id)} disabled={handlerIsLoading}>
                    {isAdded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)