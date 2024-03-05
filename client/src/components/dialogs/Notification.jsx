import React, { memo, useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, IconButton, List, ListItem, Stack, Typography } from '@mui/material'
import { sampleNotifications } from '../../utils/sampleData';
import { Close as CloseIcon } from '@mui/icons-material'


const NotifiacationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} width={'100%'}>
        <Avatar src={avatar} />

        <Typography variant='body1' sx={{ flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical', overflow: 'hidden' ,textOverflow: 'ellipsis', width: '100%' }}>{`${name} sent you a friend Request.`}</Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'.5rem'}>
          <Button sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color='error' sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

const Notification = () => {
  const [isOpen, setIsOpen] = useState(true);
  const friendRequestHandler = ({ _id, accept }) => {
    // logic for sending request
  };

  return (
    <Dialog open={isOpen}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'}>Notifications</DialogTitle>
          <IconButton size='medium' onClick={() => setIsOpen(prev => !prev)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Notifiacations list */}
        {
          sampleNotifications.length > 0 ? (
            <List sx={{ maxHeight: '15rem', overflow: 'auto', marginTop: '1rem' }}>
              {
                sampleNotifications.map((noti) => (
                  <NotifiacationItem key={noti._id} sender={noti.sender} _id={noti._id} handler={friendRequestHandler} />
                ))
              }
            </List>
          ) : (<Typography textAlign={'center'}>No Notifications</Typography>)
        }
      </Stack>
    </Dialog>
  )
}

export default Notification