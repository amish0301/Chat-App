import { useInputValidation } from '6pp'
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation } from '../../hooks/hook'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/apis/api'
import { setIsSearch } from '../../redux/reducers/misc'
import { ProgressiveLoader } from '../layout/Loaders'
import UserItem from '../shared/UserItem'

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector(state => state.utility);
  const { user } = useSelector(state => state.auth);
  const [searchUser, { isLoading }] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFreindRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const [users, setUsers] = useState([]);

  const search = useInputValidation("");
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend request...", { receiverId: id });
  }

  const closeDialog = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser(search.value).then(({ data }) => setUsers(data.users)).catch((err) => console.log(err))
    }, 1000);

    return () => clearTimeout(timer);
  }, [search.value])

  return (
    <Dialog open={isSearch} onClose={closeDialog} maxWidth="sm" fullWidth>
      <Stack p={'2rem'} sx={{ width: '100%', height: '70vh' }}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'}>Find People</DialogTitle>
          <IconButton size='medium' onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (<InputAdornment position='start'><SearchIcon /></InputAdornment>),
          }}
        />

        {/* Search results */}
        <Stack sx={{ marginTop: '2rem', height: 'calc(100% - 2rem)', overflowY: 'auto' }}>
          <List>
            {
              isLoading ? (
                <ProgressiveLoader />
              ) : (
                <>
                  {
                    users.length > 0 ? (
                      users?.map(i => i._id !== user._id && <UserItem key={i._id} user={i} handler={addFriendHandler} handlerIsLoading={isLoadingSendFreindRequest} />)
                    ) : (
                      <strong style={{ textAlign: 'center' }}>No results found.</strong>
                    )
                  }
                </>
              )
            }
          </List>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog