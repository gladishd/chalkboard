import React, {Component} from 'react'
import {getTeacherCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {default as StudentClassDashboard} from './studentClassDashboard'
import {default as Attendance} from './Attendance'
import {default as AssignmentView} from './TeacherAssignmentView'
import {default as AssignmentViewByStudent} from './TeacherAssignmentByStudentView'
import io from 'socket.io-client'
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
      messages: []
    }
    // this.toggleLecture = this.toggleLecture.bind(this)
    this.toggleAttendance = this.toggleAttendance.bind(this)
    this.toggleAssignmentView = this.toggleAssignmentView.bind(this)
    this.toggleAssignmentByStudentView = this.toggleAssignmentByStudentView.bind(
      this
    )
  }
  // async componentWillMount(){
  //   await this.props.getCourseStudents(this.props.location.state.number)

  // }
  componentDidMount() {
    console.log('location props ', this.props)
    let course = this.props.location.state.number

   const socket = this.props.socket
   
    socket.emit('login', {course, level:'student'})
    socket.on('room-chat', (message) => {
      console.log(message)
    })
    socket.on('message', (message) => {
      this.setState({
        ...this.state,
        messages: [...this.state.messages, message]
      })
      console.log('state after update ', this.state)
    })
    socket.on('private-message', (MessageTypeUser) => {
      const { message, type, user } = MessageTypeUser
      console.log('pm ', message)
    })
    const input = document.getElementById('chat-input')
    input.addEventListener('keypress', e => {
        const view = document.querySelector('.selectAudience').selectedIndex
        
        if(e.key === 'Enter'){
          console.log('Entered')
          // if(view !== 1){
            console.log('public message')

            socket.emit('student-public-message', {
              message: e.target.value,
              name: this.props.location.state.firstName,
            }) 
          
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

            <button type="button" className="classboardAddAssignment">
              Add
            </button>

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
            {
              this.state.messages.map((message, idx) => <p className={message.type + '-' + 'message'} className={message.person}>{message.message}</p>)
            }
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
    reduxState: state,
    socket: state.socket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassboard)
