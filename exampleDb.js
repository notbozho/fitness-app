const db = {
  user: {
    id: 123,
    email: 'asd@gmail.com',
    favouriteExcercises: [444]
  },
  bodyMeasurements: {
    bmi: 24.0,
    bodyFat: 15.0,
    weight: 70.0,
    date: '2018-01-01',
    user: 123 // relation to user 123
  },
  excersises: {
    id: 444,
    name: 'Bench Press',
    category: 'Barbell',
    bodyPart: 'Chest'
  }
}
