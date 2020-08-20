const course = [
  {
    courseName: 'Guitar 101',
    size: 3,
    teacherId: 6
  },
  {
    courseName: 'Senior Coding 404',
    size: 14,
    teacherId: 5
  },
  {
    courseName: 'REACTO 202',
    size: 14,
    teacherId: 5
  }
]

const user = [
  {
    firstName: 'Khuong',
    lastName: 'Le',
    email: 'student01@email.com',
    password: '4321',
    accountType: 'student'
  },
  {
    firstName: 'Jonathan',
    lastName: 'Arreola',
    email: 'student2@email.com',
    password: '4321',
    accountType: 'student'
  },
  {
    firstName: 'Dean',
    lastName: 'Gladish',
    email: 'student3@email.com',
    password: '4321',
    accountType: 'student'
  },
  {
    firstName: 'Zach',
    lastName: 'Bryce',
    email: 'student4@email.com',
    password: '4321',
    accountType: 'student'
  },
  {
    firstName: 'Travis',
    lastName: 'Stratton',
    email: 'teacher1@email.com',
    password: '1234',
    accountType: 'teacher'
  },
  {
    firstName: 'Jonah',
    lastName: 'Ullman',
    email: 'teacher2@email.com',
    password: '1234',
    accountType: 'teacher'
  },
  {
    firstName: 'Big',
    lastName: 'Brother',
    email: 'admin@email.com',
    password: '12345',
    accountType: 'admin'
  }
]

const assignment = [
  {
    assignmentName: 'Capstone',
    assignmentType: 'project',
    dueDate: new Date('September 9, 2020 11:30:00')
  },
  {
    assignmentName: 'Senior Assessment',
    assignmentType: 'test',
    dueDate: new Date('July 20, 2020 12:00:00')
  },
  {
    assignmentName: 'RECTO',
    assignmentType: 'classwork',
    dueDate: new Date('July 19, 2020 08:30:00')
  },
  {
    assignmentName: 'Wonderwall',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00')
  },
  {
    assignmentName: 'Name that Chord',
    assignmentType: 'quiz',
    dueDate: new Date('August 21, 2020 19:15:00')
  }
]

const classroom = {
  className: 'Lecture Hall 01',
  classSize: 5
}

const enrollment = [
  {
    classGrade: 89,
    completionStatus: false,
    courseId: 1,
    userId: 1
  },
  {
    classGrade: 45,
    completionStatus: false,
    courseId: 2,
    userId: 1
  },
  {
    classGrade: 75,
    completionStatus: false,
    courseId: 3,
    userId: 1
  },
  {
    classGrade: 99,
    completionStatus: false,
    courseId: 2,
    userId: 2
  },
  {
    classGrade: 98,
    completionStatus: true,
    courseId: 3,
    userId: 2
  },
  {
    classGrade: 88,
    completionStatus: false,
    courseId: 2,
    userId: 3
  },
  {
    classGrade: 91,
    completionStatus: false,
    courseId: 3,
    userId: 3
  },
  {
    classGrade: 87,
    completionStatus: false,
    courseId: 2,
    userId: 4
  },
  {
    classGrade: 85,
    completionStatus: true,
    courseId: 3,
    userId: 4
  }
]

const gradebook = [
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    userId: 1
  },
  {
    completed: true,
    individualGrade: 70,
    assignmentId: 2,
    userId: 1
  },
  {
    completed: true,
    individualGrade: 36,
    assignmentId: 3,
    userId: 1
  },
  {
    completed: true,
    individualGrade: 56,
    assignmentId: 4,
    userId: 1
  },
  {
    completed: true,
    individualGrade: 99,
    assignmentId: 5,
    userId: 1
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    userId: 2
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    userId: 3
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    userId: 4
  },
  {
    completed: true,
    individualGrade: 99,
    assignmentId: 2,
    userId: 2
  },
  {
    completed: true,
    individualGrade: 98,
    assignmentId: 2,
    userId: 3
  },
  {
    completed: true,
    individualGrade: 97,
    assignmentId: 2,
    userId: 4
  },
  {
    completed: true,
    individualGrade: 89,
    assignmentId: 3,
    userId: 2
  },
  {
    completed: true,
    individualGrade: 88,
    assignmentId: 3,
    userId: 3
  },
  {
    completed: true,
    individualGrade: 87,
    assignmentId: 3,
    userId: 4
  }
]

module.exports = {course, user, assignment, enrollment, gradebook, classroom}

// Course.hasMany(Assignment)
// Assignment.belongsTo(Course)

// Course.belongsToMany(User, {through: Enrollment})
// User.belongsToMany(Course, {through: Enrollment})

// Assignment.belongsToMany(User, {through: Gradebook})
// User.belongsToMany(Assignment, {through: Gradebook})
