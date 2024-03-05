import React from 'react'
import { transformImage } from '../../lib/feature';
import { FileOpen } from '@mui/icons-material';

const RenderAttachment = (file,url) => {
  switch(file) {
    case 'video':
        <video src={url} controls width={'200px'} preload='none' />;
        break;
    case 'image':
        <img src={transformImage(url,200)} alt='attachment' width={'200px'} height= '150px' preload='none' style={{objectFit: 'contain'}}/>;
        break;
    case 'audio':
        <audio src={url} preload='none' controls/>;
        break;
    default:
        <FileOpen />
  }
}

export default RenderAttachment