import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogTitle, IconButton, InputAdornment, List, Stack, TextField } from '@mui/material'
import { Search as SearchIcon, Close as CloseIcon, FitScreen } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from '../shared/UserItem'
import { useSelector, useDispatch } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc'
import { useLazySearchUserQuery } from '../../redux/apis/api'

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector(state => state.utility);
  const [searchUser] = useLazySearchUserQuery();
  const [users, setUsers] = useState([]);

  const search = useInputValidation("");
  let isLoadingSendFriendRequest = false; // it should be in a state

  const addFriendHandler = (id) => { };
  const closeDialog = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser(search.value).then(({ data }) => setUsers(data.users)).catch((err) => console.log(err))
    }, 1000);

    return () => clearTimeout(timer);
  }, [search.value])

  return (
    <Dialog open={isSearch} onClose={closeDialog}>
      <Stack p={'2rem'} sx={{ width: { sm: '30rem', xs: '100%' } }}>
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
            users.map((user) => (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog