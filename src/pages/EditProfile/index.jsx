import React, { useEffect, useRef, useState } from 'react'
import { usePocket } from '../../contexts/PocketContext'

import DEFAULT_MALE from '../../assets/default_avatar_man.jpg'

import PEN from '../../assets/pen.png'

import { toast } from 'react-toastify'

import './EditProfile.css'
import { calculateBMI } from '../../Util'
import { useNavigate } from 'react-router-dom'

export default function EditProfile() {
  const weightRef = useRef()
  const heightRef = useRef()

  const {
    logout,
    user,
    loadCompletedWorkouts,
    API_URL,
    reloadUserData,
    completedWorkouts
  } = usePocket()

  const navigate = useNavigate()

  const [avatar, setAvatar] = useState(DEFAULT_MALE)
  const [bmi, setBmi] = useState(0)

  const getProfilePicture = () => {
    return user.avatar
      ? `${API_URL}/files/users/${user?.id}/${user?.avatar}`
      : DEFAULT_MALE
  }

  // @todo FIX state for bmi
  // @todo update user in db

  useEffect(() => {
    const a = getProfilePicture()
    setAvatar(a)
  }, [user])

  useEffect(() => {
    loadCompletedWorkouts()
    reloadUserData()
  }, [])

  useEffect(() => {
    setBmi(calculateBMI(weightRef.current?.value, heightRef.current?.value))
    console.log(bmi)
  }, [weightRef, heightRef])

  return (
    <div className="editprofile-page">
      <h1 className="title">Edit Profile</h1>
      <div className="profile-container">
        <div className="general-container">
          <div className="pen" onClick={() => navigate('/editprofile')}>
            <img src={avatar} alt="avatar" className="avatar" />
            <img src={PEN} alt="pen" className="icon" />
          </div>
          <h3 className="inputTitle">Username</h3>
          <input type="text" placeholder={user.username} />
          <h3 className="inputTitle">Email</h3>
          <input type="text" placeholder={user.email} />
        </div>
        <div className="metrics">
          <div className="metric">
            <h3>Height</h3>
            <input
              type="number"
              placeholder={user.height || 0}
              ref={heightRef}
            />{' '}
            <p>cm</p>
          </div>
          <div className="metric">
            <h3>Weight</h3>
            <input
              type="number"
              placeholder={user.weight || 0}
              ref={weightRef}
            />{' '}
            <p>kg</p>
          </div>
          <div className="metric">
            <h3>BMI</h3>
            <p>{bmi}</p>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              logout()
              toast.success('Changes saved')
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
