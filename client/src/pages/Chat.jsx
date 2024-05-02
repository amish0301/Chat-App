import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import { grayColor, orange } from '../components/styles/color';
import { AttachFile as AttachFileIcon, NestCamWiredStand, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/apis/api';
import { useSocketEvents, useXErrors } from '../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteScrollTop } from '6pp';
import { setIsFileMenu } from '../redux/reducers/misc';

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails.data?.chat?.members;

  // fetching old messages
  const oldMessagesChunk = useGetMessagesQuery({ chatId: chatId, page: page });
  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }, { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }];

  // on send message FUNCTION
  const onSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emitting new message event
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  const newMessages = useCallback((data) => {
    setMessages(prev => ([...prev, data.message]));
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessages };
  useSocketEvents(socket, eventHandler);

  // ********** Need some fixes in below useXErrors **************
  // useXErrors(errors);

  // Infinite scroll
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, oldMessagesChunk.data?.totalPages, page, setPage, oldMessagesChunk.data?.messages);

  const allMessaeges = [...oldMessages, ...messages];


  // FILE MENU LOGIC:
  const handleFileMenu = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={grayColor} height={'90%'} sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {/* messages */}
        {
          allMessaeges?.map((msg) => (
            <MessageComponent key={msg} message={msg} user={user} />
          ))
        }
      </Stack>
      <form style={{ height: '10%' }} onSubmit={onSendMessage}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <Tooltip title="Attach Files">
            <IconButton sx={{ rotate: '30deg', position: 'absolute', left: '.8rem' }} onClick={handleFileMenu}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>

          <InputBox placeholder='Type Message Here...' value={message} onChange={(e) => setMessage(e.target.value)} className='chatFont' sx={{ "&:focus": { border: '2px solid black' } }} />
          <IconButton type='submit' sx={{ bgcolor: orange, marginLeft: '1rem', padding: '0.5rem', color: 'white', "&:hover": { bgcolor: 'error.dark' }, rotate: '-30deg' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} />
    </ Fragment>
  )
}

export default AppLayout()(Chat);