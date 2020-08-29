import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {getAllCoursesThunk} from '../store/course.js'
import {getUserCoursesThunk} from '../store/user'

export class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coursesArray: []
    }
    //this binding
  }
  async componentWillMount() {
    try {
      await this.props.getMyCourses(this.props.userId)
      await this.props.getAllCourses()
    } catch (err) {
      console.log(err)
    }
  }
  async componentDidMount() {
    this.setState({
      coursesArray: this.props.courses
    })
    const socket = this.props.socket
    console.log('sd socket ? ', socket)
  }

  render() {
    const courseList = this.props.courses || []
    const allCoursesList = this.props.allCourses || []
    const coursesToExclude = courseList.map(course => course.id)
    const notEnrolledList = allCoursesList.filter(element => {
      return !coursesToExclude.includes(element.id)
    })
    return (
      <div>
        Currently Enrolled in:
        <div className="studentCourseList">
          {courseList.length > 0 && Object.keys(courseList[0].length > 0) ? (
            courseList.map((course, index) => {
              return (
                <div key={index}>
                  <Link
                    className="react-router-link"
                    to={{
                      pathname: './studentClassDashBoard',
                      state: {
                        number: course.id,
                        name: course.courseName,
                        firstName: this.props.firstName
                      }
                    }}
                  >
                    {course.courseName}
                  </Link>
                  <br />
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
        Not Enrolled in:
        <div className="studentCourseList">
          {notEnrolledList.length > 0 &&
          Object.keys(notEnrolledList[0].length > 0) ? (
            notEnrolledList.map((course, index) => {
              return (
                <div key={index}>
                  <Link
                    className="react-router-link"
                    to={`./studentClassDashboard/${course.id}`}
                  >
                    {course.courseName}
                  </Link>
                  <br />
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('incoming state: ', state)
  return {
    courses: state.user.courses,
    userId: state.user.me.id,
    firstName: state.user.me.firstName,
    allCourses: state.course.all,
    socket: state.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    },
    getMyCourses: id => dispatch(getUserCoursesThunk(id))
    // newSocket: (socket) => dispatch(setSocket(socket))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
