import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/apis/api';

const DeleteChatMenu = ({ dispatch, deleteChatMenuAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.utility);
  const isGroup = selectedDeleteChat.groupChat;
  const navigate = useNavigate();
  const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteChatMenuAnchor.current = null;
  }

  const deleteChatHandler = () => {
    if (isGroup) leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    else deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    closeHandler();
  }

  // if we receive data from delete chat api, means successfully deleted so we'll navigate to home
  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate('/');
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteChatMenuAnchor} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'center', horizontal: 'center' }}>
      <Stack sx={{ width: '10rem', padding: '.5rem', cursor: 'pointer' }} direction={'row'} alignItems={'center'} spacing={'.5rem'}>
        <div onClick={deleteChatHandler} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%' }}>
          {selectedDeleteChat.groupChat ? <><ExitToAppIcon /> <Typography variant='body1'>Leave Group</Typography></> : <>
            <DeleteIcon />
            <Typography variant='body1'>Delete Chat</Typography>
          </>
          }
        </div>
      </Stack>
    </Menu>
  )
}

export default DeleteChatMenu