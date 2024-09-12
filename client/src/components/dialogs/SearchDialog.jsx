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
      <Stack p={'1.5rem'} sx={{ width: '100%', height: '70vh' }}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle textAlign={'center'} sx={{ fontWeight: 'bolder', padding: '1.5rem 0' }}>Find People</DialogTitle>
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
        <Stack sx={{ marginTop: '2rem', height: { sm: 'calc(100% - 3rem)', xs: '100%'}, overflowY: 'auto' }}>
          <List>
            {
              isLoading ? (
                <ProgressiveLoader />
              ) : (
                <>
                  {
                    users?.length ? (
                      users?.map(i => <UserItem key={i._id} user={i} handler={addFriendHandler} handlerIsLoading={isLoadingSendFreindRequest} />)
                    ) : (
                      <strong style={{ width: '100%', marginLeft: '1rem' }}>No results found.</strong>
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