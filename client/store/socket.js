import axios from 'axios'


const ADD_SOCKET = 'ADD_SOCKET'
//action creator
const addGroup = groupId => {
  return {
    type: GET_GROUP,
    groupId
  }
}
const currentSocket = (socket) => {
  return {
    type: ADD_SOCKET,
    socket
  }
}

export const setSocket = (socket) => {
  return async (dispatch) => {
    dispatch(currentSocket(socket))
  }
  
}

const GET_GROUP = 'GET_GROUP'
//reducer
const init = {
  socket: null
}
export default function(state = init, action) {
  switch (action.type) {
    case GET_GROUP:
      return action.group
    case ADD_SOCKET:
      return action.socket
    default:
      return state
  }
}
