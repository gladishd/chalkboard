import React, {Component} from 'react'
import {getTeacherCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from './Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'
import {getSingleCourseThunk, getCourseStudentsThunk} from '../store/course'
import CreateZoomVideo from './Zoom/CreateVideoButton'

export class TeacherClassboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // showLecture: false,
      showAttendance: false,
      showAssignmentView: false,
      showAssignmentByStudentView: false,
      renderNewAssignmentForm: false,
      renderNewStudentForm: false
    }
    // this.toggleLecture = this.toggleLecture.bind(this)
    this.toggleAttendance = this.toggleAttendance.bind(this)
    this.toggleAssignmentView = this.toggleAssignmentView.bind(this)
    ;(this.toggleAssignmentByStudentView = this.toggleAssignmentByStudentView.bind(
      this
    )),
      (this.toggleNewStudentForm = this.toggleNewStudentForm.bind(this))
    this.toggleNewAssignmentForm = this.toggleNewAssignmentForm.bind(this)
  }

  toggleNewAssignmentForm(e) {
    e.preventDefault()
    this.setState({
      renderNewAssignmentForm: !this.state.renderNewAssignmentForm
    })
  }

  toggleNewStudentForm(e) {
    e.preventDefault()
    this.setState({
      renderNewStudentForm: !this.state.renderNewStudentForm
    })
  }

  // toggleLecture(e) {
  //   e.preventDefault()
  //   this.setState({
  //     showLecture: !this.state.showLecture
  //   })
  // }

  toggleAttendance(e) {
    e.preventDefault()
    this.setState({
      showAttendance: !this.state.showAttendance
    })
  }

  toggleAssignmentView(e) {
    e.preventDefault()
    this.setState({
      showAssignmentView: !this.state.showAssignmentView
    })
  }

  toggleAssignmentByStudentView(e) {
    e.preventDefault()
    this.setState({
      showAssignmentByStudentView: !this.state.showAssignmentByStudentView
    })
  }

  async componentWillMount() {
    try {
      await this.props.getMyCourses(this.props.reduxState.user.me.id)
      let courseIdFromPath = this.props.location.pathname.slice(
        this.props.location.pathname.length - 1
      )
      await this.props.getSingleCourse(courseIdFromPath)
      await this.props.getStudentsForThisCourse(courseIdFromPath)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const courseList = this.props.reduxState.user.courses || []
    // const identification = this.props.location.state.number || null
    // const courseName = this.props.location.state.name
    // const coursename = this.props.reduxState.user.courses
    const courseName = this.props.reduxState.course.single.courseName
    return (
      <div className="teacherClassBoard" style={{overflow: 'visible'}}>
        <div className="classboardList">
          <b>{courseName}</b>

          {this.props.reduxState.course.students.map((studentObject, index) => {
            const counter = index
            return (
              <div key={counter}>
                {`Student ${index}: ` +
                  studentObject.firstName +
                  ' ' +
                  studentObject.lastName +
                  ' (' +
                  studentObject.email +
                  ')'}
              </div>
            )
          })}
        </div>

        <div className="scheduleDashBox">
          <div className="classboardSchedule">
            {this.props.reduxState.course.single.courseSchedule ? (
              this.props.reduxState.course.single.courseSchedule
                .split('\n')
                .map((eachLine, index) => <div key={index}>{eachLine}</div>)
            ) : (
              <div>No Schedule Available</div>
            )}
          </div>

          <div className="teacherClassboardOptions">
            <CreateZoomVideo />

            <button
              type="button"
              className="classboardAttendance"
              onClick={this.toggleAttendance}
            >
              Today's Attendance
            </button>
            {this.state.showAttendance ? (
              <Attendance
                studentsForThisCourseInherited={
                  this.props.reduxState.course.students
                }
                courseIdInherited={this.props.location.pathname.slice(
                  this.props.location.pathname.length - 1
                )}
              />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAssignments"
              onClick={this.toggleAssignmentView}
            >
              Assignments
            </button>
            {this.state.showAssignmentView ? (
              <AssignmentView
                courseIdInherited={this.props.location.pathname.slice(
                  this.props.location.pathname.length - 1
                )}
              />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAddAssignment"
              onClick={this.toggleNewAssignmentForm}
            >
              Add
            </button>

            {this.state.renderNewAssignmentForm ? (
              <form
                onSubmit={this.handleSubmit}
                className="addNewAssignmentForm"
              >
                <label htmlFor="assignmentName">Assignment Name: </label>
                <textarea
                  name="assignmentName"
                  onChange={this.mapAssignmentNameToState}
                />
                <br />
                <label htmlFor="dueDate">Due Date: </label>
                <textarea name="dueDate" onChange={this.mapDueDateToState} />
                <br />
                <label htmlFor="totalPoints">Total Points: </label>
                <textarea
                  name="totalPoints"
                  onChange={this.mapTotalPointsToState}
                />
                <br />
                <label htmlFor="percentTotalGrade">Percent Total Grade: </label>
                <textarea
                  name="percentTotalGrade"
                  onChange={this.mapPercentTotalGradeToState}
                />
                <br />

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

            <button
              type="button"
              className="classboardStudent"
              onClick={this.toggleAssignmentByStudentView}
            >
              Student
            </button>

            {this.state.showAssignmentByStudentView ? (
              <AssignmentViewByStudent
                studentsForThisCourseInherited={
                  this.props.reduxState.course.students
                }
                courseIdInherited={this.props.location.pathname.slice(
                  this.props.location.pathname.length - 1
                )}
              />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAddStudent"
              onClick={this.toggleNewStudentForm}
            >
              Add
            </button>

            {this.state.renderNewStudentForm ? (
              <form onSubmit={this.handleSubmit} className="addNewStudentForm">
                <label htmlFor="firstName">First Name: </label>
                <textarea
                  name="firstName"
                  onChange={this.mapFirstNameToState}
                />
                <br />
                <label htmlFor="lastName">Last Name: </label>
                <textarea name="lastName" onChange={this.mapLastNameToState} />
                <br />
                <label htmlFor="email">Email: </label>
                <textarea name="email" onChange={this.mapEmailToState} />
                <br />
                <label htmlFor="password">Password: </label>
                <textarea name="password" onChange={this.mapPasswordToState} />
                <br />

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
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyCourses: userId => dispatch(getTeacherCoursesThunk(userId)),
    getSingleCourse: courseId => dispatch(getSingleCourseThunk(courseId)),
    getStudentsForThisCourse: courseId =>
      dispatch(getCourseStudentsThunk(courseId))
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassboard)
