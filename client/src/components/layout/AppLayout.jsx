import React, { useCallback, useEffect } from 'react'
import Header from './Header'
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../ChatList';
import { useParams } from 'react-router-dom';
import Profile from '../Profile'
import { useMyChatQuery } from '../../redux/apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../../redux/reducers/misc';
import { useSocketEvents, useXErrors } from '../../hooks/hook';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHAT } from '../../constants/events';
import { incrementNotificationCount, setNewMessagesAlert } from '../../redux/reducers/chat';
import { getOrSaveFromStorage } from '../../lib/feature';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const dispatch = useDispatch();

        // Sockets
        const socket = getSocket();

        const { isMobile } = useSelector(state => state.utility);
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
            dispatch(setNewMessagesAlert(data.chatdId));
        }, [chatId])

        const newRequestAlertListener = useCallback(() => {
            refetch();
        }, [refetch]);

        const refetchListener = useCallback(() => {
            dispatch(incrementNotificationCount());
        }, [dispatch]);

        const eventHandler = { [NEW_MESSAGE_ALERT]: newMessageAlertListener, [NEW_REQUEST]: newRequestAlertListener, [REFETCH_CHAT]: refetchListener };
        useSocketEvents(socket, eventHandler);

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("deleted chat", _id, groupChat);
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        }

        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100%"}>
                        {
                            isLoading ? (<Skeleton />) : (<ChatList chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={['2', '3', '4']} handleDeleteChat={handleDeleteChat} />)
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

                {
                    isLoading ? (<Skeleton />) : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={['2', '3', '4']} handleDeleteChat={handleDeleteChat} />
                        </Drawer>
                    )
                }
            </>
        )
    }
}

export default AppLayout