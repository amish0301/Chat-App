import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import { grayColor, orange } from '../components/styles/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../utils/sampleData';
import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery } from '../redux/apis/api';
import { useSocketEvents } from '../hooks/hook';

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails.data?.chat?.members;

  const [message, setMessage] = useState("");
  const onSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emitting new message event
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  const newMessages = useCallback((data) => {
    // something
  }, []);
  
  const eventHandlers = { [NEW_MESSAGE]: newMessages };

  useSocketEvents(socket, eventHandlers);

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={grayColor} height={'90%'} sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {/* messages */}
        {
          sampleMessage?.map((msg, index) => (
            <MessageComponent key={index} message={msg} user={user} />
          ))
        }
      </Stack>
      <form style={{ height: '10%' }} onSubmit={onSendMessage}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <Tooltip title="Attach Files">
            <IconButton sx={{ rotate: '30deg', position: 'absolute', left: '.8rem' }} >
              <AttachFileIcon />
            </IconButton>
          </Tooltip>

          <InputBox placeholder='Type Message Here...' value={message} onChange={(e) => setMessage(e.target.value)} className='chatFont' sx={{ "&:focus": { border: '2px solid black' } }} />
          <IconButton type='submit' sx={{ bgcolor: orange, marginLeft: '1rem', padding: '0.5rem', color: 'white', "&:hover": { bgcolor: 'error.dark' }, rotate: '-30deg' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </ Fragment>
  )
}

export default AppLayout()(Chat);