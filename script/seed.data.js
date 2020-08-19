const course = [
  {
    courseName: 'Guitar 101',
    size: 3
  },
  {
    courseName: 'Senior Coding 404',
    size: 14
  },
  {
    courseName: 'REACTO 202',
    size: 14
  }
]

const teacher = [
  {
    firstName: 'Travis',
    lastName: 'Stratton',
    email: 'teacher1@email.com',
    password: '1234'
  },
  {
    firstName: 'Jonah',
    lastName: 'Ullman',
    email: 'teacher2@email.com',
    password: '1234'
  }
]

const student = [
  {
    firstName: 'Khuong',
    lastName: 'Le',
    email: 'student01@email.com',
    password: '4321'
  },
  {
    firstName: 'Jonathan',
    lastName: 'Arreola',
    email: 'student2@email.com',
    password: '4321'
  },
  {
    firstName: 'Dean',
    lastName: 'Gladish',
    email: 'student3@email.com',
    password: '4321'
  },
  {
    firstName: 'Zach',
    lastName: 'Bryce',
    email: 'student4@email.com',
    password: '4321'
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

const enrollment = [
  {
    classGrade: 89,
    completionStatus: false,
    courseId: 1,
    studentId: 1
  },
  {
    classGrade: 45,
    completionStatus: false,
    courseId: 2,
    studentId: 1
  },
  {
    classGrade: 75,
    completionStatus: false,
    courseId: 3,
    studentId: 1
  },
  {
    classGrade: 99,
    completionStatus: false,
    courseId: 2,
    studentId: 2
  },
  {
    classGrade: 98,
    completionStatus: true,
    courseId: 3,
    studentId: 2
  },
  {
    classGrade: 88,
    completionStatus: false,
    courseId: 2,
    studentId: 3
  },
  {
    classGrade: 91,
    completionStatus: false,
    courseId: 3,
    studentId: 3
  },
  {
    classGrade: 87,
    completionStatus: false,
    courseId: 2,
    studentId: 4
  },
  {
    classGrade: 85,
    completionStatus: true,
    courseId: 3,
    studentId: 4
  }
]

const gradebook = [
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    studentId: 1
  },
  {
    completed: true,
    individualGrade: 70,
    assignmentId: 2,
    studentId: 1
  },
  {
    completed: true,
    individualGrade: 36,
    assignmentId: 3,
    studentId: 1
  },
  {
    completed: true,
    individualGrade: 56,
    assignmentId: 4,
    studentId: 1
  },
  {
    completed: true,
    individualGrade: 99,
    assignmentId: 5,
    studentId: 1
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    studentId: 2
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    studentId: 3
  },
  {
    completed: false,
    individualGrade: null,
    assignmentId: 1,
    studentId: 4
  },
  {
    completed: true,
    individualGrade: 99,
    assignmentId: 2,
    studentId: 2
  },
  {
    completed: true,
    individualGrade: 98,
    assignmentId: 2,
    studentId: 3
  },
  {
    completed: true,
    individualGrade: 97,
    assignmentId: 2,
    studentId: 4
  },
  {
    completed: true,
    individualGrade: 89,
    assignmentId: 3,
    studentId: 2
  },
  {
    completed: true,
    individualGrade: 88,
    assignmentId: 3,
    studentId: 3
  },
  {
    completed: true,
    individualGrade: 87,
    assignmentId: 3,
    studentId: 4
  }
]

module.exports = {course, teacher, student, assignment, enrollment, gradebook}

//student hasMany assignment {through: gradebook}
//assignment hasMany student {through: gradebook}

//gradebook contains
//completed
//individualGrade
