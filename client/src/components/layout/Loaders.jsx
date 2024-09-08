import React from "react";
import { Grid, Skeleton, Stack, Box } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

export const LayoutLoader = () => {
    return (
        <>
            <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
                <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} height={"100%"}>
                    <Stack spacing={'1rem'}>
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                <Skeleton key={index} variant="rounded" height={'5rem'} />
                            })
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                    <Skeleton variant="rectangular" />
                </Grid>
                <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }} height={"100%"}>
                    <Skeleton variant="rectangular" height={'100vh'} />
                </Grid>
            </Grid>
        </>
    );
}

export const TypingLoader = () => {
    return (
        <Stack spacing={'.5rem'} direction={'row'} display={'flex'} alignItems={'center'} padding={'.5rem'} justifyContent={'flex-start'}>
            <BouncingSkeleton variant="circular" width={12} height={12} style={{ animationDelay: '.1s' }} />
            <BouncingSkeleton variant="circular" width={12} height={12} style={{ animationDelay: '.2s' }} />
            <BouncingSkeleton variant="circular" width={12} height={12} style={{ animationDelay: '.4s' }} />
        </Stack>
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