import { useFetchData } from '6pp';
import CheckIcon from '@mui/icons-material/Check';
import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { ProgressiveLoader } from '../../components/layout/Loaders';
import Table from '../../components/shared/Table';
import { useXErrors } from '../../hooks/hook';
import { transformImage } from '../../lib/feature';

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', width: 200 },
  { field: 'content', headerName: 'Content', headerClassName: 'table-header', width: 400 },
  {
    field: 'groupChat', headerName: 'Group Chat', headerClassName: 'table-header', width: 100, renderCell: (params) => (
      <>
        {params.row.groupChat ? <CheckIcon /> : '-'}
      </>
    )
  },
  {
    field: 'sender', headerName: 'Send By', headerClassName: 'table-header', width: 200, renderCell: (params) => (
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <Avatar src={transformImage(params.row.sender.avatar)} alt={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  { field: 'chat', headerName: 'Chat-ID', headerClassName: 'table-header', width: 220 },
  { field: 'createdAt', headerName: 'Time', headerClassName: 'table-header', width: 250 },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  const { loading, data, error } = useFetchData(`${import.meta.env.VITE_SERVER}/api/admin/messages`, "dashboard-message");

  const { messages } = data || [];
  useXErrors([{ isError: error, error }]);

  useEffect(() => {
    if (data) setRows(messages.map((msg) => ({ ...msg, id: msg._id, content: msg.content, groupChat: msg.groupChat, createdAt: new Date(msg.createdAt).toLocaleString() })));
  }, [data])

  return (
    loading ? <ProgressiveLoader /> : <AdminLayout>
      <Table heading={'All Messages'} rows={rows} cols={columns} />
    </AdminLayout>
  )
}

export default MessageManagement