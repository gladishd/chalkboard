import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {courseSet} from '../store/course'
import {connect} from 'react-redux'
import {getAllCoursesThunk} from '../store/courses.js' // later on, we also want to only import/filter out courses
// related to a specific teacher

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

  componentDidMount() {
    this.props.getAllCourses()
    this.setState({coursesArray: this.props.reduxState.courses})
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
    console.log('the state on the teacherdash component is ', this.state)
    console.log(this.props.reduxState.courses)
    let courseList = this.props.reduxState.courses
    return (
      <div className="TeacherDash">
        <button>Calendar</button>
        <button className="teacherDashLogOut">LogOut</button>
        <div className="teacherDashListClasses">List of Classes</div>
        <button
          className="teacherDashNewClassButton"
          onClick={this.handleClick}
        >
          New Class
        </button>
        {typeof courseList.map === 'function' &&
        Object.keys(courseList).length !== 0 ? (
          courseList.map(course => {
            return (
              <Link className="teacherDashClassName" to="./teacherClassboard">
                {course.courseName}
              </Link>
            )
          })
        ) : (
          <div>Loading..</div>
        )}

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

const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCourse: data => {
      dispatch(courseSet(data))
    },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDash)
