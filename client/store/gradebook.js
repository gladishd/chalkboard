import axios from 'axios'

//BACKEND ROUTES NOT BUILT YET

/**
 * ACTION TYPES
 */
const GET_ALL_GRADEBOOKS = 'GET_ALL_GRADEBOOKS'
const GET_SINGLE_GRADEBOOK = 'GET_SINGLE_GRADEBOOK'
const ADD_GRADEBOOK = 'ADD_GRADEBOOK'
const UPDATE_GRADEBOOK = 'UPDATE_GRADEBOOK'
const REMOVE_GRADEBOOK = 'REMOVE_GRADEBOOK'

/**
 * ACTION CREATORS
 */
const getAllGradebooks = gradebooks => ({type: GET_ALL_GRADEBOOKS, gradebooks})
const getSingleGradebook = gradebook => ({
  type: GET_SINGLE_GRADEBOOK,
  gradebook
})
const addGradebook = gradebook => ({type: ADD_GRADEBOOK, gradebook})
const updateGradebook = gradebook => ({type: UPDATE_GRADEBOOK, gradebook})
const removeGradebook = gradebookId => ({type: REMOVE_GRADEBOOK, gradebookId})

/**
 * THUNK CREATORS
 */

export const getAllGradebooksThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/gradebooks')
      dispatch(getAllGradebooks(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getSingleGradebookThunk = gradebookId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/gradebooks/${gradebookId}`)
      dispatch(getSingleGradebook(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const addGradebookThunk = gradebook => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/orders', gradebook)
      dispatch(addGradebook(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateGradebookThunk = (gradebookId, gradebook) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/gradebooks/${gradebookId}`,
        gradebook
      )
      dispatch(updateGradebook(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const removeGradebookThunk = gradebookId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/gradebooks/${gradebookId}`)
      dispatch(removeGradebook(gradebookId))
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
  single: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GRADEBOOKS:
      return {...state, all: action.gradebooks}
    case GET_SINGLE_GRADEBOOK:
      return {...state, single: action.gradebook}
    case ADD_GRADEBOOK:
      return {...state, all: [...state.all, action.gradebook]}
    case UPDATE_GRADEBOOK:
      return {
        ...state,
        single: action.gradebook,
        all: state.all.map(gradebook => {
          if (gradebook.id === action.gradebook.id) gradebook = action.gradebook
          return gradebook
        })
      }
    case REMOVE_GRADEBOOK:
      return {
        ...state,
        all: state.all.filter(gradebook => gradebook.id !== action.gradebookId)
      }
    default:
      return state
  }
}
