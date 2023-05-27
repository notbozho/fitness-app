import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import DEFAULT_MALE from '../../assets/default_avatar_man.jpg'

import { usePocket } from '../../contexts/PocketContext'
import './NavBar.css'

export default function NavBar() {
  const { user, API_URL } = usePocket()

  const [avatar, setAvatar] = useState(DEFAULT_MALE)

  const getProfilePicture = () => {
    return user.avatar
      ? `${API_URL}/files/users/${user?.id}/${user?.avatar}`
      : DEFAULT_MALE
  }

  useEffect(() => {
    if (!user) return

    const a = getProfilePicture()
    setAvatar(a)
  }, [user])

  return (
    <nav className="navbar">
      <a href="/home">
        <div className="navbar-left">
          <span className="logo">Fitness App</span>
        </div>
      </a>
      <a href="/profile">
        <div className="navbar-right">
          {!user ? (
            <>
              <a className="login" href="/login">
                Login
              </a>
              <a className="register" href="/">
                Register
              </a>
            </>
          ) : (
            <>
              <span className="username">{user.username}</span>
              <img src={avatar} alt="User Avatar" className="avatar" />
            </>
          )}
        </div>
      </a>
    </nav>
  )
}
