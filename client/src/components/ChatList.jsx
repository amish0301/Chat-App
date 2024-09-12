import { Stack, Typography } from '@mui/material'
import React from 'react'
import ChatItem from './shared/ChatItem'

const ChatList = ({ w = "100%", chats = [], chatId, onlineUsers = [], newMessagesAlert, handleDeleteChat }) => {
    return (
        <Stack width={w} direction={'column'} overflow={'auto'} height={'100%'} position={'relative'}>
            {
                chats.length > 0 ? (chats?.map((data, index) => {
                    const { avatar, _id, name, groupChat, members } = data;
                    const messageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
                    const isOnline = members?.some((member) => onlineUsers.includes(member));

                    return <ChatItem index={index} newMessagesAlert={messageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={_id} groupChat={groupChat} sameSender={chatId === _id} handleDeleteChat={handleDeleteChat} />
                })) : (
                    <Typography variant='body1' width={'100%'} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bolder', textAlign: 'center', textWrap: 'wrap' }}>Don't have anyone to chat</Typography>
                )
            }
        </Stack>
    )
}

export default ChatList