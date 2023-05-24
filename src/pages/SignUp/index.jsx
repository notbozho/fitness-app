import React, { useCallback, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { register } = usePocket()
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()
      await register(emailRef.current.value, passwordRef.current.value)
      navigate('/login')
    },
    [register]
  )

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit">Create</button>
        <Link to="/Login">Go to Login</Link>
      </form>
    </section>
  )
}
