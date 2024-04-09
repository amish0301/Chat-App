import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './components/layout/Loaders';
import { serverURI } from './utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import './App.css';

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

const App = () => {
  const { user, loader } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // check for refactoring below useEffect
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get(`${serverURI}/api/user/me`, { withCredentials: true });
        if (response.status === 200) {
          dispatch(userExists(response.data.user));
        } else {
        dispatch(userNotExists());
        }
      } catch (error) {
        if(error.response && error.response.status === 401) {
          dispatch(userNotExists());
        }
      }
    }

    checkUser();
  }, [user]);


  return loader ? <LayoutLoader /> : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* if user exist then only u can access below routes */}
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>

          {/* if user is alredy logged-in, if he tries to access login he can't */}
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
      <Toaster position='top-right' />
    </BrowserRouter>
  )
}

export default App