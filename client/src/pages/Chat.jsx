import React, { Fragment, useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack, Tooltip } from '@mui/material';
import { grayColor, orange } from '../components/styles/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../utils/sampleData';
import MessageComponent from '../components/shared/MessageComponent'

const Chat = () => {
  const containerRef = useRef(null);
  const user = {
    _id: 'dasdad',
    name: 'Amish Pithva'
  }

  return (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={grayColor} height={'90%'} sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {/* messages */}
        {
          sampleMessage?.map((msg,index) => (
            <MessageComponent key={index} message={msg} user={user}/>
          ))
        }
      </Stack>
      <form style={{ height: '10%' }}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <Tooltip title="Attach Files">
            <IconButton sx={{ rotate: '30deg', position: 'absolute', left: '.8rem' }} >
              <AttachFileIcon />
            </IconButton>
          </Tooltip>

          <InputBox placeholder='Type Message Here...' className='chatFont' sx={{ "&:focus": { border: '2px solid black' } }} />
          <IconButton type='submit' sx={{ bgcolor: orange, marginLeft: '1rem', padding: '0.5rem', color: 'white', "&:hover": { bgcolor: 'error.dark' }, rotate: '-30deg' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </ Fragment>
  )
}

export default AppLayout()(Chat);