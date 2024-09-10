import { useFetchData } from '6pp'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { ProgressiveLoader } from '../../components/layout/Loaders'
import Table from '../../components/shared/Table'
import { useXErrors } from '../../hooks/hook'
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

  const { loading, data, error } = useFetchData(`${import.meta.env.VITE_SERVER}/api/admin/users`, "dashboard-users");

  const { allUsers } = data || [];
  useXErrors([{ isError: error, error }]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (allUsers) setRows(data.allUsers.map((user) => ({ ...user, id: user._id, avatar: transformImage(user.avatar, 50) })));
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <ProgressiveLoader size={"3rem"}/> : <Table rows={rows} cols={columns} heading={'All Users'} rowHeight={50} />
      }
    </AdminLayout >
  )
}

export default UserManagement