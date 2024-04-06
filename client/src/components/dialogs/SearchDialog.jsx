import React, { useCallback, useState } from 'react'
import { Dialog, DialogTitle, IconButton, InputAdornment, List, Stack, TextField } from '@mui/material'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../utils/sampleData'
import { useSelector, useDispatch } from 'react-redux'

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch, setIsSearch } = useSelector(state => state.utility);
  
  const search = useInputValidation("");
  const [users, setUsers] = useState(sampleUsers);
  let isLoadingSendFriendRequest = false; // it should be in a state

  const addFriendHandler = (id) => { };
  const closeDialog = () => dispatch(setIsSearch(false));

  return (
    <Dialog open={isSearch} onClose={closeDialog}>
      <Stack p={'2rem'} maxWidth={'25rem'}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'}>Find People</DialogTitle>
          <IconButton size='medium' onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField value={search.value} onChange={search.changeHandler} variant='outlined' size='small' InputProps={{
          startAdornment: (<InputAdornment position='start'><SearchIcon /></InputAdornment>),
        }} />

        {/* Search results */}
        <List sx={{ maxHeight: '15rem', overflow: 'auto', marginTop: '1rem' }}>
          {
            sampleUsers.map((user) => (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog