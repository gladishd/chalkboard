/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as TeacherClassboard} from './Teacher/TeacherClassboard'
export {default as TeacherDash} from './Teacher/TeacherDash'
export {default as Attendance} from './Attendance'
export {default as StudentDashboard} from './studentDashboard'

export {default as studentClassDashboard} from './studentClassDashboard'
export {default as TeacherDashboard} from './Teacher/TeacherDashboard'
export {default as moreClassInformationComponent} from './moreClassInformationComponent'
export {default as VideoRoom} from './Zoom/VideoRoom'
export {default as CreateVideo} from './Zoom/CreateVideoButton'
export {
  AssignGrade,
  CreateAssignment,
  DeleteAssignment,
  UpdateAssignment
} from './Assignments'
