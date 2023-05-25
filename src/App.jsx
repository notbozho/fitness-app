import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth'

import { PocketProvider } from './contexts/PocketContext'
import ExercisesList from './pages/ExercisesList'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <PocketProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ex" element={<ExercisesList />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PocketProvider>
  )
}
