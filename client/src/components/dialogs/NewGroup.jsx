import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, IconButton, List, Stack, TextField, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { sampleUsers } from '../../utils/sampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp';


const NewGroup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])
  const groupName = useInputValidation("");

  const selectMemberHandler = (id) => {
    setMembers(prev => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user ));

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currId) => currId !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
  }

  // close dialogs
  const closeHandler = () => {}
  const closeDialog = () => setIsOpen((prev) => !prev);

  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'1rem'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <DialogTitle variant='h5'>New Group</DialogTitle>
          <IconButton size='medium' onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField label="Group Name" variant='outlined' size='medium' value={groupName.value} onChange={groupName.changeHandler} />

        <Typography align='left' variant='body1'>Members</Typography>

        {/* group list */}
        {
          <List sx={{ maxHeight: '15rem', overflow: 'auto' }}>
            {
              members.map((user) => (
                <UserItem user={user} key={user._id} handler={selectMemberHandler} />
              ))
            }
          </List>
        }

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button variant='text' color='error' size='large' onClick={closeDialog}>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroup