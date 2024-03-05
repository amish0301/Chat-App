import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{fontWeight: 'bolder'}}>
                    Are you sure you want to `delete` this Group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color='error' onClick={deleteHandler}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog