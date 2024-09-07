import { Menu, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc';

const DeleteChatMenu = ({ deleteChatMenuAnchor }) => {
  const dispatch = useDispatch();
  const { isDeleteMenu } = useSelector(state => state.utility);

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  }
  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteChatMenuAnchor.current}>
      <Stack sx={{ width: '10rem', padding: '.5rem', cursor: 'pointer' }} direction={'row'} alignItems={'center'} spacing={'.5rem'}>
        Dele
      </Stack>
    </Menu>
  )
}

export default DeleteChatMenu