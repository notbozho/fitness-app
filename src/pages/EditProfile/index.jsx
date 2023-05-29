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
  const usernameRef = useRef()
  const emailRef = useRef()

  const { logout, user, API_URL, reloadUserData, updateUser } = usePocket()

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

  const handleSave = async () => {
    const data = {}
    // mnogo if-ove, tui kato data ne trqbva da ima undefined property-ta.
    if (heightRef.current?.value) {
      data.height = heightRef.current.value
    }

    if (weightRef.current?.value) {
      data.weight = weightRef.current.value
    }

    if (usernameRef.current?.value) {
      data.username = usernameRef.current.value
    }

    if (emailRef.current?.value) {
      data.email = emailRef.current.value
    }

    if (Object.keys(data).length === 0) {
      toast.info('No changes made')
      navigate('/profile')
      return
    }

    try {
      await updateUser(data)
      toast.success('Changes saved')
      navigate('/profile')
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    const a = getProfilePicture()
    setAvatar(a)
  }, [user])

  useEffect(() => {
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
          <input type="text" placeholder={user.username} ref={usernameRef} />
          <h3 className="inputTitle">Email</h3>
          <input type="text" placeholder={user.email} ref={emailRef} />
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
        </div>
        <div className="buttons">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
