import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler, isLoading }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{fontWeight: 'bolder'}}>
                    Are you sure you want to <code>`delete`</code> this Group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color='error' onClick={deleteHandler} disabled={isLoading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog