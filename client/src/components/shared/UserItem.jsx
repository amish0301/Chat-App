import React, { memo } from 'react'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { transformImage } from '../../lib/feature';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
    const { name, _id, avatar } = user;
    return (
        <ListItem>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} alignItems={'center'} width={'100%'} sx={{
                boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                padding: { xs: '0.5rem', sm: '1rem' },
                borderRadius: '1rem',
                overflow: 'hidden',
            }}>
                <Avatar src={transformImage(avatar)} sx={{ width: { xs: 50, sm: 40 }, height: { xs: 50, sm: 40 } }} />
                <Typography
                    variant='h6'
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {name}
                </Typography>

                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: 'white',
                        '&:hover': {
                            bgcolor: isAdded ? 'error.dark' : 'primary.dark'
                        }
                    }}
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}
                >
                    {isAdded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)