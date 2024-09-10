import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHAT } from '../../constants/events';
import { useSocketEvents, useXErrors } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/feature';
import { useMyChatQuery } from '../../redux/apis/api';
import { incrementNotificationCount, setNewMessagesAlert } from '../../redux/reducers/chat';
import { setIsDeleteMenu, setIsMobile, setOnlineUsers, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { getSocket } from '../../socket';
import ChatList from '../ChatList';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';
import Profile from '../Profile';
import Title from '../shared/Title';
import Header from './Header';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const deleteChatMenuAnchor = useRef(null);

        // Sockets
        const socket = getSocket();

        const { isMobile, onlineUsers } = useSelector(state => state.utility);
        const { user } = useSelector(state => state.auth);
        const { newMessagesAlert } = useSelector(state => state.chat);

        // all below destructured data is provided by default RTK query
        const { isLoading, data, isError, error, refetch } = useMyChatQuery("");

        // for errors
        useXErrors([{ isError, error }]);

        // Save state in LocalStorage
        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
        }, [newMessagesAlert])

        // fetching if any notification available
        const newMessageAlertListener = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId])

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount());
        }, [dispatch]);

        // refetching chat list for updated notification
        const refetchListener = useCallback(() => {
            refetch();
            navigate('/');
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            dispatch(setOnlineUsers(data));
        }, [dispatch]);

        const eventHandler = { [NEW_MESSAGE_ALERT]: newMessageAlertListener, [NEW_REQUEST]: newRequestListener, [REFETCH_CHAT]: refetchListener, [ONLINE_USERS]: onlineUsersListener };
        useSocketEvents(socket, eventHandler);

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ groupChat, chatId }));
            deleteChatMenuAnchor.current = e.currentTarget;
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        }

        return (
            <>
                <Title />
                <Header />
                <DeleteChatMenu dispatch={dispatch} deleteChatMenuAnchor={deleteChatMenuAnchor.current} />
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100%"}>
                        {
                            isLoading ? (<Skeleton height={"100%"} />) : (<ChatList chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={onlineUsers} handleDeleteChat={handleDeleteChat} />)
                        }
                    </Grid>
                    {/* for showing profile change below grid with for md = 5 & lg = 6 */}
                    <Grid item xs={12} sm={8} md={9} lg={9} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'none' }, padding: '1rem', bgcolor: '#c06c84' }} height={"100%"}>
                        <Profile user={user} />
                    </Grid>
                </Grid>

                {/* Mobile Screen */}
                {
                    isLoading ? (<Skeleton />) : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={onlineUsers} handleDeleteChat={handleDeleteChat} />
                        </Drawer>
                    )
                }
            </>
        )
    }
}

export default AppLayout