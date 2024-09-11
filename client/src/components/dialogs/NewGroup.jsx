import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, IconButton, List, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/apis/api'
import { useAsyncMutation, useXErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile, setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';


const NewGroup = () => {
  const [selectedMembers, setSelectedMembers] = useState([])
  const groupName = useInputValidation("");
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector(state => state.utility);

  // BUG - send ChatId in below query 
  const { isLoading, data, isError, error } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    { isError, error }
  ];

  useXErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currId) => currId !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Enter Group Name");
    if (selectedMembers.length < 3) return toast.error("Please add atleast 2 members");

    newGroup("Creating New Group...", { name: groupName.value, members: selectedMembers });
    closeHandler();
  }

  // close dialog
  const closeHandler = () => dispatch(setIsNewGroup(false));

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} maxWidth='sm' fullWidth>
      <Stack p={{ xs: '1rem', sm: '2rem', md: '3rem' }} spacing={'1rem'} >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <DialogTitle variant='h6' fontWeight={'bold'} marginX={'-1rem'}>New Group</DialogTitle>
          <IconButton size='medium' onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          label="Group Name"
          variant='outlined'
          size='small'
          fullWidth
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography align='left' variant='body1' marginBottom={'.5rem'}>
          {
            data?.friends?.length ? "" : "No Members Found"
          }
        </Typography>

        {/* Group list */}
        <List sx={{ maxHeight: '20rem', overflowY: 'auto' }}>
          {
            isLoading ? (
              <Skeleton variant='rectangular' height={40} />
            ) : (
              data?.friends?.map((user) => (
                <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
              ))
            )
          }
        </List>

        <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
          <Button variant='text' color='error' size='large' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup