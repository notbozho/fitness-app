import React from 'react'
import { usePocket } from '../../contexts/PocketContext'

export default function Profile() {
  const { logout, user } = usePocket()

  return (
    // @todo edit profile
    // - change username
    // - change profile picture
    <section>
      <h2>Profile</h2>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <button onClick={logout}>Logout</button>
    </section>
  )
}
