import React, { useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'
import { toast } from 'react-toastify'

import './Login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = usePocket()
  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()
      await login(emailRef.current.value, passwordRef.current.value).catch(
        (err) => {
          setError(true)
          toast.error(err)
        }
      )

      if (!error) {
        toast.success('Successfully logged in')
        navigate('/profile')
      }
    },
    [login, navigate, error]
  )

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
          {error != null && <p style={{ backgroundColor: 'red' }}>{error}</p>}
          <input placeholder="Email" type="email" ref={emailRef} />
          <input placeholder="Password" type="password" ref={passwordRef} />
          <button type="submit">Login</button>
          <div className="link">
            <Link to="/">Go to Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
