import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import HomePage from './pages/homePage'
import SignUpPage from './pages/signUpPage'
import LogInPage from './pages/logInPage'
import SettingPage from './pages/settingPage'
import ProfilePage from './pages/profilePage'
import { userAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth ,onlineUsers} = userAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div>
      <Navbar />
      <Toaster />

      <Routes >
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LogInPage /> : <Navigate to='/' />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
