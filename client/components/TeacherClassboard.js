import React, {Component} from 'react'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from './Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'

export class TeacherClassboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLecture: false,
      showAttendance: false,
      showAssignmentView: false,
      showAssignmentByStudentView: false
    }
    this.toggleLecture = this.toggleLecture.bind(this)
    this.toggleAttendance = this.toggleAttendance.bind(this)
    this.toggleAssignmentView = this.toggleAssignmentView.bind(this)
    this.toggleAssignmentByStudentView = this.toggleAssignmentByStudentView.bind(
      this
    )
  }

  toggleLecture(e) {
    e.preventDefault()
    this.setState({
      showLecture: !this.state.showLecture
    })
  }

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
      console.log('on the teacher classboard, the props are ', this.props)
      await this.props.getMyCourses(this.props.reduxState.user.me.id)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const courseList = this.props.reduxState.user.courses || []
    const identification = this.props.location.state.number
    const courseName = this.props.location.state.name
    return (
      <div className="teacherClassBoard">
        <div className="classboardList">
          {courseName}: List of Students + Assignments + Grades
        </div>

        <div className="scheduleDashBox">
          <div className="classboardSchedule">
            {courseList.length > 0 ? (
              courseList.map((course, index) => {
                return (
                  <div key={index}>
                    {course.courseSchedule
                      .split('\n')
                      .map((eachLine, index) => {
                        return <div key={index}>{eachLine}</div>
                      })}
                    <br />
                  </div>
                )
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div>
            <button
              className="classboardStartLecture"
              onClick={this.toggleLecture}
            >
              Start Lecture
            </button>
            {this.state.showLecture ? (
              <StudentClassDashboard
                courseIdInherited={`${this.props.location.pathname.charAt(
                  this.props.location.pathname.length - 1
                )}`}
              />
            ) : (
              <div />
            )}

            <button
              className="classboardAttendance"
              onClick={this.toggleAttendance}
            >
              Today's Attendance
            </button>
            {this.state.showAttendance ? <Attendance /> : <div />}

            <button
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

            <button className="classboardAddAssignment">Add</button>

            <button
              className="classboardStudent"
              onClick={this.toggleAssignmentByStudentView}
            >
              Student
            </button>

            {this.state.showAssignmentByStudentView ? (
              <AssignmentViewByStudent />
            ) : (
              <div />
            )}

            <button className="classboardAddStudent">Add</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyCourses: id => dispatch(getUserCoursesThunk(id))
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassboard)
