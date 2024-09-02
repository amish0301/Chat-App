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
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  // on send message FUNCTION
  const onSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emitting new message event to backend
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }

  const newMessagesListener = useCallback((data) => {
    // append message only when chatId matches
    if(data.chatId !== chatId) return;
    setMessages(prev => ([...prev, data.message]));
  }, [chatId]);

  // Listening socket events comning from backend
  const eventHandler = { [NEW_MESSAGE]: newMessagesListener };
  useSocketEvents(socket, eventHandler);

  // fetching messages for a specific chat
  useEffect(() => {
    return () => {
      setMessages([]);
      setPage(1);
      setMessage("");
      setOldMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);
  
  // Infinite Scroll
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, oldMessagesChunk.data?.totalPages, page, setPage, oldMessagesChunk.data?.messages);
  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }, { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }];
  
  // ********** Need some fixes in below useXErrors **************
  useXErrors(errors);

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
            <MessageComponent key={msg._id} message={msg} user={user} />
          ))
        }
      </Stack>
      <form style={{ height: '10%' }} onSubmit={onSendMessage}>
        <Stack direction={'row'} height={'100%'} padding={'.5rem 1.5rem'} alignItems={'center'} position={'relative'}>
          <Tooltip title="Attach Files">
            <IconButton sx={{ rotate: '30deg', position: 'absolute', left: '1.2rem' }} onClick={handleFileMenu}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>

          <InputBox placeholder='Type Message Here...' value={message} onChange={(e) => setMessage(e.target.value)} className='chatFont' sx={{ "&:focus": { border: '2px solid black' }, width: '100%' }} />
          <IconButton type='submit' disabled={!message.trim()} sx={{ bgcolor: orange, marginLeft: '1rem', padding: '0.5rem', color: 'white', "&:hover": { bgcolor: 'error.dark' }, rotate: '-30deg' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
    </ Fragment>
  )
}

export default AppLayout()(Chat);