import React, {Component} from 'react'
import {
  getTeacherCoursesThunk,
  addUserThunk,
  getAllUsersThunk
} from '../store/user'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from './Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'
import io from 'socket.io-client'
import {getSingleCourseThunk, getCourseStudentsThunk} from '../store/course'
import CreateZoomVideo from './Zoom/CreateVideoButton'
import AssignmentForm from './Assignments/AssignmentForm'

export class TeacherClassboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // showLecture: false,
      showAttendance: false,
      showAssignmentView: false,
      showAssignmentByStudentView: false,
      renderNewAssignmentForm: false,
      renderNewStudentForm: false,
      assignmentName: '',
      dueDate: '',
      totalPoints: '',
      percentTotalGrade: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      messages: []
    }
    // this.toggleLecture = this.toggleLecture.bind(this)
    this.toggleAttendance = this.toggleAttendance.bind(this)
    this.toggleAssignmentView = this.toggleAssignmentView.bind(this)
    this.toggleAssignmentByStudentView = this.toggleAssignmentByStudentView.bind(
      this
    )
    this.toggleNewStudentForm = this.toggleNewStudentForm.bind(this)
    this.toggleNewAssignmentForm = this.toggleNewAssignmentForm.bind(this)
    this.handleAssignmentSubmit = this.handleAssignmentSubmit.bind(this)
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this)
    this.mapInputToState = this.mapInputToState.bind(this)
  }

  handleAssignmentSubmit(e) {
    e.preventDefault()
  }

  handleStudentSubmit(e) {
    e.preventDefault()
    let allUserIds = this.props.reduxState.user.all.map(user => {
      return Number(user.id)
    })
    // console.log('allUserIds is ', Math.max(...allUserIds))
    let nextId = Math.max(...allUserIds) + 1
    this.props.addNewUser({
      accountType: 'student',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      id: nextId
    })
  }

  mapInputToState(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
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
  // async componentWillMount(){
  //   await this.props.getCourseStudents(this.props.location.state.number)

  // }
  componentDidMount() {
    let course = this.props.location.state.number

    const socket = this.props.socket

    socket.emit('login', {
      course,
      level: 'teacher',
      name: this.props.location.state.firstName
    })
    socket.on('room-chat', message => {
      console.log(message)
    })
    socket.on('message', message => {
      this.setState({
        ...this.state,
        messages: [...this.state.messages, message]
      })
    })
    socket.on('private-message', MessageTypeUser => {
      const {message, type, user} = MessageTypeUser
      this.setState({
        ...this.state,
        messages: [...this.state.messages, MessageTypeUser]
      })
    })
    const input = document.getElementById('chat-input')
    input.addEventListener('keypress', e => {
      const view = document.querySelector('.selectAudience').value
      if (e.key === 'Enter') {
        if (view === 'All') {
          socket.emit('teacher-public-message', {
            message: e.target.value,
            name: this.props.location.state.firstName
          })
        } else {
          socket.emit('direct-message', {
            message: e.target.value,
            name: this.props.location.state.firstName,
            to: view,
            level: 'teacher'
          })
        }

        e.target.value = ''
      }
    })
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
      await this.props.getMyCourses(this.props.reduxState.user.me.id)
      let courseIdFromPath = this.props.location.pathname.slice(
        this.props.location.pathname.length - 1
      )
      let courseIdFromState = this.props.history.location.state.number
      await this.props.getSingleCourse(courseIdFromState)
      await this.props.getStudentsForThisCourse(courseIdFromState)
      await this.props.getAllUsers()
      // await this.props.getSingleCourse(this.props.location.state.number)
      // await this.props.getStudentsForThisCourse(this.props.location.state.number)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // const courseList = this.props.reduxState.user.courses || []
    const courseName = this.props.reduxState.course.single.courseName

    return (
      <div className="teacherClassBoard">
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
                courseIdInherited={this.props.history.location.state.number}
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
                courseIdInherited={this.props.history.location.state.number}
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
              <AssignmentForm
                courseId={this.props.reduxState.course.single.id}
              />
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
                courseIdInherited={this.props.history.location.state.number}
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
              <form
                onSubmit={this.handleStudentSubmit}
                className="addNewStudentForm"
              >
                <label htmlFor="firstName">First Name: </label>
                <textarea name="firstName" onChange={this.mapInputToState} />
                <br />
                <label htmlFor="lastName">Last Name: </label>
                <textarea name="lastName" onChange={this.mapInputToState} />
                <br />
                <label htmlFor="email">Email: </label>
                <textarea name="email" onChange={this.mapInputToState} />
                <br />
                <label htmlFor="password">Password: </label>
                <textarea name="password" onChange={this.mapInputToState} />
                <br />

                <button
                  type="button"
                  className="submitCourse"
                  onClick={this.handleStudentSubmit}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div> </div>
            )}

            <div className="liveChat">
              {/* <button className="chatButtonCreate" onClick={this.toggleForm}> */}
              {/* Create a New Group
          </button> */}
              <select
                name="group"
                className="selectAudience"
                // onChange={this.handleChange}
              >
                {this.props.students.map((student, idx) => (
                  <option value={student.firstName}>{student.firstName}</option>
                ))}
              </select>
              <br />
              Say something nice..
              <div id="message-main">
                <div id="chat-messages" />
                {this.state.messages.map((message, idx) => (
                  <p className={message.css}>{message.message}</p>
                ))}
                <input
                  id="chat-input"
                  className="teacher-chat-input"
                  type="text"
                  overflow="auto"
                />
              </div>
            </div>
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
      dispatch(getCourseStudentsThunk(courseId)),
    addNewUser: userData => dispatch(addUserThunk(userData)),
    getAllUsers: () => dispatch(getAllUsersThunk())
  }
}
const mapStateToProps = state => {
  return {
    students: state.course.students,
    reduxState: state,
    socket: state.socket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassboard)
