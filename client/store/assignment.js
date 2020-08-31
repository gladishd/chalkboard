import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ASSIGNMENTS = 'GET_ALL_ASSIGNMENTS'
const GET_SINGLE_ASSIGNMENT = 'GET_SINGLE_ASSIGNMENT'
const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT'
const REMOVE_ASSIGNMENT = 'REMOVE_ASSIGNMENT'
const GET_ASSIGNMENTS_FOR_COURSE = 'GET_ASSIGNMENTS_FOR_COURSE'

/**
 * ACTION CREATORS
 */
const getAllAssignments = assignments => ({
  type: GET_ALL_ASSIGNMENTS,
  assignments
})
const getSingleAssignment = assignment => ({
  type: GET_SINGLE_ASSIGNMENT,
  assignment
})
const getAssignmentsForCourse = assignments => ({
  type: GET_ASSIGNMENTS_FOR_COURSE,
  assignments
})
const addAssignment = assignment => ({type: ADD_ASSIGNMENT, assignment})
const updateAssignment = assignment => ({type: UPDATE_ASSIGNMENT, assignment})
const removeAssignment = assignmentId => ({
  type: REMOVE_ASSIGNMENT,
  assignmentId
})

/**
 * THUNK CREATORS
 */

export const getAllAssignmentsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/assignments')
      dispatch(getAllAssignments(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSingleAssignmentThunk = assignmentId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/assignments/${assignmentId}`)
      dispatch(getSingleAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getAssignmentsByCourseIdThunk = courseId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/assignments/byCourseId/${courseId}`)
      dispatch(getAssignmentsForCourse(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addAssignmentThunk = assignment => {
  return async dispatch => {
    try {
      console.log('this is inside the thunk', assignment)
      //I think locations is making it so the post request is sending to /assignments/api/assignments
      //solution is to go back to root
      const {data} = await axios.post('../api/assignments', assignment)
      dispatch(addAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateAssignmentThunk = (assignmentId, assignment) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/assignments/${assignmentId}`,
        assignment
      )
      dispatch(updateAssignment(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeAssignmentThunk = assignmentId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/assignments/${assignmentId}`)
      dispatch(removeAssignment(assignmentId))
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
  assignments: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ASSIGNMENTS:
      return {...state, all: action.assignments}
    case GET_SINGLE_ASSIGNMENT:
      return {...state, single: action.assignment}
    case ADD_ASSIGNMENT:
      return {...state, all: [...state.all, action.assignment]}
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        single: action.assignment,
        all: state.all.map(assignment => {
          if (assignment.id === action.assignment.id)
            assignment = action.assignment
          return assignment
        })
      }
    case REMOVE_ASSIGNMENT:
      return {
        ...state,
        all: state.all.filter(
          assignment => assignment.id !== action.assignmentId
        )
      }
    case GET_ASSIGNMENTS_FOR_COURSE:
      return {
        ...state,
        assignments: action.assignments
      }
    default:
      return state
  }
}
