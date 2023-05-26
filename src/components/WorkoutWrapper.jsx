import { useParams } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound'
import Workout from '../pages/Workout'

const VALID_WORKOUTS = ['push', 'pull', 'legs', 'homeabs']

export default function WorkoutWrapper() {
  const { workout } = useParams()

  return (
    <>
      {VALID_WORKOUTS.includes(workout.toLowerCase()) ? (
        <Workout />
      ) : (
        <PageNotFound />
      )}
    </>
  )
}
