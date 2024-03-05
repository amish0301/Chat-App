import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../styles/color';
import moment from 'moment';
import { fileFormat } from '../../lib/feature'
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <div style={{ alignSelf: sameSender ? 'flex-end' : 'flex-start', backgroundColor: 'white', color: "black", borderRadius: '5px', padding: '0.5rem', width: 'fit-content' }}>

      {!sameSender && <Typography variant='caption' color={lightBlue} fontWeight={'600'}>{sender.name}</Typography>}

      {content && <Typography>{content}</Typography>}

      {/* Attachment */}
      {
        attachments.length > 0 && (
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a href="" target='_blank' download style={{ color: 'black' }}>
                  {
                    RenderAttachment(file,url)
                  }
                </a>
              </Box>
            )
          })
        )
      }

      <Typography variant='caption' color={'text.secondary'} textAlign='right'>
        {timeAgo}
      </Typography>
    </div>
  )
}

export default memo(MessageComponent)