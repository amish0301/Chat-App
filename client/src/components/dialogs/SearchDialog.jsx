import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogTitle, IconButton, InputAdornment, List, Stack, TextField } from '@mui/material'
import { Search as SearchIcon, Close as CloseIcon, FitScreen } from '@mui/icons-material'
import { useInputValidation } from '6pp'
import UserItem from '../shared/UserItem'
import { useSelector, useDispatch } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/apis/api'
import { useAsyncMutation } from '../../hooks/hook'

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector(state => state.utility);
  const { user } = useSelector(state => state.auth);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoading] = useAsyncMutation(useSendFriendRequestMutation);
  const [users, setUsers] = useState([]);

  const search = useInputValidation("");

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend request...", { receiverId: id });
  };

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
            users?.map((i) => (
              i._id !== user?._id && <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoading} />
            ))
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog