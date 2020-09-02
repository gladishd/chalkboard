import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_COURSES = 'GET_ALL_COURSES'
const GET_SINGLE_COURSE = 'GET_SINGLE_COURSE'
const GET_COURSE_STUDENTS = 'GET_COURSE_STUDENTS'
const GET_COURSE_TEACHER = 'GET_COURSE_TEACHER'
const ADD_COURSE = 'ADD_COURSE'
const UPDATE_COURSE = 'UPDATE_COURSE'
const REMOVE_COURSE = 'REMOVE_COURSE'

/**
 * ACTION CREATORS
 */
const getAllCourses = courses => ({type: GET_ALL_COURSES, courses})
const getSingleCourse = course => ({type: GET_SINGLE_COURSE, course})
const getCourseStudents = students => ({type: GET_COURSE_STUDENTS, students})
const getCourseTeacher = teacher => ({type: GET_COURSE_TEACHER, teacher})
const addCourse = course => ({type: ADD_COURSE, course})
const updateCourse = course => ({type: UPDATE_COURSE, course})
const removeCourse = courseId => ({type: REMOVE_COURSE, courseId})

/**
 * THUNK CREATORS
 */

export const getAllCoursesThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/courses')
      dispatch(getAllCourses(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSingleCourseThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/courses/${courseId}`)
      dispatch(getSingleCourse(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getCourseStudentsThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/courses/students/${courseId}`) // the first slash is very important
      const students = data.filter(user => user.accountType === 'student')
      dispatch(getCourseStudents(students))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getCourseTeacherThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/courses/teacher/${courseId}`)
      const [teacher, ...rest] = data.filter(
        user => user.accountType === 'teacher'
      )
      dispatch(getCourseTeacher(teacher))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addCourseThunk = course => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/courses', course)
      dispatch(addCourse(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateCourseThunk = (courseUpdates, courseId, teacherId) => {
  return async dispatch => {
    try {
      let {
        courseIntroTextArea,
        courseMoreInformationTextArea,
        courseNameTextArea,
        courseScheduleTextArea,
        courseSizeTextArea
      } = courseUpdates

      let putObject = {
        id: courseId,
        teacherId: Number(teacherId),
        courseName: courseNameTextArea,
        size: Number(courseSizeTextArea),
        courseIntro: courseIntroTextArea,
        courseMoreInformation: courseMoreInformationTextArea,
        courseSchedule: courseScheduleTextArea
      }

      const {data} = await axios.put(`/api/courses/${courseId}`, putObject)

      dispatch(updateCourse(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeCourseThunk = courseId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/courses/${courseId}`)
      dispatch(removeCourse(courseId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {},
  students: [],
  teacher: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {...state, all: action.courses}
    case GET_SINGLE_COURSE:
      return {...state, single: action.course}
    case GET_COURSE_STUDENTS:
      return {...state, students: action.students}
    case GET_COURSE_TEACHER:
      return {...state, teacher: action.teacher}
    case ADD_COURSE:
      return {...state, all: [...state.all, action.course]}
    case UPDATE_COURSE:
      return {
        ...state,
        single: action.course,
        all: state.all.map(course => {
          if (course.id === action.course.id) course = action.course
          return course
        })
      }
    case REMOVE_COURSE:
      return {
        ...state,
        all: state.all.filter(course => course.id !== action.courseId)
      }

    default:
      return state
  }
}
