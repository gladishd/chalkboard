import React, {Component} from 'react'
import {addCourseThunk} from '../../store/course'
import {getUserCoursesThunk} from '../../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'
import CourseListing from '../CourseListing'

export class TeacherDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      size: null,
      roomId: null
    }
    this.createCourse = this.createCourse.bind(this)
  }
  createCourse(e) {
    e.preventDefault()
    const course = {
      name: e.target.name.value,
      size: e.target.size.value,
      roomId: e.target.roomId.value,
      courseId: e.target.courseId.value
    }
    this.props.addCourse(course)
  }
  async componentWillMount() {
    await this.props.getCourses(1)
    // console.log('cwm ', this.props)
  }
  render() {
    const courses = this.props.courses || ['empty']
    return (
      <div>
        {courses.length ? (
          <div>
            <div>
              <h1>Hello</h1>
              <form onSubmit={this.createCourse}>
                <h3>Create New Course</h3>
                <p>Name</p>
                <input type="text" name="name" />
                <p>Size</p>
                <input type="text" name="size" />
                <p>Room Id</p>
                <input type="text" name="roomId" />
                <p>*Course Id*</p>
                <input type="text" name="courseId" />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div>
              <h3>My Courses:</h3>
              {courses.map((one, idx) => (
                <CourseListing oneCourse={one} key={idx} />
              ))}
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCourse: course => dispatch(addCourseThunk(course)),
    getCourses: id => dispatch(getUserCoursesThunk(id))
  }
}
const mapStateToProps = state => {
  // console.log('map state ', state)
  return {
    courses: state.course
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard)
