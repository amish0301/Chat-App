import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './components/layout/Loaders';

// importing dynamically whenever we need the component
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Panel
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* if user exist then only u can access below routes */}
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>

          {/* if user is logged-in, but still it can't access the login page */}
          <Route path='/login' element={<ProtectRoute user={!user} redirect="/"><Login /></ProtectRoute>} />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users' element={<UserManagement />} />
          <Route path='/admin/chats' element={<ChatManagement />} />
          <Route path='/admin/messages' element={<MessageManagement />} />

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App