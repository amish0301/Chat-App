import { Close as CancelIcon, Close as CloseIcon, Done as DoneIcon } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Dialog, DialogTitle, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useXErrors } from '../../hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/apis/api';
import { setIsNotification } from '../../redux/reducers/misc';
import { ProgressiveLoader } from '../layout/Loaders';


const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} width={'100%'} >
        <Avatar src={avatar} />

        <Typography variant='body1' sx={{
          flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
        }}>
          {/* {`${name} sent you a Friend request.`} */}
          <strong style={{ fontWeight: "bolder" }}>{`${name} `}</strong>
          sent you a Friend request.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: '0', sm: '0.5rem' }}>
          <Button sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: true })}><DoneIcon fontSize='medium' /></Button>
          <Button color='error' sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: false })}><CancelIcon fontSize='medium' /></Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

const Notification = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector(state => state.utility);

  const [acceptReq] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptReq(`${accept ? "Accepting..." : "Rejecting..."}`, { requestId: _id, accept });
  }

  const handleCloseDialog = () => {
    dispatch(setIsNotification(false));
  };

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  useXErrors([{ isError, error }]);

  return (
    <Dialog open={isNotification} onClose={handleCloseDialog} fullWidth>
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={'100%'}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'}>Notifications</DialogTitle>
          <IconButton size='medium' onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Notifiacations list */}
        {
          isLoading ? <Stack alignItems={'center'} justifyContent={'center'}><ProgressiveLoader /></Stack> :
            data?.requests?.length > 0 ? (
              <List sx={{ maxHeight: '20rem', overflow: 'auto', marginTop: '1rem', width: '100%' }}>
                {
                  data?.requests?.map((noti) => (
                    <NotificationItem key={noti._id} sender={noti.sender} _id={noti._id} handler={friendRequestHandler} />
                  ))
                }
              </List>
            ) : (<Typography textAlign={'center'} sx={{ marginBlock: '1rem' }}>No Notifications</Typography>)
        }
      </Stack>
    </Dialog>
  )
}

export default Notification