export const calculateBMI = (weight, height) => {
  let heightInMeters = height / 100

  const value = (weight / (heightInMeters * heightInMeters)).toFixed(0)

  return value != 'NaN' ? value : 0
}

export const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear()

export const readbleDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
