const course = [
  {
    courseName: 'Econ 201',
    size: 30,
    teacherId: 7,
    courseIntro:
      'Introduction to the Course newline 1. Keynesian Theory newline 2. The Solow Growth Model',
    courseMoreInformation:
      "The Solow Growth Model newline What you can expect from me: I'll always be on time, prepared and available for office hours, and I will be fair. newline What I expect from you: When assigned to a group project, work cooperatively. newline Grading will be done on the following scale: newline Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. newline Assignment description: This is just a short intro to the Solow model of economic growth and how it relates to our modern conception of money as a form of fiat currency as well as the departure from traditional neoclassical economics."
  },
  {
    courseName: 'Guitar 101',
    size: 3,
    teacherId: 6,
    courseIntro:
      'Introduction to the Course newline 1. Welcome to guitar newline 2. The Basics of Guitar',
    courseMoreInformation:
      "The Art of Playing the Guitar newline What you can expect from me: I'll always be playing beautiful songs all the time, no problem. newline What I expect from you: I expect you to be inherently musically talented in order to attend the course. newline Grading will be done on the following scale: newline Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. newline Assignment description: This is just a short intro to how to play the guitar, from quality instructors and the most understanding curriculum, based not on an arbitrary ruleset but on the shoulders of musical giants."
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
    classGrade: 100,
    completionStatus: true,
    courseId: 4,
    userId: 5
  },
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
