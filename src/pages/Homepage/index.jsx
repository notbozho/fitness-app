import { usePocket } from '../../contexts/PocketContext'
import './Homepage.css'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { isSameDay } from '../../Util'

const dates = [new Date(2023, 4, 24), new Date(2023, 4, 25)]

const tileContent = ({ date }) => {
  if (dates.some((markedDate) => isSameDay(date, markedDate))) {
    return <span className="check-icon">&#10004;</span>
  }
  return null
}

export default function Homepage() {
  const { user, completedWorkouts } = usePocket()

  // @todo naprai go tuka da loadva dates ot completed workouts
  const completedDates = completedWorkouts.map((workout) => workout.date)

  return (
    <div className="homepage-page">
      <h1 className="title">
        Welcome back, <span>{user.username}</span>!
      </h1>
      <div className="homepage-container">
        {/* <h1>Select a workout:</h1>
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
        </div> */}
        <Calendar
          tileContent={tileContent}
          tileClassName="calendar-day"
          showNeighboringMonth={false}
          showNavigation={false}
          selectRange={false}
        />
      </div>
    </div>
  )
}
