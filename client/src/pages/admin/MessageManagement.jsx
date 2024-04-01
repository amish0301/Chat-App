import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table';

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', width: 200 },
  { field: 'attachments', headerName: 'Attachments', headerClassName: 'table-header', width: 200, renderCell: (params) => <Avatar src={params.row.avatar} alt={params.row.avatar} /> },
  { field: 'content', headerName: 'Content', headerClassName: 'table-header', width: 400 },
  { field: 'sender', headerName: 'Send By', headerClassName: 'table-header', width: 200, renderCell: (params) => (
    <Stack>
      <Avatar alt={params.row.name} src={params.row.avatar} />
      <span>{params.row.sender.name}</span>
    </Stack>
  )},
  { field: 'chat', headerName: 'Chat', headerClassName: 'table-header', width: 220 },
  { field: 'groupChat', headerName: 'Group Chat', headerClassName: 'table-header', width: 100 },
  { field: 'createdAt', headerName: 'Time', headerClassName: 'table-header', width: 250 },
];

const MessageManagement = () => {
  const [rows,setRows] = useState([]);

  return (
    <AdminLayout>
        <Table heading={'All Messages'} rows={rows} cols={columns} />
    </AdminLayout>
  )
}

export default MessageManagement