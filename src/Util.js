export const calculateBMI = (weight, height) => {
  let heightInMeters = height / 100

  return (weight / (heightInMeters * heightInMeters)).toFixed(2)
}

export const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear()
