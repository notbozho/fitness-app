import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { RequireAuth } from './components/RequireAuth'
import WorkoutWrapper from './components/WorkoutWrapper'

import { PocketProvider } from './contexts/PocketContext'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import EditProfile from './pages/EditProfile'

import '@fontsource/inter'

export default function App() {
  return (
    <PocketProvider>
      <NavBar />
      <ToastContainer
        autoClose={4000}
        theme={'colored'}
        pauseOnFocusLoss={false}
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/workout/:workout" element={<WorkoutWrapper />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PocketProvider>
  )
}
