import axios from 'axios'

//types
const GET_SUBMISSIONS = 'GET_SUBMISSIONS'

//get all submissions thunk
export const getCourseSubmissions = (courseId) => {
    return async dispatch => {
      try {
        const {data} = await axios.get(`/api/submissions/${courseId}`)
        dispatch(getAllCourses(data))
      } catch (err) {
        console.error(err.message)
      }
    }
  }

//reducer and default state
const submissions = []
export default function(state = submissions, action){
    switch(action.type){
        case GET_SUBMISSIONS:
            return {
                submissions: action.submissions
            }
    }
}