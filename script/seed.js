'use strict'

const db = require('../server/db')
const {
  Student,
  Teacher,
  Course,
  Assignment,
  Enrollment,
  Gradebook
} = require('../server/db/models')

const {
  course,
  teacher,
  student,
  assignment,
  enrollment,
  gradebook
} = require('./seed.data')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [Guitar, CS, Reacto] = await Promise.all(
    course.map(curr => Course.create(curr))
  )
  const [Travis, Jonah] = await Promise.all(
    teacher.map(curr => Teacher.create(curr))
  )
  const [project, test, classwork, homework, quiz] = await Promise.all(
    assignment.map(curr => Assignment.create(curr))
  )
  await Promise.all(student.map(curr => Student.create(curr)))

  await Promise.all(enrollment.map(curr => Enrollment.create(curr)))
  await Promise.all(gradebook.map(curr => Gradebook.create(curr)))

  await Travis.addCourse(CS)
  await Jonah.addCourse(Reacto)
  await Jonah.addCourse(Guitar)

  await Reacto.addAssignment(classwork)
  await CS.addAssignment(project)
  await CS.addAssignment(test)
  await Guitar.addAssignment(homework)
  await Guitar.addAssignment(quiz)

  console.log(`seeded ${student.length} students`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
