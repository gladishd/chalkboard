import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COURSE = 'GET_COURSE'
const GET_ALL = 'GET_ALL'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getCourse = course => ({type: GET_COURSE, course})
const getAll = courses => ({type: GET_ALL, courses})

/**
 * THUNK CREATORS
 */
export const getAllCoursesThunk = () => async dispatch => {
  try {
    let response = await axios.get('/api/courses')
    dispatch(getAll(response))
  } catch (err) {
    console.error(err)
  }
}

export const getCourseThunk = id => async dispatch => {
  try {
    let response = await axios.get(`/api/courses/${id}`)
    dispatch(getCourse(response))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COURSE:
      return action.course.data
    case GET_ALL:
      return action.courses.data
    default:
      return state
  }
}
