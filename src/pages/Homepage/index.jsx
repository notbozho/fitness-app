import { usePocket } from '../../contexts/PocketContext'
import './Homepage.css'

import GATTO from '../../assets/gatto.jpg'

const dates = [new Date(2023, 5, 24), new Date(2023, 5, 25)]

export default function Homepage() {
  const { user } = usePocket()

  return (
    <div className="homepage-page">
      <h1 className="title">
        Welcome back, <span>{user.username}</span>!
      </h1>
      <div className="homepage-container">
        <h1>Select a workout:</h1>
        <div className="workouts">
          <div className="workout">
            <img src={GATTO} alt="gatto" />
            <h3>Push</h3>
          </div>
          <div className="workout">
            <img src={GATTO} alt="gatto" />
            <h3>Push</h3>
          </div>
          <div className="workout">
            <img src={GATTO} alt="gatto" />
            <h3>Push</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
