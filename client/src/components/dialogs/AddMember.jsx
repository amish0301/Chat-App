import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, Stack, Typography, unstable_createMuiStrictModeTheme } from '@mui/material'
import { sampleUsers } from '../../utils/sampleData'
import UserItem from '../shared/UserItem'

const AddMember = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectedMemberHandler = (id) => {
        // check if user is already added or not
        // if alredy added then make isAdded -> !isAdded, otherwise add user
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter(currId => currId !== id) : [...prev, id]);
    }

    const addMemberSubmitHandler = () => {
        
    }

    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([]);
    }

    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={'2rem'} maxWidth={'25rem'} spacing={'1rem'}>
                <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
                <Stack spacing={'1rem'}>
                    {
                        members?.length > 0 ? (sampleUsers.map((user) => (
                            <UserItem key={user._id} user={user} handler={selectedMemberHandler} isAdded={selectedMembers.includes(user._id)} />
                        ))) : (<Typography textAlign={'center'}>Sadly, No Friends</Typography>)
                    }
                </Stack>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} >
                    <Button size='medium' color='error' onClick={closeHandler}>cancel</Button>
                    <Button size='medium' variant='contained' onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Confirm</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMember