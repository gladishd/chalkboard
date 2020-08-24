import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {myCourses} from '../store/course'
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

  componentDidMount() {
    this.props.getAllCourses()
    this.setState({coursesArray: this.props.reduxState.courses})
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
    const courseList = this.props.courses || []
    return (
      <div className="TeacherDash">
        <div className="studentCourseList">
          {courseList.length > 0 ? (
            courseList.map((course, index) => {
              return (
                <div key={index}>
                  <Link to={`./TeacherClassboard/${index + 1}`}>
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

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    },
    getMyCourses: id => dispatch(myCourses(id))
  }
}
const mapStateToProps = state => {
  console.log('incoming state ', state)
  return {
    courses: state.course,
    userId: state.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDash)
