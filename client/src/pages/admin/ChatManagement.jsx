import { useFetchData } from '6pp'
import CheckIcon from '@mui/icons-material/Check'
import { Avatar, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { ProgressiveLoader } from '../../components/layout/Loaders'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { useXErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/feature'

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', width: 200 },
  { field: 'avatar', headerName: 'Avatar', headerClassName: 'table-header', width: 120, renderCell: (params) => <AvatarCard avatar={params.row.avatar} alt={params.row.avatar} /> },
  { field: 'name', headerName: 'Name', headerClassName: 'table-header', width: 250 },
  { field: 'totalMembers', headerName: 'Total Members', headerClassName: 'table-header', width: 150 },
  { field: 'members', headerName: 'Members', headerClassName: 'table-header', width: 250, renderCell: (params) => <AvatarCard avatar={params.row.members} /> },
  { field: 'totalMessages', headerName: 'Total Messages', headerClassName: 'table-header', width: 120 },
  {
    field: 'groupChat', headerName: 'Group Chat', headerClassName: 'table-header', width: 100, renderCell: (params) => (
      <>
        {params.row.groupChat ? <CheckIcon /> : '-'}
      </>
    )
  },
  {
    field: 'creator', headerName: 'Created By', headerClassName: 'table-header', width: 250, renderCell: (params) => (
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
]

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(`${import.meta.env.VITE_SERVER}/api/admin/chats`, "dashboard-chats");

  const { chats } = data || [];
  useXErrors([{ isError: error, error }]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) setRows(chats.map((user) => ({ ...user, id: user._id, avatar: user.avatar.map((i) => transformImage(i, 50)), members: user.members.map((i) => transformImage(i.avatar, 50)), creator: { name: user.creator.name, avatar: transformImage(user.creator.avatar, 50) } })));
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <ProgressiveLoader size={"3rem"}/> : <Table rows={rows} cols={columns} heading={'All Chats'} rowHeight={50} />
      }
    </AdminLayout >
  )
}

export default ChatManagement