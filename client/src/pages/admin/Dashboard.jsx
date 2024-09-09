import { useFetchData } from '6pp';
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon, Search, } from '@mui/icons-material';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { DoughnutChart, LineChart } from '../../components/Charts';
import AdminLayout from '../../components/layout/AdminLayout';
import { LayoutLoader } from '../../components/layout/Loaders';
import { CurveButton, SearchField } from '../../components/styles/StyledComponents';
import { useXErrors } from '../../hooks/hook';



const Widget = ({ title, value, Icon }) => {
  return (
    <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '1.5rem', margin: '2rem 0', width: '20rem' }}>
      <Stack alignItems={'center'} spacing={'1rem'}>
        <Typography sx={{ color: 'rgba(0,0,0,0.7)', borderRadius: '50%', border: '5px solid rgba(0,0,0,0.9)', width: '5rem', height: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {value}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

const Dashboard = () => {

  const { loading, data, error } = useFetchData(`${import.meta.env.VITE_SERVER}/api/admin/stats`, "dashboard-stats");
  const { stats } = data || {};

  useXErrors([{ isError: error, error }]);

  const Appbar = <>
    <Paper elevation={3} sx={{ padding: '1rem', margin: '2rem 0', borderRadius: '1rem', minWidth: '50vw' }}>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>

        <AdminPanelSettingsIcon sx={{ fontSize: '2rem' }} />
        <SearchField placeholder='Search' />
        <CurveButton>{<Search />}</CurveButton>

        <Box flexGrow={1} />
        <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
          {moment().format("dddd, Do MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  </>;

  const Widgets = <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: '1rem', sm: '2rem' }} alignItems={'center'} justifyContent={'space-between'} margin={'2rem 0'}>
    <Widget title={"Users"} value={stats?.userCount} Icon={<PersonIcon />} />
    <Widget title={"Groups"} value={stats?.groupsCount} Icon={<GroupIcon />} />
    <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon />} />
  </Stack>;

  return (
    loading ? <LayoutLoader /> : <AdminLayout>
      <Container component={'main'}>
        {Appbar}

        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: '2rem' }} alignItems={{ xs: 'center', lg: 'stretch' }} flexWrap={'wrap'} justifyContent={{ xs: 'center', lg: 'space-between' }}>
          <Paper elevation={3} sx={{ padding: '2rem 3.5rem', borderRadius: '1rem', width: '100%', maxWidth: '40rem', bgcolor: 'rgba(0,0,0,0.03)' }}>
            <Typography variant='h5' sx={{ marginBottom: '1.5rem' }}>Last Messages</Typography>
            {<LineChart value={stats?.messagesChart || []} />}
          </Paper>

          <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '25rem', bgcolor: 'rgba(0,0,0,0.03)' }}>
            {<DoughnutChart labels={['Total Chats', 'Group Chats']} value={[stats?.totalChatCount - stats?.groupsCount || 0, stats?.groupsCount || 0]} />}

            <Stack position={'absolute'} direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={'0.5rem'} height={'100%'}>
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  )
}

export default Dashboard