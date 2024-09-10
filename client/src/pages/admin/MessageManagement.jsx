import { useFetchData } from '6pp';
import { Avatar, Box, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { ProgressiveLoader } from '../../components/layout/Loaders';
import RenderAttachment from '../../components/shared/RenderAttachment';
import Table from '../../components/shared/Table';
import { useXErrors } from '../../hooks/hook';
import { fileFormat, transformImage } from '../../lib/feature';

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', width: 200 },
  { field: 'content', headerName: 'Content', headerClassName: 'table-header', width: 300 },
  {
    field: 'attachments', headerName: 'Attachments', headerClassName: 'table-header', width: 200, renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0 ? attachments.map((i) => {
        const url = i.url;
        const file = fileFormat(url);

        return (
          <Box>
            <a href={url} download target="_blank" rel="noreferrer" style={{
              color
                : 'black',
            }}>
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );
      }) : '-';
    },
  },
  {
    field: 'sender', headerName: 'Send By', headerClassName: 'table-header', width: 200, renderCell: (params) => (
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <Avatar src={transformImage(params.row.sender.avatar)} alt={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  { field: 'createdAt', headerName: 'Time', headerClassName: 'table-header', width: 250 },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  const { loading, data, error } = useFetchData(`${import.meta.env.VITE_SERVER}/api/admin/messages`, "dashboard-message");

  const { messages } = data || [];
  useXErrors([{ isError: error, error }]);

  useEffect(() => {
    if (data) setRows(messages.map((msg) => ({ ...msg, id: msg._id, content: msg.content, attachments: msg.attachments, sender: { name: msg.sender.name, avatar: transformImage(msg.sender.avatar, 50) }, createdAt: moment(msg.createdAt).format("MMM Do YYYY, h:mm:ss a") })));
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <ProgressiveLoader size={"3rem"} /> : <Table heading={'All Messages'} rows={rows} cols={columns} rowHeight={130} />
      }
    </AdminLayout>
  )
}

export default MessageManagement