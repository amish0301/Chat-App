import { styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom';
import { grayColor } from './color';

export const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'react(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});



export const Link = styled(LinkComponent)(
    `text-decoration: none;
    color: black;
    padding: 0;
    &:hover {
        background-color: rgba(0,0,0,0.1);
    }`
);

export const InputBox = styled("input")(
    `width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 2.2rem;
    border-radius: 0.7rem;
    background-color: transparent;
    color: black;
    `
)