import DeleteIcon from '@mui/icons-material/Delete';
import { Box, LinearProgress, Typography } from '@mui/material';
import { motion } from "framer-motion";
import moment from 'moment';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { fileFormat } from '../../lib/feature';
import RenderAttachment from './RenderAttachment';
import { ProgressiveLoader } from '../layout/Loaders';

const MessageComponent = ({ message, user, deleteMessage, isLoading }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeFormat = moment(createdAt).format('hh:mm A');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const { isMobile } = useSelector(state => state.utility);

  const handleDeleteMessage = () => {
    deleteMessage(message._id);
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (sameSender && !contextMenu.visible) {
      const messageBox = e.currentTarget.getBoundingClientRect();
      setContextMenu({ visible: true, x: e.pageX - messageBox.left, y: e.pageY - messageBox.top });
    }
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  return (
    <motion.div initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ staggerChildren: 0.1, duration: 0.3 }}
      style={{
        display: "flex",
        justifyContent: sameSender ? "flex-end" : "flex-start",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      {isLoading && <ProgressiveLoader />}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        style={{
          backgroundColor: sameSender ? "#DCF8C6" : "#FFFFFF",
          color: "black",
          borderRadius: "8px",
          padding: "7px 5px",
          maxWidth: "50%", 
          minWidth: "65px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          fontSize: "14px",
          textAlign: "left",
          cursor: "text",
          wordWrap: "break-word", 
          lineHeight: "1.4",
          position: "relative",
        }} onContextMenu={handleContextMenu} onMouseLeave={handleCloseContextMenu}>

        {/* Context Menu Pop Up */}
        {
          contextMenu.visible && (
            <div
              style={{
                position: "absolute",
                top: `${contextMenu.y}px`,
                right: `${contextMenu.x}px`,
                zIndex: 1000,
                backgroundColor: '#1a1a1a',
                padding: "5px 10px",
                cursor: 'pointer',
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                minWidth: '170px',
              }}
              className='contextMenu'
            >
              <button onClick={handleDeleteMessage} className='delete-message'>
                <DeleteIcon style={{ marginRight: "5px" }} />
                <span style={{ marginLeft: "5px", fontSize: '14px' }}>Delete Message</span>
              </button>
            </div>
          )
        }

        {!sameSender && <Typography variant='caption' textTransform={'capitalize'} style={{
          color: "#0000b2",
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
                <Box key={index * 2}>
                  <a href={url} target='_top' download style={{ color: 'black', }}>
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
            fontSize: `${isMobile ? "8px" : "10px"}`,
            color: '#010101',
            textRendering: "optimizeLegibility",
            position: "absolute",
            bottom: '5px',
            display: "inline-block",
            right: "5px",
            whiteSpace: "nowrap",
          }}
        >
          {timeFormat}
        </Typography>
      </motion.div>
    </motion.div>
  )
}

export default memo(MessageComponent)