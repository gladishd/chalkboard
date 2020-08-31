import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const GET_USER_COURSES = 'GET_USER_COURSES'
const GET_USER_ASSIGNMENTS = 'GET_USER_ASSIGNMENTS'
const GET_TEACHER_COURSES = 'GET_TEACHER_COURSES'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ME = 'GET_ME'
const LOGOUT_USER = 'LOGOUT_USER'
const TAKE_ATTENDANCE = 'TAKE_ATTENDANCE'
const GET_ALL_ATTENDANCE_FOR_COURSE = 'GET_ALL_ATTENDANCE_FOR_COURSE'
const GET_USER_GRADEBOOK = 'GET_USER_GRADEBOOK'

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const getSingleUser = user => ({type: GET_SINGLE_USER, user})
const getUserCourses = courses => ({type: GET_USER_COURSES, courses})
const getUserAssignments = assignments => ({
  type: GET_USER_ASSIGNMENTS,
  assignments
})
const addUser = user => ({type: ADD_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})
const removeUser = userId => ({type: REMOVE_USER, userId})
const getMe = me => ({type: GET_ME, me})
const logoutUser = () => ({type: LOGOUT_USER})
const getTeacherCourses = courses => ({type: GET_TEACHER_COURSES, courses})
const takeAttendance = data => ({type: TAKE_ATTENDANCE, data})
const getAllAttendanceForCourse = data => ({
  type: GET_ALL_ATTENDANCE_FOR_COURSE,
  data
})
const getUserGradebook = data => ({
  type: GET_USER_GRADEBOOK,
  data
})

/**
 * THUNK CREATORS
 */

export const getAllUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAllAttendanceByCourseThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/attendance/${courseId}`)
      dispatch(getAllAttendanceForCourse(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const getSingleUserThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(getSingleUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getUserCoursesThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/courses/${userId}`)
      dispatch(getUserCourses(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getTeacherCoursesThunk = teacherId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/teachers/courses/${teacherId}`)
      dispatch(getTeacherCourses(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const getUserAssignmentsThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/assignments/${userId}`)
      dispatch(getUserAssignments(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getUserGradebookThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/gradebook/${userId}`)
      dispatch(getUserGradebook(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const addUserThunk = user => {
  return async dispatch => {
    try {
      console.log('did we reach the add user Thunk?')
      console.log('On the addUserThunk, the user object is ', user)
      const {data} = await axios.post('api/users', user)
      dispatch(addUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const takeAttendanceThunk = attendanceData => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users/attendance', attendanceData)
      dispatch(takeAttendance(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const updateUserThunk = (userId, user) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, user)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeUserThunk = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(removeUser(userId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getMe(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  console.log('in user auth')
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    console.log('auth res ', res)
  } catch (authError) {
    return dispatch(getMe({error: authError}))
  }

  try {
    dispatch(getMe(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(logoutUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {},
  me: {},
  courses: [],
  assignments: [],
  pastAttendance: {},
  attendanceDataSubmitted: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, all: action.users}
    case GET_SINGLE_USER:
      return {...state, single: action.user}
    case GET_USER_COURSES:
      return {...state, courses: action.courses}
    case GET_USER_ASSIGNMENTS:
      return {...state, assignments: action.assignments}
    case ADD_USER:
      return {...state, all: [...state.all, action.user]}
    case UPDATE_USER:
      return {
        ...state,
        single: action.user,
        all: state.all.map(user => {
          if (user.id === action.user.id) user = action.user
          return user
        })
      }
    case REMOVE_USER:
      return {
        ...state,
        all: state.all.filter(user => user.id !== action.userId)
      }
    case GET_ME:
      return {...state, me: action.me}
    case LOGOUT_USER:
      return {...state, me: {}}
    case GET_TEACHER_COURSES:
      return {...state, courses: action.courses} // using the same courses object on state for both the teacher and student classboard
    case TAKE_ATTENDANCE:
      return {...state, attendanceDataSubmitted: action.data}
    case GET_ALL_ATTENDANCE_FOR_COURSE:
      return {...state, pastAttendance: action.data}
    case GET_USER_GRADEBOOK:
      return {
        ...state,
        gradebook: action.data
      }
    default:
      return state
  }
}
