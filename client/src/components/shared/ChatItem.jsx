import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents';
import { Badge, Box, Stack, Typography } from '@mui/material';
import AvatarCard from './AvatarCard';
import { motion } from "framer-motion"

const ChatItem = ({ avatar = [], name, _id, groupChat = false, newMessagesAlert, sameSender, isOnline, index = 0, handleDeleteChat }) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }} key={_id} style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: sameSender ? "#015450" : "#e0eaea",
        color: sameSender ? "white" : "unset",
        fontWeight: "bolder",
        position: "relative",
      }}>

        {/* profile pic */}
        <AvatarCard avatar={avatar} groupChat={groupChat} />

        <Stack>
          <Typography>{name}</Typography>
          {/* {
            newMessagesAlert && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Typography sx={{ fontSize: '.8rem', color: '#7b9901', fontWeight: 'bolder' }} variant='caption'> {newMessagesAlert.messageCnt} </Typography>
                <Typography variant='caption' sx={{ color: 'black'}}>Unread Messages</Typography>
              </div>
            )
          } */}
          {isOnline && <Typography sx={{ fontSize: '.8rem', color: '#7b9901', fontWeight: 'bolder', marginTop: '0.3rem' }} variant='caption'> Online </Typography>}
        </Stack>

        {/* {
          isOnline && <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '50%', right: '1rem', bgcolor: '#FFB302', transform: 'translateY(-50%)' }} />
        } */}
        {
          newMessagesAlert && <Badge badgeContent={newMessagesAlert.messageCnt} color="primary" sx={{ position: 'absolute', top: '50%', right: '1.2rem', transform: 'translateY(-50%)' }} />
        }
      </motion.div>
    </Link>
  )
}

export default memo(ChatItem)