import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getTeacherCoursesThunk} from '../../store/user'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import {setSocket} from '../../store/socket'
import {getSingleCourseThunk, addCourseThunk} from '../../store/course'
import {toast, ToastContainer} from 'react-toastify'

export class TeacherDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introCourseText: '',
      moreClassInformationText: '',
      courseName: '',
      courseSchedule: '',
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
    this.mapCourseScheduleToState = this.mapCourseScheduleToState.bind(this)
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
    toast('Success!')

    this.props.postCourse({
      id: Number(this.state.courseId),
      teacherId: Number(this.props.reduxState.user.me.id),
      courseName: this.state.courseName,
      size: Number(this.state.courseSize),
      courseIntro: this.state.introCourseText,
      courseMoreInformation: this.state.moreClassInformationText,
      courseSchedule: this.state.courseSchedule
    })
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

  mapCourseScheduleToState(e) {
    e.preventDefault()
    this.setState({
      courseSchedule: e.target.value
    })
  }

  render() {
    console.log('looking for firstName prop ', this.props)
    const courseList = this.props.courses || []
    return (
      <div
        className="TeacherDash"
        style={{
          overflow: 'scroll',
          height: 'auto'
        }}
      >
        <div className="teacher-dash-schedule">
          {courseList.length > 0 ? (
            courseList.map((course, index) => {
              const counter = index

              return (
                <div className="schedule-details" key={`spit${counter}`}>
                  {/* <Link
                    className="react-router-link"
                    to={`./TeacherClassboard/${course.id}`}
                  >
                    {course.courseName}
                  </Link> */}
                  <Link
                    className="react-router-link"
                    to={{
                      pathname: `./TeacherClassboard/${course.id}`,
                      state: {
                        number: course.id,
                        name: course.courseName,
                        firstName: this.props.firstName
                      }
                    }}
                  >
                    {course.courseName}
                  </Link>
                  {course.courseSchedule.split('\n').map((eachLine, indx) => {
                    const scheduleCounter = indx
                    return (
                      <div
                        key={`courseListSchedule${course.id}:${scheduleCounter}`}
                        style={{fontSize: '0.75em'}}
                      >
                        {eachLine}
                      </div>
                    )
                  })}
                  <br />
                </div>
              )
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="teacherDashListClasses">List of Classes</div>

        {typeof courseList.map === 'function' &&
        Object.keys(courseList).length !== 0 ? (
          courseList.map(course => {
            return (
              <Link
                className="react-router-link teacherDashClassName"
                key={`courseListDash${course.id}`}
                // to={`./TeacherClassboard/${course.id}`}
                to={{
                  pathname: `./TeacherClassboard/${course.id}`,
                  state: {
                    number: course.id,
                    name: course.courseName,
                    firstName: this.props.firstName
                  }
                }}
              >
                {course.courseName}
              </Link>
            )
          })
        ) : (
          <div>Loading..</div>
        )}
        <button
          type="button"
          className="teacherDashNewClassButton"
          onClick={this.handleClick}
        >
          New Class
        </button>
        {this.state.renderNewCourseForm ? (
          <form onSubmit={this.handleSubmit} className="addNewClassForm">
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
            <label htmlFor="courseSchedule">Course Schedule: </label>
            <textarea
              name="courseSchedule"
              onChange={this.mapCourseScheduleToState}
            />
            <br />
            <ToastContainer className="toastContainer" />
            <button
              type="button"
              className="submitCourse"
              onClick={this.handleSubmit}
            >
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
    getMyCourses: id => dispatch(getTeacherCoursesThunk(id)),
    newSocket: socket => dispatch(setSocket(socket)),
    single: id => dispatch(getSingleCourseThunk(id)),
    postCourse: courseData => dispatch(addCourseThunk(courseData))
  }
}
const mapStateToProps = state => {
  return {
    courses: state.user.courses,
    firstName: state.user.me.firstName,
    userId: state.user.me.id,
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDash)
