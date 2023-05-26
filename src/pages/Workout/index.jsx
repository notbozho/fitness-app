import React, { useEffect } from 'react'

import './Workout.css'

import GATTO from '../../assets/gatto.jpg'
import { usePocket } from '../../contexts/PocketContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isSameDay } from '../../Util'

export default function Workout() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [filteredExercises, setFilteredExercises] = React.useState([])

  const { workout } = useParams()
  const navigate = useNavigate()
  //@todo order weight ne se prai pravilno
  const {
    exercises,
    completedWorkouts,
    workouts,
    loadAllExercises,
    loadTemplate,
    finishTodayWorkout,
    API_URL
  } = usePocket()

  useEffect(() => {
    async function load() {
      await loadAllExercises()
      await loadTemplate(workout)
    }

    load()
  }, [])

  useEffect(() => {
    if (workouts.length == 0 || exercises.length == 0) return

    const filtered = exercises.filter((exercise) => {
      return workouts.some((workout) => {
        return workout.exercise === exercise.id
      })
    })

    setFilteredExercises(filtered)

    console.log(filtered)
  }, [workouts])

  const handleFinishWorkout = async () => {
    const today = new Date()
    if (!completedWorkouts.some((work) => isSameDay(work.date, today))) {
      finishTodayWorkout(workout)
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
              <p className="repetitions">
                <span>{workouts[index].sets}x</span> {workouts[index].reps} reps
              </p>
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
