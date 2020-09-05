'use strict'

const db = require('../server/db')
const {
  User,
  Course,
  Assignment,
  Enrollment,
  Gradebook
} = require('../server/db/models')

const {course, user, assignment, enrollment, gradebook} = require('./seed.data')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [Guitar, CS, Reacto] = await Promise.all(
    course.map(curr => Course.create(curr))
  )

  const [project, test, classwork, homework, quiz] = await Promise.all(
    assignment.map(curr => Assignment.create(curr))
  )
  await Promise.all(user.map(curr => User.create(curr)))

  await Promise.all(enrollment.map(curr => Enrollment.create(curr)))
  await Promise.all(gradebook.map(curr => Gradebook.create(curr)))

  //adding instructors without hard-coded IDs
  const travis = await User.findOne({
    where: {
      email: 'teacher1@email.com'
    }
  })

  const jonah = await User.findOne({
    where: {
      email: 'teacher2@email.com'
    }
  })

  const courseEcon201 = await Course.findByPk(1)
  const courseSenCod404 = await Course.findByPk(3)
  const courseReacto202 = await Course.findByPk(4)

  // const c5 = await Course.findByPk(5)
  // await c5.update({teacherId: travis.id})
  const c6 = await Course.findByPk(6)
  await c6.update({teacherId: travis.id})
  const c7 = await Course.findByPk(7)
  await c7.update({teacherId: travis.id})
  const c8 = await Course.findByPk(8)
  await c8.update({teacherId: travis.id})
  // const c9 = await Course.findByPk(9)
  // await c9.update({teacherId: travis.id})
  const c10 = await Course.findByPk(10)
  await c10.update({teacherId: travis.id})
  const c11 = await Course.findByPk(11)
  await c11.update({teacherId: travis.id})
  const c12 = await Course.findByPk(12)
  await c12.update({teacherId: travis.id})
  const c13 = await Course.findByPk(13)
  await c13.update({teacherId: travis.id})
  const c14 = await Course.findByPk(14)
  await c14.update({teacherId: travis.id})

  const c15 = await Course.findByPk(15)
  await c15.update({teacherId: jonah.id})
  const c16 = await Course.findByPk(16)
  await c16.update({teacherId: jonah.id})
  const c17 = await Course.findByPk(17)
  await c17.update({teacherId: jonah.id})
  const c18 = await Course.findByPk(18)
  await c18.update({teacherId: jonah.id})
  const c19 = await Course.findByPk(19)
  await c19.update({teacherId: jonah.id})
  const c20 = await Course.findByPk(20)
  await c20.update({teacherId: jonah.id})
  const c21 = await Course.findByPk(21)
  await c21.update({teacherId: jonah.id})

  await courseEcon201.update({teacherId: travis.id})
  await courseSenCod404.update({teacherId: travis.id})
  await courseReacto202.update({teacherId: travis.id})

  const courseGuitar101 = await Course.findByPk(2)
  await courseGuitar101.update({teacherId: jonah.id})

  // await Reacto.addAssignment(classwork)
  // await CS.addAssignment(project)
  // await CS.addAssignment(test)
  // await Guitar.addAssignment(homework)
  // await Guitar.addAssignment(quiz)

  // Commented out for now; it was interfering with the courseIds (courseIds from seed.data.js getting overwritten in the sense that all homework and all quizzes were given courseId === 2 instead of 1 (Guitar is the second course)).  I don't fully know why.

  // Basically, lines 30 through 34 were changing the original courseIds for each assignment.

  //console.log(`seeded ${student.length} students`)
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
