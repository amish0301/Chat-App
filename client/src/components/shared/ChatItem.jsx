import { Badge, Stack, Typography } from '@mui/material';
import { motion } from "framer-motion";
import React, { memo } from 'react';
import { Link } from '../styles/StyledComponents';
import AvatarCard from './AvatarCard';

const ChatItem = ({ avatar = [], name, _id, groupChat = false, newMessagesAlert, sameSender, isOnline, index = 0, handleDeleteChat }) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.01, ease: "easeInOut" }} key={_id} style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: sameSender ? "#015450" : "#f5f5f5",
        color: sameSender ? "white" : "unset",
        fontWeight: "bolder",
        position: "relative",
        // e0eaea
      }}>

        {/* profile pic */}
        <AvatarCard avatar={avatar} groupChat={groupChat} />

        <Stack>
          <Typography textTransform={groupChat ? 'none' : 'capitalize'}>{name}</Typography>
          {newMessagesAlert && <Badge badgeContent={newMessagesAlert.messageCnt} color="primary" sx={{ position: 'absolute', top: '50%', right: '1.2rem' }} />}
          {isOnline && <Typography sx={{ fontSize: '.8rem', color: '#7b9901', fontWeight: 'bolder', marginTop: '0.3rem' }} variant='caption'> Online </Typography>}
        </Stack>

      </motion.div>
    </Link>
  )
}

export default memo(ChatItem)