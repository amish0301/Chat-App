import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import { grayColor, orange } from '../components/styles/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery, useDeleteMessageMutation, useGetMessagesQuery } from '../redux/apis/api';
import { useSocketEvents, useXErrors } from '../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
// import useInfiniteScrollTop from '../hooks/infiniteScrollTop';
import { useInfiniteScrollTop } from '6pp';
import { setIsFileMenu } from '../redux/reducers/misc';
import { useNavigate } from 'react-router-dom';

const Chat = ({ chatId }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth)

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  // const [IamTyping, setIamTyping] = useState(false);
  // const [userTyping, setUserTyping] = useState(false);
  // const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  // const messageOnChange = (e) => {
  //   setMessage(e.target.value);

  //   if (!IamTyping) {
  //     socket.emit(START_TYPING, { members, chatId });
  //     setIamTyping(true);
  //   }

  //   if (typingTimeout.current) clearTimeout(typingTimeout.current);

  //   typingTimeout.current = setTimeout(() => {
  //     socket.emit(STOP_TYPING, { members, chatId });
  //     setIamTyping(false);
  //   }, [2000]);
  // };

  const handleFileMenu = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    // socket.emit(CHAT_JOINED, { userId: user._id, members });
    // dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      // socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  // const startTypingListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;

  //     setUserTyping(true);
  //   },
  //   [chatId]
  // );

  // const stopTypingListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;
  //     setUserTyping(false);
  //   },
  //   [chatId]
  // );

  // const alertListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;
  //     const messageForAlert = {
  //       content: data.message,
  //       sender: {
  //         _id: "djasdhajksdhasdsadasdas",
  //         name: "Admin",
  //       },
  //       chat: chatId,
  //       createdAt: new Date().toISOString(),
  //     };

  //     setMessages((prev) => [...prev, messageForAlert]);
  //   },
  //   [chatId]
  // );

  // console.log('oldMessages', oldMessages);

  const eventHandler = {
    // [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    // [START_TYPING]: startTypingListener,
    // [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useXErrors(errors);

  const deleteMessage = (id) => {
    // delete chat in database
    useDeleteMessageMutation({ chatId, messageId: id });
    setMessages(prev => prev.filter(msg => msg._id !== id));
  }

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={grayColor} height={'90%'} sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {/* messages */}
        {allMessages?.map((msg) => (
          <MessageComponent key={msg._id} message={msg} user={user} deleteMessage={deleteMessage} />
        ))}
        <div ref={bottomRef} />
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

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
