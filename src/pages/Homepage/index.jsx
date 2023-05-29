import { usePocket } from '../../contexts/PocketContext'
import './Homepage.css'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { isSameDay, readbleDate } from '../../Util'
import { useEffect, useState } from 'react'

import PUSH from '../../assets/push.jpeg'
import PULL from '../../assets/pull.jpg'
import LEGS from '../../assets/legs.jpg'
import ABS from '../../assets/abs.jpg'
import { useNavigate } from 'react-router-dom'

const MAX_PAST_WORKOUTS = 7

export default function Homepage() {
  const {
    user,
    completedWorkouts,
    loadCompletedWorkouts,
    setExercises,
    setWorkouts
  } = usePocket()

  const [dates, setDates] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setExercises([])
    setWorkouts([])

    loadCompletedWorkouts()
  }, [])

  useEffect(() => {
    const d = completedWorkouts.map((workout) => new Date(workout.date))
    setDates(d)
  }, [completedWorkouts])

  const tileContent = ({ date }) => {
    if (dates.some((markedDate) => isSameDay(date, markedDate))) {
      return (
        <span className="check-icon" key={date}>
          &#10004;
        </span>
      )
    }
    return null
  }

  return (
    <div className="homepage-page">
      <h1 className="title">
        Welcome back, <span>{user.username}</span>!
      </h1>
      <div className="homepage-container">
        <div className="select-workout-container">
          <h1>Start a workout:</h1>
          <div className="workouts">
            <div className="workout" onClick={() => navigate('/workout/push')}>
              <h3>Push</h3>
              <img src={PUSH} alt="gatto" />
            </div>
            <div className="workout" onClick={() => navigate('/workout/pull')}>
              <img src={PULL} alt="gatto" />
              <h3>Pull</h3>
            </div>
            <div className="workout" onClick={() => navigate('/workout/legs')}>
              <img src={LEGS} alt="gatto" />
              <h3>Legs</h3>
            </div>
            <div
              className="workout"
              onClick={() => navigate('/workout/homeabs')}
            >
              <img src={ABS} alt="gatto" />
              <h3>Home abs</h3>
            </div>
          </div>
        </div>
        <div className="past-workouts-container">
          <h1>Past workouts:</h1>
          <Calendar
            className={'calendar'}
            tileContent={tileContent}
            tileClassName="calendar-day"
            showNeighboringMonth={false}
            showNavigation={false}
            selectRange={false}
          />
          <div className="logs-container">
            <h3 className="total">Total: {completedWorkouts.length}</h3>
            {completedWorkouts.map(
              ({ workout, date }, index) =>
                index < MAX_PAST_WORKOUTS && (
                  <>
                    <div className="log" key={date}>
                      <span>{workout.normalize()} </span>
                      <p>
                        {new Date(date).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    {index < MAX_PAST_WORKOUTS - 1 &&
                      index < completedWorkouts.length - 1 && <hr />}
                  </>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
