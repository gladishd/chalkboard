import axios from 'axios'

//action creator
const addGroup = groupId => {
  return {
    type: GET_GROUP,
    groupId
  }
}

const GET_GROUP = 'GET_GROUP'
//reducer
const init = {
  group: null
}
export default function(state = init, action) {
  switch (action.type) {
    case GET_GROUP:
      return action.group
    default:
      return state
  }
}
