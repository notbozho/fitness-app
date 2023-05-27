import { useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { usePocket } from '../../contexts/PocketContext'
import { toast } from 'react-toastify'

import './Login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = usePocket()
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault()
      try {
        await login(emailRef.current.value, passwordRef.current.value)
        toast.success('Successfully logged in')
        navigate('/profile')
      } catch (err) {
        toast.error(err.message)
      }
    },
    [login, navigate]
  )

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
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
