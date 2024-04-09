import React from 'react'
import Header from './Header'
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../ChatList';
import { useParams } from 'react-router-dom';
import Profile from '../Profile'
import { useMyChatQuery } from '../../redux/apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../../redux/reducers/misc';
import { useXErrors } from '../../hooks/hook';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const dispatch = useDispatch();

        const { isMobile } = useSelector(state => state.utility);
        const { user } = useSelector(state => state.auth);

        // all below destructured data is provided by default RTK query
        const { isLoading, data, isError, error, refetch } = useMyChatQuery("");
        
        // for errors
        useXErrors([{ isError, error }]);

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
                <Grid container height={"calc(100vh - 4vh)"}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100%"}>
                        {
                            isLoading ? (<Skeleton />) : (<ChatList chats={data?.chats} chatId={chatId} newMessageAlert={[{ chatId, count: 2 }]} onlineUsers={['2', '3', '4']} handleDeleteChat={handleDeleteChat} />)
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' }, padding: '1rem', bgcolor: 'rgba(0,0,0,0.5)' }} height={"100%"}>
                        <Profile user = {user}/>
                    </Grid>
                </Grid>

                {
                    isLoading ? (<Skeleton />) : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                            <ChatList w='70vw' chats={data?.chats} chatId={chatId} newMessageAlert={[{ chatId, count: 2 }]} onlineUsers={['2', '3', '4']} handleDeleteChat={handleDeleteChat} />
                        </Drawer>
                    )
                }
            </>
        )
    }
}

export default AppLayout