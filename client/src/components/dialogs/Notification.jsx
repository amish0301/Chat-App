import React, { memo } from 'react'
import { Avatar, Button, Dialog, DialogTitle, IconButton, List, ListItem, Stack, Typography } from '@mui/material'
import { Close as CloseIcon, Done as DoneIcon, Close as CancelIcon } from '@mui/icons-material'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { useXErrors } from '../../hooks/hook';
import { setIsNotification } from '../../redux/reducers/misc'
import { Skeleton } from '@mui/material'


const NotifiacationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} width={'100%'} >
        <Avatar src={avatar} />

        <Typography variant='body1' sx={{
          flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
        }}>
          {`${name} sent you a Friend request.`}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: '0', sm: '0.5rem' }}>
          <Button sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: true })}><DoneIcon /></Button>
          <Button color='error' sx={{ fontWeight: "bolder" }} onClick={() => handler({ _id, accept: false })}><CancelIcon /></Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

const Notification = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector(state => state.utility);

  const [acceptReq] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptReq({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("User Socket use")
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log("in Notification File", error);
    }
  };
  const handleCloseDialog = () => {
    dispatch(setIsNotification(false));
  };

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  useXErrors([{ isError, error }]);

  return (
    <Dialog open={isNotification} onClose={handleCloseDialog}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'}>Notifications</DialogTitle>
          <IconButton size='medium' onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Notifiacations list */}
        {
          isLoading ? <Skeleton /> : (
            <>
              {
                data?.allRequests?.length > 0 ? (
                  <List sx={{ maxHeight: '15rem', overflow: 'auto', marginTop: '1rem' }}>
                    {
                      data?.allRequests.map((noti) => (
                        <NotifiacationItem key={noti._id} sender={noti.sender} _id={noti._id} handler={friendRequestHandler} />
                      ))
                    }
                  </List>
                ) : (<Typography textAlign={'center'}>No Notifications</Typography>)
              }
            </>
          )
        }
      </Stack>
    </Dialog>
  )
}

export default Notification