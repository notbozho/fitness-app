import React from 'react'

import EMPTY_PLACEHOLDER from '../../../assets/empty_placeholder.png'

export default function ExerciseCard({ exercise }) {
  const { name, category, bodyPart, preview } = exercise

  return (
    <div className="exercise-card">
      <img src={EMPTY_PLACEHOLDER} alt="preview" />
      <h2>{name}</h2>
      <p>{bodyPart}</p>
      <p>{category}</p>
    </div>
  )
}
