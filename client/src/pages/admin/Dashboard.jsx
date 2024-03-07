import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon, Search, } from '@mui/icons-material';
import moment from 'moment';
import { CurveButton, SearchField } from '../../components/styles/StyledComponents';
import { DoughnutChart, LineChart } from '../../components/Charts';


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
    <Widget title={"Users"} value={30} Icon={<PersonIcon />} />
    <Widget title={"Groups"} value={15} Icon={<GroupIcon />} />
    <Widget title={"Messages"} value={400} Icon={<MessageIcon />} />
  </Stack>;


  return (
    <AdminLayout>
      <Container component={'main'}>
        {Appbar}

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: '1rem', sm: '2rem' }} alignItems={{ xs: 'center', lg: 'stretch' }} flexWrap={'wrap'} justifyContent={{ xs: 'center', lg: 'space-between' }}>
          <Paper elevation={3} sx={{ padding: '2rem 3.5rem', borderRadius: '1rem', width: '100%', maxWidth: '40rem' }}>
            <Typography variant='h5' sx={{ marginBottom: '1.5rem' }}>Last Messages</Typography>
            {<LineChart value={[23, 56, 34, 21, 89, 1]} />}
          </Paper>

          <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', sm: '50%' }, maxWidth: '25rem' }}>
            {<DoughnutChart labels={['Total Chats', 'Group Chats']} value={[20, 50]} />}

            <Stack position={'absolute'} direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={'0.5rem'} width={'100%'} height={'100%'}>
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