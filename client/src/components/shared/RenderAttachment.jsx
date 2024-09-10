import React from 'react'
import { transformImage } from '../../lib/feature';
import { FileOpen } from '@mui/icons-material';

const RenderAttachment = (file, url) => {
    switch (file) {
        case 'video':
            return <video src={url} controls width={'200px'} preload='none' />;
        case 'image':
            return <img src={transformImage(url, 200)} alt='attachment' width={'200px'} height='150px' preload='none' style={{ objectFit: 'contain' }} />;
        case 'audio':
            return <audio src={url} preload='none' controls />;
        default:
            return <FileOpen />
    }
}

export default RenderAttachment