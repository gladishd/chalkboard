import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import openSocket from 'socket.io-client'

export class TeacherDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introCourseText: '',
      moreClassInformationText: '',
      courseName: '',
      courseSize: null,
      courseId: null,
      renderNewCourseForm: false,
      coursesArray: []
    }
    this.mapInputToStateIntro = this.mapInputToStateIntro.bind(this)
    this.mapInputToStateMoreInformation = this.mapInputToStateMoreInformation.bind(
      this
    )
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.mapCourseNameToState = this.mapCourseNameToState.bind(this)
    this.mapCourseSizeToState = this.mapCourseSizeToState.bind(this)
    this.mapCourseIdToState = this.mapCourseIdToState.bind(this)
  }
  async componentWillMount() {
    try {
      await this.props.getMyCourses(this.props.userId)
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.setState({
      coursesArray: this.props.courses
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.postCourse(this.state)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({renderNewCourseForm: !this.state.renderNewCourseForm})
  }

  mapInputToStateIntro(e) {
    e.preventDefault()
    this.setState({
      introCourseText: e.target.value
    })
  }

  mapInputToStateMoreInformation(e) {
    e.preventDefault()
    this.setState({
      moreClassInformationText: e.target.value
    })
  }

  mapCourseNameToState(e) {
    e.preventDefault()
    this.setState({
      courseName: e.target.value
    })
  }

  mapCourseSizeToState(e) {
    e.preventDefault()
    this.setState({
      courseSize: e.target.value
    })
  }

  mapCourseIdToState(e) {
    e.preventDefault()
    this.setState({
      courseId: e.target.value
    })
  }

  render() {
    console.log('the props on the course list are ', this.props.courses)
    const courseList = this.props.courses || []
    return (
      <div className="TeacherDash">
        <div className="studentCourseList">
          {courseList.length > 0 ? (
            courseList.map((course, index) => {
              return (
                <div key={index}>
                  <Link
                    to={{
                      pathname: './TeacherClassboard',
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
            <div>Loading...</div>
          )}
        </div>
        {courseList.length > 0 ? (
          courseList.map((course, index) => {
            return (
              <div key={index}>
                {course.courseSchedule.split('\n').map(eachLine => {
                  return <div>{eachLine}</div>
                })}
                <br />
              </div>
            )
          })
        ) : (
          <div>Loading...</div>
        )}
        <div className="teacherDashListClasses">List of Classes</div>
        <button
          className="teacherDashNewClassButton"
          onClick={this.handleClick}
        >
          New Class
        </button>
        {/* {typeof courseList.map === 'function' &&
        Object.keys(courseList).length !== 0 ? (
          courseList.map(course, idx => {
            return (
              <div key={idx}>
              <Link className="teacherDashClassName" to="./teacherClassboard">
                {course.courseName}
              </Link>
              </div>
            )
          })
        ) : (
          <div>Loading..</div>
        )} */}

        {this.state.renderNewCourseForm ? (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="introductionToTheCourse">
              Introduction to the Course:{' '}
            </label>
            <textarea
              name="introductionToTheCourse"
              onChange={this.mapInputToStateIntro}
            />
            <br />
            <label htmlFor="moreClassInformationComponent">
              More Class Information:{' '}
            </label>
            <textarea
              name="moreClassInformationComponent"
              onChange={this.mapInputToStateMoreInformation}
            />
            <br />
            <label htmlFor="courseName">Course Name: </label>
            <textarea name="courseName" onChange={this.mapCourseNameToState} />
            <br />
            <label htmlFor="courseSize">Course Size: </label>
            <textarea name="courseSize" onChange={this.mapCourseSizeToState} />
            <br />
            <label htmlFor="courseId">Course Id: </label>
            <textarea name="courseId" onChange={this.mapCourseIdToState} />
            <br />
            <button type="button" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        ) : (
          <div> </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCourses: () => dispatch(getAllCoursesThunk()),
    getMyCourses: id => dispatch(getUserCoursesThunk(id))
  }
}
const mapStateToProps = state => {
  console.log('teacher incoming state ', state)
  return {
    courses: state.user.courses,
    userId: state.user.me.id,
    firstName: state.user.me.firstName,
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDash)
