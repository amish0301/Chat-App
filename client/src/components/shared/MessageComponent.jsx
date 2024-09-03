import { Box, Typography } from '@mui/material';
import React, { memo, useState } from 'react'
import { lightBlue } from '../styles/color';
import moment from 'moment';
import { fileFormat } from '../../lib/feature'
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user, deleteMessage }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeFormat = moment(createdAt).format('hh:mm A');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleDeleteMessage = () => {
    deleteMessage(message._id);
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (sameSender) {
      const messageBox = e.currentTarget.getBoundingClientRect();
      setContextMenu({ visible: true, x: e.pageX - messageBox.left, y: e.pageY - messageBox.top });
    }
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: sameSender ? "flex-end" : "flex-start",
        maxWidth: "100%",
        position: "relative",
      }}
      onContextMenu={handleContextMenu}
    >
      <div style={{
        backgroundColor: sameSender ? "#DCF8C6" : "#FFFFFF",
        color: "black",
        borderRadius: "15px",
        padding: "10px 5px",
        maxWidth: "75%", // Restricts the maximum width of the message bubble
        minWidth: "60px", // Ensures there's enough space even for short messages
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        fontSize: "14px",
        textAlign: "left",
        cursor: "pointer",
        wordWrap: "break-word", // Prevents long words from overflowing
        lineHeight: "1.4",
        position: "relative",
      }}>

        {/* Context Menu Pop Up */}
        {
          contextMenu.visible && (
            <div
              style={{
                position: "absolute",
                top: `${contextMenu.y}px`,
                right: `${contextMenu.x}px`,
                zIndex: 1000,
                backgroundColor: 'green',
                padding: "5px 10px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              onMouseLeave={handleCloseContextMenu}
            >
              <button onClick={handleDeleteMessage} style={{ cursor: "pointer" }}> 🗑️ Delete</button>
            </div>
          )
        }

        {!sameSender && <Typography variant='caption' style={{
          color: "#34B7F1",
          fontWeight: "600",
          marginBottom: "5px",
          display: "block",
        }}>{sender.name}</Typography>}

        {content && <Typography style={{ marginBottom: attachments?.length > 0 ? "8px" : "16px" }}>{content}</Typography>}

        {/* Attachments */}
        {
          attachments?.length > 0 && (
            attachments.map((attachment, index) => {
              const url = attachment.url;
              const file = fileFormat(url);

              return (
                <Box key={index}>
                  <a href={url} target='_blank' download style={{ color: 'black', }}>
                    {
                      RenderAttachment(file, url)
                    }
                  </a>
                </Box>
              )
            })
          )
        }
        <Typography
          variant="caption"
          style={{
            fontSize: "10px",
            color: 'grey',
            position: "absolute",
            bottom: '5px',
            right: "5px",
            whiteSpace: "nowrap",
          }}
        >
          {timeFormat}
        </Typography>
      </div>
    </div>
  )
}

export default memo(MessageComponent)