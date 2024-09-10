import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useXErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/apis/api'
import { setIsAddMember } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'

const AddMember = ({ chatId }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const dispatch = useDispatch();
    const { isAddMember } = useSelector(state => state.utility);
    const { isLoading, data, isError, error } = useAvailableFriendsQuery({ chatId }, { skip: !chatId });

    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);
    const members = data?.friends || [];

    const selectedMemberHandler = (id) => {
        // check if user is already added or not
        // if not added then, add user
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter(currId => currId !== id) : [...prev, id]);
    }

    const errors = [
        { isError: isError, error: error },
    ];

    useXErrors(errors);

    const closeHandler = () => {
        dispatch(setIsAddMember(false));
        setSelectedMembers([]);
    }

    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { chatId, members: selectedMembers });
        closeHandler();
    }


    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={'2rem'} maxWidth={'25rem'} spacing={'1rem'}>
                <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
                <Stack spacing={'1rem'}>
                    {
                        isLoading ? <Skeleton /> : members.length > 0 ? (members?.map((user) => (
                            <UserItem key={user._id} user={user} handler={selectedMemberHandler} isAdded={selectedMembers.includes(user._id)} />
                        ))) : (<Typography textAlign={'center'}>Sadly, No Friends</Typography>)
                    }
                </Stack>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} >
                    <Button size='medium' color='error' onClick={closeHandler}>cancel</Button>
                    <Button size='medium' variant='contained' onClick={addMemberSubmitHandler} disabled={isLoadingAddMembers}>Confirm</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMember