import { Box, CircularProgress, Grid, Skeleton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export const LayoutLoader = () => {
    return (
        <>
            <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
                <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100vh"}>
                    <Stack spacing={'1rem'}>
                        {
                            Array.from({ length: 20 }).map((_, index) => {
                                <Skeleton key={index} variant="rounded" height={'5rem'} />
                            })
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={10} lg={12} height={"5rem"}>
                    <Skeleton variant="rectangular" height={'100%'} />
                </Grid>
            </Grid>
        </>
    );
}

export const TypingLoader = () => {
    return (
        <div style={{ display: 'flex', gap: '5px', marginLeft: '5px' }}>
            {[...Array(3)].map((_, index) => (
                <motion.span
                    key={index}
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#333",
                        display: "inline-block",
                    }}
                    animate={{
                        y: [0, -3, 0], // Move up and down
                    }}
                    transition={{
                        repeat: Infinity, // Repeat the animation infinitely
                        duration: .6, // Duration of one loop
                        ease: "easeInOut", // Smooth easing
                        delay: index * 0.2, // Stagger the animation for each dot
                    }}
                />
            ))}
        </div>
    )
}

export const GroupsLayoutLoader = () => {
    return (
        <Grid container height={'100vh'}>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={4}>
                <Stack spacing={'1rem'}>
                    {
                        Array.from({ length: 5 }).map((_, index) => {
                            <Skeleton key={index} variant="rounded" height={'5rem'} />
                        })
                    }
                </Stack>
            </Grid>
            <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: '1rem 3rem' }}>
                <Box sx={{ display: { xs: 'block', sm: 'none', position: 'fixed', right: '1rem', top: '1rem' } }}>
                    <Skeleton variant="circular" width={24} height={24} style={{ animationDelay: '.1s' }} />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none', position: 'fixed', right: '1rem', top: '1rem' } }}>
                    <Skeleton variant="circular" width={24} height={24} style={{ animationDelay: '.1s' }} />
                </Box>
                {
                    (
                        <>
                            <Skeleton variant="rounded" height={'5rem'} width={'100%'} />
                            <Skeleton variant="text" height={'3rem'} width={'100%'} />
                            <Stack maxWidth={'45rem'} width={'100%'} boxSizing={'border-box'} padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }} spacing={'2rem'} height={'50vh'} overflow={'auto'}>
                                {
                                    Array.from({ length: 5 }).map((_, index) => {
                                        <Skeleton key={index} variant="rounded" height={'5rem'} />
                                    })
                                }
                            </Stack>
                            <Stack direction={'row'} spacing={'1rem'} p={{ sm: '1rem', xs: '1rem', md: '1rem 4rem' }}>
                                {
                                    Array.from({ length: 2 }).map((_, index) => {
                                        <Skeleton key={index} variant="rounded" height={'5rem'} />
                                    })
                                }
                            </Stack>
                        </>
                    )}
            </Grid>
        </Grid>

    );
}

export const ProgressiveLoader = ({ h = '100%' }) => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} height={h}>
            <CircularProgress />
        </Stack>
    )
}