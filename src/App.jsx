import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth'
import WorkoutWrapper from './components/WorkoutWrapper'

import { PocketProvider } from './contexts/PocketContext'
import ExercisesList from './pages/ExercisesList'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Workout from './pages/Workout'

export default function App() {
  return (
    <PocketProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* @todo tuka trqq da iska login */}
          <Route path="/ex" element={<ExercisesList />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/workout/:workout" element={<WorkoutWrapper />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PocketProvider>
  )
}
