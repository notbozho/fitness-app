import React, { useEffect, useState } from 'react'
import { usePocket } from '../../contexts/PocketContext'

import './profile.css'

const getProfilePicture = (user) => {
  return (
    user?.profilePicture ||
    (user.gender == 'male'
      ? 'default_avatar_man.jpg'
      : 'default_avatar_woman.jpg')
  )
}

export default function Profile() {
  const { logout, user, getAvatar } = usePocket()

  const [avatar, setAvatar] = useState('')

  const handleLogout = () => {
    logout()
    setAvatar('')
  }

  useEffect(() => {
    async function getPicture() {
      const avatarUrl = await getAvatar().catch((err) =>
        console.log('err:' + err)
      )
      setAvatar(avatarUrl)
    }

    getPicture()
  }, [user])

  return (
    <div className="profilePage">
      <div className="profileContainer">
        {avatar && <img src={avatar} alt="avatar" width={150} />}
        <h1>{`${user.username}'s profile`}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
