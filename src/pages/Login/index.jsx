import React, { useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'

import './login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = usePocket()
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()
      await login(emailRef.current.value, passwordRef.current.value).catch(
        (err) => {
          console.log(err)
          setError(err.message)
        }
      )
      navigate('/profile')
    },
    [login, navigate, error]
  )

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
          {error != null && <p style={{ backgroundColor: 'red' }}>{error}</p>}
          <input placeholder="Email" type="email" ref={emailRef} />
          <input placeholder="Password" type="password" ref={passwordRef} />
          <button type="submit">Login</button>
          <Link to="/">Go to Sign Up</Link>
        </form>
      </div>
    </div>
  )
}
