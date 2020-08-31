const course = [
  // when creating the courses, we also want to specify the ID.
  {
    courseName: 'Econ 201',
    size: 30,
    teacherId: 7,
    courseIntro:
      'Introduction to the Course \n 1. Keynesian Theory \n 2. The Solow Growth Model',
    courseMoreInformation:
      "The Solow Growth Model \n What you can expect from me: I'll always be on time, prepared and available for office hours, and I will be fair. \n What I expect from you: When assigned to a group project, work cooperatively. \n Grading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: This is just a short intro to the Solow model of economic growth and how it relates to our modern conception of money as a form of fiat currency as well as the departure from traditional neoclassical economics.",
    courseSchedule:
      'Schedule: \n M, W, F \n 10am-11am \n T, Th \n 1:30pm-3:00pm',
    id: 1
  },
  {
    courseName: 'Guitar 101',
    size: 3,
    teacherId: 8,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to guitar \n 2. The Basics of Guitar',
    courseMoreInformation:
      "The Art of Playing the Guitar \n What you can expect from me: I'll always be playing beautiful songs all the time, no problem. \n What I expect from you: I expect you to be inherently musically talented in order to attend the course. \n Grading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: This is just a short intro to how to play the guitar, from quality instructors and the most understanding curriculum, based not on an arbitrary ruleset but on the shoulders of musical giants.",
    courseSchedule:
      'Schedule: \n M, W, F \n 11am-12am \n T, Th \n 2:30pm-3:30pm',
    id: 2
  },
  {
    courseName: 'Senior Coding 404',
    size: 14,
    teacherId: 7,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to Coding 404 \n 2. Foundations \n 3. Junior Phase \n 4. Senior Phase',
    courseMoreInformation:
      "Welcome to the third Fullstack Academy \n What you can expect from me: I'm going to be available, a lot of instructors are going to be on here so that we can help students. \n What I expect from you: I don't expect you to know how to code, instead this is about being culturally ingrained in the fundamentals of coding culture.  I want you to know this so that you're not surprised.  Also, I want to talk about grading.  \nGrading will be done on the following scale: \n Rubric: (A) Attends class regularly and contributes, (B), attends class and sometimes analyzes relevant issues, (C) attends class regularly but almost never contributes, (D/R) attends class regularly but never contributes. \n Assignment description: From knowledgeable instructors we have a collection of projects which you can choose from yourself, including projects like this one.  When the live lecture starts you'll be able to get started, for now I would recommend going on codewars since the assignment description will be posted soon.",
    courseSchedule:
      'Schedule: \n M, W, F \n 9am-10am \n T, Th \n 12:30pm-2:00pm',
    id: 3
  },
  {
    courseName: 'REACTO 202',
    size: 14,
    teacherId: 7,
    courseIntro:
      'Introduction to the Course \n 1. Welcome to our class on the REACTO method \n 2. Discussion \n 3. Resources \n 4. AlgoExpert',
    courseMoreInformation:
      "Repeat - Examples - Approach - Code - Test - Optimization \n The REACTO approach is what allows us to solve interview questions.  You can expect us to have daily assignments in order to meet the demands of the interviewers.  \n You'll need to write out examples, describe your approaches.  \n Fitting the interview environment, which is fundamentally interactive in its nature, you don't want to reach the coding step until you've done the previous. \n Pseudocode, testing, and finally optimization (think, with respect to runtime and the necessity of all of the code), are all essential to this method.",
    courseSchedule: 'Schedule: \n M, W, F \n 8am-9am \n T, Th \n 3:30pm-5:00pm',
    id: 4
  }
]

// the users table contains both students and teachers
const user = [
  {
    firstName: 'Khuong',
    lastName: 'Le',
    email: 'student1@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Jonathan',
    lastName: 'Arreola',
    email: 'student2@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Dean',
    lastName: 'Gladish',
    email: 'student3@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Zach',
    lastName: 'Bryce',
    email: 'student4@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Fifth',
    lastName: 'Student',
    email: 'laststudent@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'All',
    lastName: 'Classes',
    email: 'studentAllClasses@email.com',
    password: '123',
    accountType: 'student'
  },
  {
    firstName: 'Travis',
    lastName: 'Stratton',
    email: 'teacher1@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'Jonah',
    lastName: 'Ullman',
    email: 'teacher2@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'No',
    lastName: 'Classes',
    email: 'teachesNoClasses@email.com',
    password: '123',
    accountType: 'teacher'
  },
  {
    firstName: 'Big',
    lastName: 'Brother',
    email: 'admin@email.com',
    password: '123',
    accountType: 'admin'
  }
]

