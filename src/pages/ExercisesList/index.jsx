import React, { useState, useEffect, useMemo } from 'react'
import { usePocket } from '../../contexts/PocketContext'
import ExerciseCard from './components/ExerciseCard'
import ImagePreview from './components/ImagePreview'

import './exercisesList.css'

export default function ExercisesList() {
  const { loadAllExercises, exercises } = usePocket()

  useEffect(() => {
    async function load() {
      await loadAllExercises()
    }

    load()
  }, [])

  return (
    <div className="exercises-page">
      <div className="exercise-container">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  )
}
