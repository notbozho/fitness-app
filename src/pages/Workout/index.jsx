import React, { useEffect } from 'react'

import './Workout.css'

import GATTO from '../../assets/gatto.jpg'
import { usePocket } from '../../contexts/PocketContext'
import { useNavigate, useParams } from 'react-router-dom'
import { isSameDay } from '../../Util'
import { toast } from 'react-toastify'

export default function Workout() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [filteredExercises, setFilteredExercises] = React.useState([])

  const { workout } = useParams()
  const navigate = useNavigate()

  const {
    exercises,
    setExercises,
    completedWorkouts,
    workouts,
    setWorkouts,
    loadAllExercises,
    loadTemplate,
    finishTodayWorkout,
    loadCompletedWorkouts,
    API_URL
  } = usePocket()

  useEffect(() => {
    setExercises([])
    setWorkouts([])
    setFilteredExercises([])

    async function load() {
      await loadAllExercises()
      await loadTemplate(workout)
      await loadCompletedWorkouts()
    }

    load()
  }, [])

  useEffect(() => {
    if (workouts.length == 0 || exercises.length == 0) return

    const filtered = exercises
      .filter((exercise) =>
        workouts.some((workout) => workout.exercise === exercise.id)
      )
      .sort((a, b) => {
        const aWorkout = workouts.find((workout) => workout.exercise === a.id)
        const bWorkout = workouts.find((workout) => workout.exercise === b.id)

        return aWorkout.orderWeight - bWorkout.orderWeight
      })

    setFilteredExercises(filtered)
  }, [workouts])

  const handleFinishWorkout = async () => {
    const today = new Date()

    // proveri dali e pravil tazi trenirovka dnes
    if (
      !completedWorkouts.some((completedWorkout) => {
        const completedDate = new Date(completedWorkout.date)

        return (
          completedWorkout.workout === workout &&
          isSameDay(today, completedDate)
        )
      })
    ) {
      await finishTodayWorkout(workout)
      toast.success('Workout logged!')
    } else {
      toast.error('You already have done this workout today!')
    }

    await navigate('/home')
  }

  return (
    <div className="workout-page">
      <div className="top-container">
        <h1 className="title">{workout} day</h1>
        <button className="finish-workout" onClick={handleFinishWorkout}>
          Finish workout
        </button>
      </div>
      <div className="workout-container">
        <div
          className="exercises-list"
          style={
            workouts.length == 0
              ? { alignItems: 'center', justifyContent: 'center' }
              : {}
          }
        >
          {workouts.length == 0 ? (
            <h1 style={{ color: '#f05454' }}>No exercises :(</h1>
          ) : (
            ''
          )}
          {filteredExercises.map((exercise, index) => (
            <div
              className={`exercise ${index === selectedIndex && 'selected'}`}
              key={index}
              onClick={() => setSelectedIndex(index)}
            >
              <h1>{index + 1}</h1>
              <h2>{exercise.name}</h2>
              {workouts.length > 0 && (
                <p className="repetitions">
                  <span>{workouts[index].sets}x</span> {workouts[index].reps}{' '}
                  reps
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="exercise-details">
          {workouts.length == 0 ? <img src={GATTO} alt="gatto" /> : ''}
          {filteredExercises[selectedIndex] && (
            <>
              <img
                src={
                  filteredExercises[selectedIndex].preview.length > 0
                    ? `${API_URL}/files/exercises/${filteredExercises[selectedIndex].id}/${filteredExercises[selectedIndex].preview}`
                    : GATTO
                }
                alt="gatto"
              />
              <h2>{filteredExercises[selectedIndex].name}</h2>
              <h4>
                {filteredExercises[selectedIndex].category} -{' '}
                {filteredExercises[selectedIndex].bodyPart
                  .split(',')
                  .join(', ')}
              </h4>
              <p>{filteredExercises[selectedIndex].description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
