import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents';
import { Box, Stack, Typography } from '@mui/material';

const ChatItem = ({ avatar = [], name, _id, groupChat = false, sameSender, isOnline, newMessageAlert, index = 0, handleDeleteChatOpen }) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChatOpen(e, _id, groupChat)}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
        backgroundColor: sameSender ? "blue" : "unset",
        color: sameSender ? "white" : "unset",
        fontWeight: "bolder",
        position: "relative",
      }}>

        {/* Avatar Card */}
        <Stack>
          <Typography>{name}</Typography>
          {
            newMessageAlert && (
              <Typography> {newMessageAlert.count} </Typography>
            )
          }
        </Stack>

        {
          isOnline && <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)' }} />
        }
      </div>
    </Link>
  )
}

export default memo(ChatItem)