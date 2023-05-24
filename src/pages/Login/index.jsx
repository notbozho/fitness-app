import React, { useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = usePocket()
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/profile')
    },
    [login]
  )

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit">Login</button>
        <Link to="/">Go to Sign Up</Link>
      </form>
    </section>
  )
}
