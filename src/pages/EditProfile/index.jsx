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
  const avatarInputRef = useRef()

  const { user, API_URL, reloadUserData, updateUser } = usePocket()

  const navigate = useNavigate()

  const [avatar, setAvatar] = useState(DEFAULT_MALE)
  const [avatarUpdated, setAvatarUpdated] = useState(false)

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
      if (avatarUpdated) toast.success('Changes saved')
      else toast.info('No changes made')

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

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0]

    if (!file || !isFileTypeValid(file)) {
      toast.error('Invalid file type')
      return
    }

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      await updateUser(formData)
      toast.success('Avatar updated')
      setAvatarUpdated(true)
    } catch (err) {
      toast.error(err.message)
    }

    await reloadUserData()
  }

  const isFileTypeValid = (file) => {
    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']
    return acceptedFileTypes.includes(file.type)
  }

  useEffect(() => {
    const a = getProfilePicture()
    setAvatar(a)
  }, [user])

  useEffect(() => {
    reloadUserData()
  }, [])

  return (
    <div className="editprofile-page">
      <h1 className="title">Edit Profile</h1>
      <div className="profile-container">
        <div className="general-container">
          <div className="pen" onClick={() => avatarInputRef.current.click()}>
            <img src={avatar} alt="avatar" className="avatar" />
            <img src={PEN} alt="pen" className="icon" />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
              ref={avatarInputRef}
            />
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
