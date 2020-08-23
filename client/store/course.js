import axios from 'axios'




const GET_COURSES = 'GET_COURSES'
const SET_COURSE = 'SET_COURSE'

export const getCourses = courses => {
  return {
    type: GET_COURSES,
    courses
  }
}

export const setCourse = (course) => {
  return {
    type: SET_COURSE,
    course
  }
}


export const teacherCourses = (id) => async dispatch => {

  try {
    const courses = await axios.get(`/api/users/${id}`)
    console.log('tc ', courses)
    dispatch(getCourses(courses.data))
  } catch(err){
    console.log('redux err ',err)
  }
}
export const courseSet = (course) => async dispatch => {
    console.log('in course dispatch')
    try{
        console.log('redux course ', course)
        const { posted } = await axios.post(`/api/course/create/`, course)
        console.log('posted ', posted)
        dispatch(setCourse(course))
  } catch (err) {
      console.log('in course dispatch error')
        console.error(err)
  }
}
export const myCourses = (id) => async dispatch => {
  try {
    const { data } = await axios.get('/api/course/myCourses/', id)
    dispatch(getCourses(data))
  } catch (err) {
    console.log(err)
  }
}
const initState = {
    courses: []
}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_COURSES:
      state.courses = action.courses
      return action.courses
    case SET_COURSE:
      return action.course
    default:
      return state
  }
}