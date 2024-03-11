import { styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom';
import { matBlack } from './color';

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
);

export const SearchField = styled('input')(
    `padding: 1rem 2rem;
    width: 20vmax;
    border: none;
    border-radius: 1.5rem;
    background-color: #f1f1f1;
    font-size: 1.1rem;
    `
);

export const CurveButton = styled('button')(
    `border-radius: 1.5rem;
    padding: 0.5rem 2.5rem;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${matBlack};
    color: white;
    :hover {
        background-color: rgba(0,0,0,0.8);
    }
    `
);