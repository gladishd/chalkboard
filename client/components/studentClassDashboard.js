import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component
import {default as NewGroupFormComponent} from './newGroupFormComponent.js'
// import socket from '../store/socket.js'
import {newChat, newMessage} from '../Utils'
import moment from 'moment'
import course, {
  getSingleCourseThunk,
  getCourseStudentsThunk
} from '../store/course.js'
import {getAllUsersThunk, getAllGroupsThunk} from '../store/user'
import emit from '../../public/emit'
import dashboardEmit from './dashboardEmit'
import socketIOClient from 'socket.io-client'
import io from 'socket.io-client'
import JoinVideoButton from './Zoom/JoinVideoButton.js'
import setSocket from '../store/socket'
import {ToastContainer, toast} from 'react-toastify'

export class studentClassDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      socket: null,
      messages: []
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
  }

  async componentDidMount() {
    let course = this.props.location.state.number
    await this.props.getCourse(course)
    await this.props.getAllUsers()
    await this.props.getStudentsForCourse(course)
    await this.props.getAllGroups()

    let current_time = moment().format('HH:mm')
    const socket = this.props.socket

    socket.emit('login', {
      course,
      level: 'student',
      name: this.props.location.state.firstName
    })
    socket.on('attendance', () => {
      socket.emit('present', this.props.user.id)
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
    const input = document.getElementById('chat-input')
    input.addEventListener('keypress', e => {
      const view = document.querySelector('.selectAudience').selectedIndex

      if (e.key === 'Enter') {
        if (view === 1) {
          socket.emit('student-teacher-message', {
            message: e.target.value,
            name: this.props.location.state.firstName
          })
        } else {
          socket.emit('student-public-message', {
            message: e.target.value,
            name: this.props.location.state.firstName
          })
        }
        e.target.value = ''
      }
    })
  }
  sendMessage(message) {
    const input = document.getElementById('chat-input')
    socket.emit()
  }

  toggleForm(e) {
    e.preventDefault()
    let {showForm} = this.state
    this.setState({
      showForm: !showForm
    })
  }
  render() {
    let courseIntro = []
    let courseDetails = []
    if (
      this.props.course.courseIntro &&
      this.props.course.courseMoreInformation
    ) {
      courseIntro = this.props.course.courseIntro.split('\n')
      courseDetails = this.props.course.courseMoreInformation.split('\n')
    }
    const messages = this.state.messages || []

    // for the add group functionality
    let allUsers = this.props.allUsers
    let allStudents = allUsers.filter(user => {
      return user.accountType === 'student'
    })
    let allTeachers = allUsers.filter(user => {
      return user.accountType === 'teacher'
    })
    let teacherId = this.props.course.teacherId

    let studentsInCourse = this.props.studentsInCourse
    let teacherForCourse = allTeachers.filter(user => {
      return user.id === teacherId
    })

    return (
      <div className="studentClassDashboard">
        <div className="local-time">
          <div>Local Time: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>

          <div className="classTitle">{/* {`Welcome to ${courseName}`} */}</div>

          <div className="introductionToTheCourse drop-cap">
            {courseIntro.map((element, index) => {
              return <div key={index}>{element}</div>
            })}
          </div>
        </div>

        <JoinVideoButton />
        <div className="student-chat-components">
          <div className="liveChat">
            <button className="chatButtonCreate" onClick={this.toggleForm}>
              Create a New Group
            </button>
            <div>
              <p>Select Audience</p>
            </div>

            {/* <select
              name="group"
              className="selectAudience"
              onChange={this.handleChange}
            >
              <option value="all">Show All</option>
              {this.props.allGroups ? (
                this.props.allGroups.map(element => {
                  return (
                    <option
                      value={element.groupMembers}
                      key={`Select${element.id}`}
                    >
                      {element.groupName}
                    </option>
                  )
                })
              ) : (
                <div />
              )}
            </select> */}
            <select
              name="group"
              className="selectAudience"
              onChange={this.handleChange}
              >
              <option value="All">All</option>
              <option value="Teacher">Teacher</option>
              </select>
            <br />
            <div className="chat-input-prompt">
              <div>Say something nice...</div>
            </div>
            <div id="message-main">
              <div id="chat-messages">
                {messages.map((message, idx) => (
                  <p key={idx} className={message.css}>
                    {message.message}
                  </p>
                ))}
              </div>
              <input
                id="chat-input"
                className="student-chat-input"
                type="text"
                overflow="auto"
              />
              {this.props.accountType === 'teacher' ? (
                <div>
                  <button>MuteAll</button>
                  <button>Mute Specific</button>
                  <button>Remove Message</button>
                  <button>Cancel Chat for student</button>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          {this.state.showForm ? (
            <div className="newGroupFormComponent">
              <NewGroupFormComponent
                studentsInCourse={studentsInCourse}
                teacherForCourse={teacherForCourse}
              />
            </div>
          ) : (
            <p> </p>
          )}
        </div>

        <div className="moreClassInformationComponent">
          {this.props.course.courseMoreInformation ? (
            <div>
              <MoreClassInformationComponent text={courseDetails} />
            </div>
          ) : (
            <div>Course Information Not Available</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    course: state.course.single,
    user: state.user.me,
    accountType: state.user.me.accountType,
    socket: state.socket,
    allUsers: state.user.all,
    studentsInCourse: state.course.students,
    allGroups: state.user.allGroups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCourse: id => dispatch(getSingleCourseThunk(id)),
    setSocket: socket => dispatch(setSocket(socket)),
    getAllUsers: () => dispatch(getAllUsersThunk()),
    getStudentsForCourse: courseId =>
      dispatch(getCourseStudentsThunk(courseId)),
    getAllGroups: () => {
      dispatch(getAllGroupsThunk())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(studentClassDashboard)
