import React, {Component} from 'react'
import {getTeacherCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from './Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'
import io from 'socket.io-client'
import {getSingleCourseThunk, getCourseStudentsThunk} from '../store/course'

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
  async componentWillMount(){
    await this.props.getCourseStudents(this.props.location.state.number)

  }
  componentDidMount() {
    
    let path
    let courseId
    if (this.props.location) {
      // if we got there through a URL (when we're a student)
      path = this.props.location.pathname
      courseId = this.props.location.state.number
      // courseId = path.slice(path.length - 1)
    } else {
      courseId = this.props.courseIdInherited
    }
    const first = this.props.location.state.firstName
    // let courseId = path.slice(path.length - 1)
    let courseName = this.props.location.state.name
    console.log('the props are ', this.props)
    // this.props.getCourse(courseId)
    const socket = io(`/${this.props.location.state.number}`)
    const input = document.getElementById('chat-input')

    // I just commented these lines out so that I could render from the teacher's perspective
    // socket.emit('login', {name: first, type: 'Student'})
    socket.emit('login', {name: first, type: 'teacher'})
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        socket.emit('message', {
          message: e.target.value,
          firstName: this.props.location.state.firstName,
          type: 'teacher'
        })
        e.target.value = ''
      }
    })
    socket.on('myMessage', message => {
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.innerHTML = message
      box.appendChild(mes)
    })
    socket.on('theirMessage', message => {
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.innerHTML = message
      box.appendChild(mes)
    })
    socket.on('teacherMessage', (message) => {
      console.log('in teacher')
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.classList.add('teacher-message')
      mes.innerHTML = message
      box.appendChild(mes)
    })
    socket.on('private', (message) => {
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.classList.add('teacher-private')
      mes.innerHTML = `${message}`
      box.appendChild(mes)
    })
    socket.on('list', (student) => {
      console.log('new user ', student)
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

      await this.props.getSingleCourse(courseIdFromPath)

      await this.props.getStudentsForThisCourse(courseIdFromPath)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('teacher classboard props w students ', this.props)
    console.log('On TeacherClassboard.js, the props are ', this.props)
    const courseList = this.props.reduxState.user.courses || []
    // const identification = this.props.location.state.number || null
    // const courseName = this.props.location.state.name
    // const coursename = this.props.reduxState.user.courses
    const courseName = this.props.reduxState.course.single.courseName
    return (
      <div className="teacherClassBoard">
        <div className="classboardList">
          <b>{courseName}</b>

          {this.props.reduxState.course.students.map((studentObject, index) => {
            return (
              <div>
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
                userInherited={this.props.reduxState.user.me}
                courseObjectInherited={this.props.reduxState.course.single}
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
            <div className="liveChat">
          {/* <button className="chatButtonCreate" onClick={this.toggleForm}> */}
            {/* Create a New Group
          </button> */}
          <select
            name="group"
            className="selectAudience"
            // onChange={this.handleChange}
          >
            <option value="">Select an Audience</option>
            <option value="Dean">Dean</option>
            <option value="Khuong">Khuong</option>
            <option value="Zach">Zach</option>
            <option value="Jonathan">Jonathan</option>
          </select>
          <br />
          Say something nice..
          <div id="message-main">
            <div id="chat-messages" />
            <input id="chat-input" type="text" overflow="auto" />
          </div>
          
        </div>
            <button className="classboardAddStudent">Add</button>
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
    students: state.students,
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassboard)
