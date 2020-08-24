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
      renderNewCourseForm: false
    }
    this.mapInputToStateIntro = this.mapInputToStateIntro.bind(this)
    this.mapInputToStateMoreInformation = this.mapInputToStateMoreInformation.bind(
      this
    )
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    console.log(this.state)
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

  render() {
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
                        name: course.courseName
                      }
                    }} >
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
        <div className="teacherDashListClasses">List of Classes</div>
        <button
          className="teacherDashNewClassButton"
          onClick={this.handleClick}
        >
          New Class
        </button>
        <Link className="teacherDashClassName" to="./teacherClassboard">
          Class A
        </Link>
        <Link className="teacherDashClassName" to="./teacherClassboard">
          Class B
        </Link>

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
  return {
    courses: state.user.courses,
    userId: state.user.me.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDash)
