import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { matBlack } from '../components/styles/color'
import { Menu as MenuIcon, KeyboardBackspace as BackIcon, Edit as EditIcon, Done as DoneIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/apis/api';
import { useAsyncMutation, useXErrors } from '../hooks/hook';
import { GroupsLayoutLoader } from '../components/layout/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';

const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'));
const AddMember = lazy(() => import('../components/dialogs/AddMember'));

// **** SOLO Group Item ****
const GroupItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if (chatId === _id) e.preventDefault();
    }}>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
})

// **** List Of Groups ****
const GroupsList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack width={w} spacing={'1rem'} sx={{ bgcolor: '#ea7070', height: '100vh', overflow: 'auto' }}>
      {
        myGroups?.length > 0 ? (myGroups.map((group) => <GroupItem key={group._id} group={group} chatId={chatId} />)) : (<Typography textAlign={'center'} padding={'1rem'} variant='h6' color={'error.dark'}>No Groups, Oops!!</Typography>)
      }
    </Stack>
  )
};

// **** MAIN Group Component ****
const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddMember } = useSelector(state => state.utility);
  const navigateBack = () => navigate('/');
  const chatId = useSearchParams()[0].get('group');
  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });
  const [renameGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev)
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
    {
      isError: renameGroup.isError,
      error: renameGroup.error,
    },
    {
      isError: removeMember.isError,
      error: removeMember.error,
    },
  ];

  // Error Handler
  useXErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;

    if (groupData) {
      setGroupMembers(groupData.chat.members)
      setGroupNameUpdatedValue(groupData.chat.name)
      setGroupName(groupData.chat.name)
    }

    return () => {
      setGroupMembers([]);
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  }, [groupDetails.data])


  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup("Updaing Group Name...", { chatId, name: groupNameUpdatedValue });
  }

  // Add OR Delete Member Handler 
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteDialog();
    navigate('/groups'); 
  };

  // to ADD Members
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  }, [chatId]);

  const IconBtns = <>
    <Box sx={{ display: { xs: 'block', sm: 'none', position: 'fixed', right: '1rem', top: '1rem' } }}>
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>

    <Tooltip title="Back">
      <IconButton size='small' sx={{ position: 'absolute', top: '1rem', left: '1rem', color: 'white', bgcolor: matBlack, ':hover': { bgcolor: 'rgba(0,0,0,0.7)' } }} onClick={navigateBack}>
        <BackIcon />
      </IconButton>
    </Tooltip>
  </>;

  const GroupName =
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} padding={'3rem'} spacing={'1rem'}>
      {
        isEdit ? (
          <>
            <TextField label="Group Name" value={groupNameUpdatedValue} onChange={e => setGroupNameUpdatedValue(e.target.value)} autoFocus />
            <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant='h5'>{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
              <EditIcon />
            </IconButton>
          </>
        )
      }
    </Stack>;

  const ButtonGroup = (
    <Stack direction={{ sm: 'row', xs: 'column-reverse' }} spacing={'1rem'} p={{ sm: '1rem', xs: '1rem', md: '1rem 4rem' }}>
      <Button size='large' color='error' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='medium' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
    </Stack>
  );

  return myGroups?.isLoading ? <GroupsLayoutLoader /> : (
    <Grid container height={'100vh'}>
      <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={4}>
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: '1rem 3rem' }}>
        {IconBtns}
        {
          groupName && (
            <>
              {GroupName}
              <Typography margin={'2rem'} alignSelf={'flex-start'} variant='h6'>Members</Typography>
              <Stack maxWidth={'45rem'} width={'100%'} boxSizing={'border-box'} padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }} spacing={'2rem'} height={'50vh'} bgcolor={'rgba(0,0,0,0.1)'} overflow={'auto'}>
                {/* Members List */}
                {
                  isLoadingRemoveMember ? <CircularProgress /> : groupMembers?.map((user) => (
                    <UserItem key={user._id} user={user} isAdded handler={removeMemberHandler}  />
                  ))
                }
              </Stack>
              {ButtonGroup}
            </>
          )}
      </Grid>

      {/* Dialogs */}
      {
        isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMember chatId={chatId} />
          </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteDialog} deleteHandler={deleteHandler} isLoading={isLoadingDeleteGroup} />
          </Suspense>
        )
      }

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} sx={{ display: { xs: 'block', sm: 'none' } }}>
        <GroupsList w='50vw' myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

export default Groups