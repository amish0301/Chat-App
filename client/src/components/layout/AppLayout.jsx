import React from 'react'
import Header from './Header'
import Title from '../shared/Title';
import { Grid } from '@mui/material';
import ChatList from '../ChatList';
import { samplechats } from '../../utils/sampleData';
import { useParams } from 'react-router-dom';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const chatId = useParams();
        
        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100%"}>
                        <ChatList chats={samplechats} chatId={chatId} newMessageAlert={[{ chatId, count: 4 }]} onlineUsers={['1', '2']} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' }, padding: '2rem', bgcolor: 'rgba(0,0,0,0.85)' }} height={"100%"}>
                        3rd
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default AppLayout