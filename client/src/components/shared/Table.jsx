import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { matBlack } from '../styles/color'

const Table = ({ rows, cols, heading, rowHeight = 52 }) => {
    return (
        <Container sx={{ height: '100vh' }}>
            <Paper elevation={3} sx={{ padding: '1rem 4rem', borderRadius: '1rem', margin: 'auto', width: '100%', overflow: 'hidden', height: '100%', boxShadow: 'none' }}>
                <Typography textAlign={'center'} variant='h4' sx={{ margin: '2rem', textTransform: 'uppercase' }}>{heading}</Typography>
                <DataGrid rows={rows} columns={cols} rowHeight={rowHeight} disableColumnMenu disableColumnSelector disableDensitySelector disableSelectionOnClick style={{ height: '80%' }} sx={{
                    border: 'none', '.table-header': {
                        bgcolor: matBlack, color: 'white'
                    }, '.MuiDataGrid-iconButtonContainer': {
                        visibility: 'hidden',
                    },
                    '.MuiDataGrid-sortIcon': {
                        opacity: 'inherit !important',
                        color: 'whitesmoke'
                    },
                }} />
            </Paper>
        </Container>
    )
}

export default Table