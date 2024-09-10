import React, { useRef } from 'react'
import { ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useSendAttachmentsMutation } from '../../redux/apis/api';

const FileMenu = ({ anchorE1, chatId }) => {

  const { isFileMenu } = useSelector(state => state.utility);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const selectRef = (ref) => {
    ref.current?.click();
  }

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  }

  const [sendAttachments] = useSendAttachmentsMutation();

  const fileChangeHandler = async (e, fileType) => {
    const files = Array.from(e.target.files);

    if(files.length > 15) {
      return toast.error(`You can only send 15 ${fileType} files at a time`);
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${fileType}`);
    closeFileMenu();

    // fetching files to upload file
    try {
      const myForm = new FormData();
      myForm.append('chatId', chatId);
      files.forEach(file => myForm.append('files', file));
      const res = await sendAttachments(myForm);

      if(res.data) toast.success(`${fileType} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${fileType}`, { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    }finally {
      dispatch(setUploadingLoader(false))
    }
  }

  return (
    <Menu open={isFileMenu} anchorEl={anchorE1} onClose={closeFileMenu} >
      <div style={{ width: '10rem', outline: 'none', background: 'inherit' }}>
        <MenuList sx={{ width: '100%' }}>
          <MenuItem onClick={() => selectRef(fileRef)}>
            <UploadFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Files</ListItemText>
            <input type="file" multiple accept='*' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Files")} ref={fileRef}/>
          </MenuItem>

          <MenuItem onClick={() => selectRef(imageRef)}>
            <ImageIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
            <input type="file" multiple accept='image/png, image/jpeg, image/gif' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Images")} ref={imageRef}/>
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <AudioFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
            <input type="file" multiple accept='audio/wav, audio/mpeg' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Audios")} ref={audioRef} />
          </MenuItem>

          <MenuItem onClick={() => selectRef(videoRef)}>
            <VideoFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Video</ListItemText>
            <input type="file" multiple accept='video/mp4, video/webm, video/ogg' style={{ display: 'none' }} onChange={(e) => fileChangeHandler(e, "Videos")} ref ={videoRef}/>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default FileMenu