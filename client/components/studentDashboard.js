import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {getAllCoursesThunk} from '../store/courses.js'
import {IoTSecureTunneling} from 'aws-sdk'
import {myCourses } from '../store/course'

export class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coursesArray: []
    }
    //this binding
  }
  async componentWillMount(){
    try{
      await this.props.getMyCourses(this.props.userId)

    } catch (err){
      console.log(err)
    }
      
    
  }
  componentDidMount() {
    this.setState({
      coursesArray: this.props.courses
    })
  }

  render() {
    const courseList = this.props.courses || []
    return (
      <div>
        Currently Enrolled in:
        <div className="studentCourseList">
          {courseList.length > 0 ? (
            courseList.map((course, index) => {
              return (
                <div key={index}>
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
  console.log('incoming state ', state)
  return {
    courses: state.course,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    },
    getMyCourses: (id) => dispatch(myCourses(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
