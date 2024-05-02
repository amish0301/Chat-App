import React from 'react'
import { ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu } from '../../redux/reducers/misc';
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material';

const FileMenu = ({ anchorE1 }) => {

  const { isFileMenu } = useSelector(state => state.utility);
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {

  }
  const closeMenu = () => {
    dispatch(setIsFileMenu(false));
  }

  return (
    <Menu open={isFileMenu} anchorEl={anchorE1} onClose={closeMenu}>
      <div style={{ width: '10rem', outline: 'none', borderRadius: '0.5rem', padding: '0.2rem' }}>
        {/* needed Do's : can wrap icons in tooltip */}
        <MenuList sx={{ width: '100%' }}>
          <MenuItem>
            <UploadFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Files</ListItemText>
            <input type="file" multiple accept='*' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Files")} />
          </MenuItem>

          <MenuItem>
            <ImageIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
            <input type="file" multiple accept='image/png, image/jpeg, image/gif' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Images")} />
          </MenuItem>

          <MenuItem>
            <AudioFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
            <input type="file" multiple accept='audio/wav, audio/mpeg' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Audios")} />
          </MenuItem>

          <MenuItem>
            <VideoFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Video</ListItemText>
            <input type="file" multiple accept='video/mp4, video/webm, video/ogg' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Videos")} />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default FileMenu