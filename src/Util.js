export const calculateBMI = (weight, height) => {
  let heightInMeters = height / 100

  return (weight / (heightInMeters * heightInMeters)).toFixed(2)
}
