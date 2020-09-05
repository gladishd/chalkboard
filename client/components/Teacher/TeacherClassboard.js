import React, {Component} from 'react'
import {
  getTeacherCoursesThunk,
  addUserThunk,
  getAllUsersThunk
} from '../../store/user'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from '../Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'
// import io from 'socket.io-client'
import {
  getSingleCourseThunk,
  getCourseStudentsThunk,
  updateCourseThunk
} from '../../store/course'
import CreateZoomVideo from '../Zoom/CreateVideoButton'
import {CreateAssignment} from '../index'
import {ToastContainer, toast} from 'react-toastify'

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
      showCourseData: false,
      courseId: '',
      // assignmentName: '',
      // dueDate: '',
      // totalPoints: '',
      // percentTotalGrade: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      messages: [],
      courseNameTextArea: '',
      courseSizeTextArea: '',
      courseIntroTextArea: '',
      courseMoreInformationTextArea: '',
      courseScheduleTextArea: ''
    }
    this.handleAssignmentSubmit = this.handleAssignmentSubmit.bind(this)
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this)
    this.mapInputToState = this.mapInputToState.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleUpdateCourse = this.handleUpdateCourse.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.className]: e.target.value})
  }

  handleUpdateCourse(e) {
    e.preventDefault()
    let {
      courseNameTextArea,
      courseSizeTextArea,
      courseIntroTextArea,
      courseMoreInformationTextArea,
      courseScheduleTextArea
    } = this.state

    if (!courseNameTextArea) {
      courseNameTextArea = this.props.reduxState.course.single.courseName
    }
    if (!courseSizeTextArea) {
      courseSizeTextArea = this.props.reduxState.course.single.size
    }
    if (!courseIntroTextArea) {
      courseIntroTextArea = this.props.reduxState.course.single.courseIntro
    }
    if (!courseMoreInformationTextArea) {
      courseMoreInformationTextArea = this.props.reduxState.course.single
        .courseMoreInformation
    }

    if (!courseScheduleTextArea) {
      courseScheduleTextArea = this.props.reduxState.course.single
        .courseSchedule
    }

    this.props.putCourse(
      {
        courseNameTextArea,
        courseSizeTextArea,
        courseIntroTextArea,
        courseMoreInformationTextArea,
        courseScheduleTextArea
      },
      // this.props.history.location.state.number,
      this.state.courseId, // getting course id from a different place
      this.props.reduxState.user.me.id
    )
  }

  handleAssignmentSubmit(e) {
    e.preventDefault()
  }

  handleStudentSubmit(e) {
    e.preventDefault()
    let allUserIds = this.props.reduxState.user.all.map(user => {
      return Number(user.id)
    })

    let nextId = Math.max(...allUserIds) + 1
    this.props.addNewUser({
      accountType: 'student',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      id: nextId
    })
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.email &&
      this.state.password
    ) {
      toast('Success!')
    } else {
      toast('Need to fill out all fields!')
    }
  }

  mapInputToState(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  toggle(e) {
    e.preventDefault()
    switch (e.target.className) {
      case 'classboardAttendance':
        this.setState({
          showAttendance: !this.state.showAttendance
        })
        break

      case 'classboardAssignments':
        this.setState({
          showAssignmentView: !this.state.showAssignmentView
        })
        break

      case 'classboardStudent':
        this.setState({
          showAssignmentByStudentView: !this.state.showAssignmentByStudentView
        })
        break

      case 'classboardInformation':
        this.setState({
          showCourseData: !this.state.showCourseData
        })
        break

      case 'classboardAddAssignment':
        this.setState({
          renderNewAssignmentForm: !this.state.renderNewAssignmentForm
        })
        break

      case 'classboardAddStudent':
        this.setState({
          renderNewStudentForm: !this.state.renderNewStudentForm
        })
        break
      default:
        break
    }
  }

  async componentDidMount() {
    let course = this.props.location.state.number
    try {
      await this.props.getMyCourses(this.props.reduxState.user.me.id)
      const courseId = Number(this.props.match.params.id)

      this.setState({courseId})

      // await this.props.getSingleCourse(this.state.courseId)
      await this.props.getSingleCourse(course)
      await this.props.getStudentsForThisCourse(course)
      await this.props.getAllUsers()

      
    } catch (err) {
      console.log(err)
    }

    

    const socket = this.props.socket
    socket.emit('login', {
      course,
      level: 'teacher',

      name: this.props.reduxState.course.single.courseName
    })
    socket.on('room-chat', message => {
      console.log(message)
    })
    socket.on('message', message => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })
    socket.on('private-message', MessageTypeUser => {
      const {message, type, user} = MessageTypeUser
      this.setState({
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



  render() {
    const courseName = this.props.reduxState.course.single.courseName

    return (
      <div className="teacherClassBoard">
        <div className="classboard-schedule-roster">
          <div className="classboardSchedule">
            {this.props.reduxState.course.single.courseSchedule ? (
              this.props.reduxState.course.single.courseSchedule
                .split('\n')
                .map((eachLine, index) => {
                  const counter = index
                  return <div key={'courseSchedule' + counter}>{eachLine}</div>
                })
            ) : (
              <div>No Schedule Available</div>
            )}
          </div>
          <div className="classboardList">
            <b>{`${courseName} - Roster`}</b>
            <br></br>
            {this.props.reduxState.course.students.map(student => {
              return (
                <div key={student.id}>
                  {`${student.firstName} ${student.lastName} (${student.email})`}
                </div>
              )
            })}
          </div>
        </div>
        <CreateZoomVideo />
        <div className="liveChat">
          {/* <button className="chatButtonCreate" onClick={this.toggleForm}> */}
          {/* Create a New Group
              </button> */}
          <h3>Live Chat</h3>
          <select
            name="group"
            className="selectAudience"
            // onChange={this.handleChange}
          >
            <option value='All'>*All*</option>
            {this.props.students.map((student, idx) => (
              <option key={student.firstName} value={student.firstName}>
                {student.firstName}
              </option>
            ))}
          </select>
          <br />
          Say something nice..
          <div id="message-main">
            <div id="chat-messages" />
            {this.state.messages.map((message, index) => {
              const messageCounter = index
              return (
                <p
                  key={'messageCounter' + messageCounter}
                  className={message.css}
                >
                  {message.message}
                </p>
              )
            })}
            <input
              id="chat-input"
              className="teacher-chat-input"
              type="text"
              overflow="auto"
            />
          </div>
        </div>
        <div className="scheduleDashBox">
          <div className="teacherClassboardOptions">
            <button
              type="button"
              className="classboardInformation"
              onClick={this.toggle}
            >
              Course Information
            </button>

            {this.state.showCourseData ? (
              <form onSubmit={e => this.handleUpdateCourse(e)}>
                <label htmlFor="courseName">
                  Name:
                  <textarea
                    className="courseNameTextArea"
                    onChange={e => this.handleChange(e)}
                  >
                    {this.props.reduxState.course.single.courseName}
                  </textarea>
                </label>

                <br />

                <label htmlFor="courseSize">
                  Size:
                  <textarea
                    className="courseSizeTextArea"
                    onChange={e => this.handleChange(e)}
                  >
                    {this.props.reduxState.course.single.size}
                  </textarea>
                </label>

                <br />

                <label htmlFor="courseIntro">
                  Intro:
                  <textarea
                    className="courseIntroTextArea"
                    onChange={e => this.handleChange(e)}
                  >
                    {this.props.reduxState.course.single.courseIntro}
                  </textarea>
                </label>

                <br />

                <label htmlFor="courseMoreInformation">
                  Information:
                  <textarea
                    className="courseMoreInformationTextArea"
                    onChange={e => this.handleChange(e)}
                  >
                    {this.props.reduxState.course.single.courseMoreInformation}
                  </textarea>
                </label>

                <br />

                <label htmlFor="courseSchedule">
                  Schedule:
                  <textarea
                    className="courseScheduleTextArea"
                    onChange={e => this.handleChange(e)}
                  >
                    {this.props.reduxState.course.single.courseSchedule}
                  </textarea>
                </label>

                <button type="submit" className="submitCourse">
                  Submit
                </button>
              </form>
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAttendance"
              onClick={this.toggle}
            >
              Today's Attendance
            </button>
            {this.state.showAttendance ? (
              <Attendance
                studentsForThisCourseInherited={
                  this.props.reduxState.course.students
                }
                courseIdInherited={this.state.courseId}
              />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAssignments"
              onClick={this.toggle}
            >
              Assignments
            </button>
            {this.state.showAssignmentView ? (
              <AssignmentView courseIdInherited={this.state.courseId} />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAddAssignment"
              onClick={this.toggle}
            >
              Add
            </button>
            {this.state.renderNewAssignmentForm ? (
              <CreateAssignment courseId={this.state.courseId} />
            ) : (
              <div> </div>
            )}

            <button
              type="button"
              className="classboardStudent"
              onClick={this.toggle}
            >
              Student Assignments
            </button>

            {this.state.showAssignmentByStudentView ? (
              <AssignmentViewByStudent
                studentsForThisCourseInherited={
                  this.props.reduxState.course.students
                }
                courseIdInherited={this.props.location.state.number}
              />
            ) : (
              <div />
            )}

            <button
              type="button"
              className="classboardAddStudent"
              onClick={this.toggle}
            >
              Add Student
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
                <ToastContainer className="toastContainer" />
                <button
                  type="button"
                  className="submitCourse"
                  onClick={this.handleStudentSubmit}
                  style={{'margin-left': '100%'}}
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
      dispatch(getCourseStudentsThunk(courseId)),
    addNewUser: userData => dispatch(addUserThunk(userData)),
    getAllUsers: () => dispatch(getAllUsersThunk()),
    putCourse: (data, courseId, teacherId) =>
      dispatch(updateCourseThunk(data, courseId, teacherId))
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
