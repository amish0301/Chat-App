import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents';
import { Box, Stack, Typography } from '@mui/material';
import AvatarCard from './AvatarCard';

const ChatItem = ({ avatar = [], name, _id, groupChat = false, sameSender, isOnline, newMessageAlert, index = 0, handleDeleteChat }) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        gap: '1rem',
        backgroundColor: sameSender ? "black" : "unset",
        color: sameSender ? "white" : "unset",
        fontWeight: "bolder",
        position: "relative",
      }}>

        {/* profile pic */}
        <AvatarCard avatar={avatar} groupChat={groupChat} />

        <Stack>
          <Typography>{name}</Typography>
          {
            newMessageAlert && (
              <Typography> {newMessageAlert.count} </Typography>
            )
          }
        </Stack>

        {
          isOnline && <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '50%', right: '1rem', bgcolor: '#FFB302', transform: 'translateY(-50%)' }} />
        }
      </div>
    </Link>
  )
}

export default memo(ChatItem)