const assignment = [
  {
    assignmentName: 'Capstone',
    assignmentType: 'project',
    dueDate: new Date('September 9, 2020 11:30:00'),
    courseId: 3,
    totalPoints: 30,
    weight: 10,
    description: 'The hardest project of Fullstack Academy. Best of luck.'
  },
  {
    assignmentName: 'Senior Assessment',
    assignmentType: 'test',
    dueDate: new Date('July 20, 2020 12:00:00'),
    courseId: 3,
    totalPoints: 20,
    weight: 20,
    description: 'Best of luck getting ot the other side'
  },
  {
    assignmentName: 'REACTO',
    assignmentType: 'classwork',
    dueDate: new Date('July 19, 2020 08:30:00'),
    courseId: 4,
    totalPoints: 60,
    weight: 40,
    description: 'This are practice algorithm for interviews'
  },
  {
    assignmentName: 'Wonderwall',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 10,
    weight: 5,
    description: 'Best song to start learning the guitar'
  },
  {
    assignmentName: 'Name that Chord',
    assignmentType: 'quiz',
    dueDate: new Date('August 21, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 95,
    weight: 50,
    description: 'You need to learn the fundamentals'
  },
  {
    assignmentName: 'First test assignment for Econ 201',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 1,
    totalPoints: 100,
    weight: 90,
    description: 'Gotta learn some Econ terms'
  },
  {
    assignmentName: 'Second test assignment for Econ 201',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 1,
    totalPoints: 15,
    weight: 93,
    description: 'Got to learn some more Econ terms'
  },
  {
    assignmentName: 'First test assignment for Guitar 101',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 75,
    weight: 5,
    description: 'Can you play wonderwall?'
  },
  {
    assignmentName: 'Second test assignment for Guitar 101',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 2,
    totalPoints: 60,
    weight: 30,
    description: 'Can you play wonderwall well?'
  },
  {
    assignmentName: 'First test assignment for REACTO 202',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 4,
    totalPoints: 40,
    weight: 45,
    description: 'What do you know about BST'
  },
  {
    assignmentName: 'Second test assignment for REACTO 202',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 4,
    totalPoints: 10,
    weight: 50,
    description: 'What do you know about Linked Lists'
  },
  {
    assignmentName: 'First test assignment for Senior Coding 404',
    assignmentType: 'classwork',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 3,
    totalPoints: 85,
    weight: 25,
    description: 'Async week time'
  },
  {
    assignmentName: 'Second test assignment for Senior Coding 404',
    assignmentType: 'homework',
    dueDate: new Date('August 20, 2020 19:15:00'),
    courseId: 3,
    totalPoints: 35,
    weight: 35,
    description: 'Time to do some grace shopper'
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
  },
  {
    classGrade: 95,
    completionStatus: true,
    courseId: 1,
    userId: 6
  },
  {
    classGrade: 94,
    completionStatus: true,
    courseId: 2,
    userId: 6
  },
  {
    classGrade: 93,
    completionStatus: true,
    courseId: 3,
    userId: 6
  },
  {
    classGrade: 92,
    completionStatus: true,
    courseId: 4,
    userId: 6
  }
]

const gradebook = [
  {
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
    assignmentId: 1,
    userId: 2
  },
  {
    assignmentId: 1,
    userId: 3
  },
  {
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
  },
  {
    completed: true,
    individualGrade: 99,
    assignmentId: 1,
    userId: 6
  },
  {
    completed: true,
    individualGrade: 97,
    assignmentId: 2,
    userId: 6
  },
  {
    completed: true,
    individualGrade: 93,
    assignmentId: 3,
    userId: 6
  },
  {
    individualGrade: 97,
    assignmentId: 4,
    userId: 6
  },
  {
    individualGrade: 98,
    assignmentId: 5,
    userId: 6
  }
]

module.exports = {course, user, assignment, enrollment, gradebook, classroom}

// Course.hasMany(Assignment)
// Assignment.belongsTo(Course)

// Course.belongsToMany(User, {through: Enrollment})
// User.belongsToMany(Course, {through: Enrollment})

// Assignment.belongsToMany(User, {through: Gradebook})
// User.belongsToMany(Assignment, {through: Gradebook})
