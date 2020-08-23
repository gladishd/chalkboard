import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ME = 'GET_ME'
const LOGOUT_USER = 'LOGOUT_USER'

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const getSingleUser = user => ({type: GET_SINGLE_USER, user})
const addUser = user => ({type: ADD_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})
const removeUser = userId => ({type: REMOVE_USER, userId})
const getMe = me => ({type: GET_ME, me})
const logoutUser = () => ({type: LOGOUT_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getMe(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
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
  me: {}
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
    default:
      return state
  }
}
