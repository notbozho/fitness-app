import { useEffect, useState } from 'react'
import { usePocket } from '../../contexts/PocketContext'

import DEFAULT_MALE from '../../assets/default_avatar_man.jpg'

import PEN from '../../assets/pen.png'

import { toast } from 'react-toastify'

import './Profile.css'
import { calculateBMI } from '../../Util'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { logout, user, loadCompletedWorkouts, API_URL, reloadUserData } =
    usePocket()

  const navigate = useNavigate()

  const [avatar, setAvatar] = useState(DEFAULT_MALE)

  const getProfilePicture = () => {
    return user.avatar
      ? `${API_URL}/files/users/${user?.id}/${user?.avatar}`
      : DEFAULT_MALE
  }

  useEffect(() => {
    const a = getProfilePicture()
    setAvatar(a)
  }, [user])

  useEffect(() => {
    loadCompletedWorkouts()
    reloadUserData()
  }, [])

  return (
    <div className="profile-page">
      <h1 className="title">Your Profile</h1>
      <div className="profile-container">
        <div className="general-container">
          <img src={avatar} alt="avatar" />
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
        <div className="metrics">
          <div className="metric">
            <h3>Height</h3>
            <p>{user.height || 0} cm</p>
          </div>
          <div className="metric">
            <h3>Weight</h3>
            <p>{user.weight || 0} kg</p>
          </div>
          <div className="metric">
            <h3>BMI</h3>
            <p>{calculateBMI(user.weight, user.height) || 0}</p>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              logout()
              toast.success('Successfully logged out')
            }}
          >
            Logout
          </button>
          <div className="pen" onClick={() => navigate('/editprofile')}>
            <img src={PEN} alt="pen" />
          </div>
        </div>
      </div>
    </div>
  )
}
