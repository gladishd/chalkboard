import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {getAllCoursesThunk} from '../store/courses.js'
import {IoTSecureTunneling} from 'aws-sdk'

export class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coursesArray: []
    }
    //this binding
  }

  componentDidMount() {
    console.log('welcome ', this.props)
    const socket = openSocket(`http://localhost:8080/`)
    this.props.getAllCourses()
    // we need to re-render now
    this.setState({coursesArray: this.props.reduxState.courses})
  }

  render() {
    console.log(this.props.courses)
    console.log(Object.keys(this.props.courses).length === 0)
    return (
      <div>
        Currently Enrolled in:
        <div className="studentCourseList">
          {Object.keys(this.props.courses).length !== 0 ? (
            this.props.courses.map((course, index) => {
              return (
                <div>
                  <Link to={`./studentClassDashboard/${index + 1}`}>
                    {course.courseName}
                  </Link>
                  <br />
                </div>
              )
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        Not Enrolled in:
        <div className="studentCourseList">
          <Link to="./studentClassDashboard">Physics</Link>
          <br />
          <Link to="./studentClassDashboard">Art History</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
