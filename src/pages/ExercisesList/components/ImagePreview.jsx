import React, { useState, useEffect } from 'react'

import EMPTY_PLACEHOLDER from '../../../assets/empty_placeholder.png'
import { usePocket } from '../../../contexts/PocketContext'

export default function ImagePreview(props) {
  const [imageUrl, setImageUrl] = useState(EMPTY_PLACEHOLDER)

  const { pb, exercises, getImageUrl } = usePocket()

  useEffect(() => {
    const { imageName } = props

    const getExercise = (imageName) => {
      // get the exercise object that has the image name in the preview array

      if (exercises.length === 0) {
        return null
      }

      console.log(exercises)

      const exercise = exercises.find((exercise) =>
        exercise.preview.includes(imageName)
      )

      console.log(exercise + ' ' + imageName)
      return exercise
    }

    if (imageName.length > 0) {
      const record = getExercise(imageName)
      console.log(record)
      if (record != null) {
        const imgUrl = `http://127.0.0.1:8090/api/files/${record.collectionId}/${record.id}/${imageName}`

        setImageUrl(imgUrl)
      }
    }
  }, [exercises])

  return <img src={imageUrl} alt="preview" width={150} />
}
