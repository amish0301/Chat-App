import React from 'react'
import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import {transformImage} from '../../lib/feature'

const AvatarCard = ({ avatar = [], max = 2, groupChat }) => {
    return (
        <Stack direction={'row'} spacing={1} >
            <AvatarGroup sx={{position: 'relative'}}>
                <Box width={'5rem'} height={'3rem'}>
                    {
                        avatar?.map((src, index) => (
                            index < max &&
                            (<Avatar src={transformImage(src)} key={Math.random() * 100} alt={`Avatar ${index}`} sx={{
                                width: '3rem', height: '3rem', position: "absolute", left: {
                                    xs: `${0.5 + index}rem`, sm: `${index}rem`,
                                },
                            }} />)
                        ))
                    }

                    {/* if there are more than max limit avatar we just simply shows count of avatar */}
                    {
                        avatar.length - max > 0 ? <Avatar key={Math.random() * 100} sx={{
                            width: '3rem', height: '3rem', position: "absolute", left: {
                                xs: `1rem`, sm: `1.5rem`,
                            },
                        }}>+{avatar.length - max}</Avatar> : null
                    }
                </Box>
            </AvatarGroup>
        </Stack>
    )
}

export default AvatarCard