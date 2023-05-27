import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'

import { toast } from 'react-toastify'

import './SignUp.css'

export default function SignUp() {
  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { register, user } = usePocket()
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        toast.error('Passwords do not match')
        return
      }

      if (usernameRef.current.value === '') {
        toast.error('Username cannot be empty')
        return
      }

      if (passwordRef.current.value.length < 8) {
        toast.error('Password must be at least 8 characters long')
        return
      }

      try {
        await register(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value
        )
        toast.success('Successfully registered')
        navigate('/login')
      } catch (err) {
        toast.error(err.message)
      }
    },
    [register] // Only include the dependencies that are necessary
  )

  useEffect(() => {
    if (!user) return

    navigate('/home')
  }, [])

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Register</h1>
        <form onSubmit={handleOnSubmit}>
          <input placeholder="Email" type="email" ref={emailRef} />

          <input placeholder="Username" type="text" ref={usernameRef} />
          <input placeholder="Password" type="password" ref={passwordRef} />
          <input
            placeholder="Confirm Password"
            type="password"
            ref={confirmPasswordRef}
          />
          <button type="submit">Register</button>
          <div className="link">
            <Link to="/Login">Go to Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
