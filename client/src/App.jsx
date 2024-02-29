import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectRoute from './components/auth/ProtectRoute';

// importing dynamically whenever we need the component
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound'));

let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* if user exist then only u can access below routes */}
        <Route element={<ProtectRoute user={user} />}>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/groups' element={<Groups />} />
        </Route>

        <Route path='/login' element={<ProtectRoute user={!user} redirect="/"><Login /></ProtectRoute>} />

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App