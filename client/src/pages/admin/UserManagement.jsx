import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../utils/sampleData'
import { transformImage } from '../../lib/feature'

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', width: 200 },
  { field: 'avatar', headerName: 'Avatar', headerClassName: 'table-header', width: 150, renderCell: (params) => <Avatar src={params.row.avatar} alt={params.row.avatar} /> },
  { field: 'name', headerName: 'Name', headerClassName: 'table-header', width: 200 },
  { field: 'username', headerName: 'Username', headerClassName: 'table-header', width: 200 },
  { field: 'friends', headerName: 'Friends', headerClassName: 'table-header', width: 150 },
  { field: 'groups', headerName: 'Groups', headerClassName: 'table-header', width: 150 },
]

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.users.map((user) => ({ ...user, id: user._id, avatar: transformImage(user.avatar, 50) })));
  }, [])

  return (
    <AdminLayout>
      <Table rows={rows} cols={columns} heading={'All Users'} rowHeight={'10'} />
    </AdminLayout >
  )
}

export default UserManagement