import { useInfiniteScrollTop } from '6pp';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import EmojiOutline from '@mui/icons-material/EmojiEmotionsOutlined';
import { IconButton, Skeleton, Stack, Tooltip } from '@mui/material';
import Picker from 'emoji-picker-react';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { TypingLoader } from '../components/layout/Loaders';
import MessageComponent from '../components/shared/MessageComponent';
import { grayColor, orange } from '../components/styles/color';
import { InputBox } from '../components/styles/StyledComponents';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useAsyncMutation, useSocketEvents, useXErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteMessageMutation, useGetMessagesQuery } from '../redux/apis/api';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { setIsFileMenu, setShowEmojiPicker } from '../redux/reducers/misc';
import { getSocket } from '../socket';

const Chat = ({ chatId }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { showEmojiPicker } = useSelector(state => state.utility);
  const [deleteMessageRequest, isLoadingDeleteMessage] = useAsyncMutation(useDeleteMessageMutation);

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  // States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

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
    { isError: deleteMessageRequest.isError, error: deleteMessageRequest.error }
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [1000]);
  };

  const handleFileMenu = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setIamTyping(false);
    setMessage("");
  };

  const handleEmojiOnkeyDown = (e) => {
    if (e.key === 'Escape') dispatch(setShowEmojiPicker(!showEmojiPicker));
  }

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      dispatch(setIsFileMenu(false));
      dispatch(setShowEmojiPicker(false));
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
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

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  // Admin Message
  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  // Event Listeners
  useSocketEvents(socket, eventHandler);

  useXErrors(errors);

  const handleDeleteMessage = (messageId) => {
    deleteMessageRequest("Deleting Message...", { chatId, messageId });
    setOldMessages((prev) => prev.filter((msg) => msg._id !== messageId));
  };

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={grayColor} height={'90%'} sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {/* messages */}
        {allMessages?.map((msg) => (
          <MessageComponent key={msg._id} message={msg} user={user} deleteMessage={handleDeleteMessage} isLoading={isLoadingDeleteMessage} />
        ))}
        {userTyping && !IamTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form style={{ height: '10%' }} onSubmit={onSendMessage} onKeyDown={handleEmojiOnkeyDown}>
        <Stack direction={'row'} height={'100%'} padding={'.5rem 1rem'} alignItems={'center'} position={'relative'}>
          {showEmojiPicker && <div style={{ position: 'absolute', bottom: '100%', left: '1rem' }}>
            <Picker onEmojiClick={(e) => setMessage(message + e.emoji)} theme='dark' />
          </div>}
          <Tooltip title="Emoji">
            <IconButton sx={{ marginRight: '.5rem' }} onClick={() => dispatch(setShowEmojiPicker(!showEmojiPicker))}>
              {showEmojiPicker ? <EmojiIcon /> : <EmojiOutline />}
            </IconButton>
          </Tooltip>

          <InputBox placeholder='Type Message Here...' value={message} onChange={messageOnChange} className='chatFont' sx={{ width: '100%', paddingLeft: '5px' }} autoFocus={showEmojiPicker} />
          <Tooltip title="Attach Files">
            <IconButton sx={{ rotate: '30deg', marginLeft: '.5rem' }} onClick={handleFileMenu}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
          <IconButton type='submit' disabled={!message.trim()} sx={{ bgcolor: orange, marginLeft: '.5rem', padding: '0.5rem', color: 'white', "&:hover": { bgcolor: 'error.dark' }, rotate: '-30deg' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
