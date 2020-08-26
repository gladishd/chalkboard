import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component
import {default as NewGroupFormComponent} from './newGroupFormComponent.js'
// import socket from '../store/socket.js'
import {newChat, newMessage} from '../Utils'
import moment from 'moment'
import {getSingleCourseThunk} from '../store/course.js'
import emit from '../../public/emit'
import dashboardEmit from './dashboardEmit'
import socketIOClient from 'socket.io-client'
import io from 'socket.io-client'

export class studentClassDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true
    }
    this.toggleForm = this.toggleForm.bind(this)
  }
  componentDidMount() {
    let path
    let courseId
    let first
    if (this.props.location) {
      // if we got there through a URL (when we're a student)
      path = this.props.location.pathname
      courseId = this.props.location.state.number
      // courseId = path.slice(path.length - 1)
    } else {
      courseId = this.props.courseIdInherited
    }
    if (this.props.location) {
      first = this.props.location.state.firstName
    } else {
      first = this.props.userInherited.firstName
    }

    // let courseId = path.slice(path.length - 1)

    let courseName
    if (this.props.location) {
      // if we're logged in as a student
      courseName = this.props.location.state.name
    } else {
      // if we're accessing it through the teacher classboard
      courseName = this.props.courseObjectInherited.courseName
    }
    this.props.getCourse(courseId)
    let socket = io()
    // if (this.props.location) {
    //   socket = io(`/${this.props.location.state.number}`)
    // } else {
    //   socket = io(`/${this.props.courseObjectInherited.id}`) // opening a socket on the course ID
    // }
    
    socket.emit('class', 'red')

    const input = document.getElementById('chat-input')

    // I just commented these lines out so that I could render from the teacher's perspective

    // socket.emit('login', {name: first, type: 'Student'})
    socket.emit('login', {name: first, type: first})

    let firstNameForSocket // not const
    if (this.props.location) {
      // if we're actually viewing the component through the URL, which is what we do as a student
      firstNameForSocket = this.props.location.state.firstName
    } else {
      // otherwise, if we're rendering it within the teacher classboard component
      firstNameForSocket = this.props.userInherited.firstName // might also want last name in the future
    }

    input.addEventListener('keypress', e => {
      const view = document.querySelector('.selectAudience').selectedIndex
      if (e.key === 'Enter') {
        if(view === 1){
          socket.emit('teacher-chat', {
            message: e.target.value,
            firstName: this.props.location.state.firstName
          })
          e.target.value = ''
        } else {
          socket.emit('message', {
            message: e.target.value,
            firstName: this.props.location.state.firstName,
            type: 'student'
          })
          e.target.value = ''
        }
      }
    })
    socket.on('myMessage', message => {
      console.log('in my')
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.innerHTML = message
      box.appendChild(mes)
    })
    socket.on('theirMessage', message => {
      console.log('in their')
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
      mes.innerHTML = `${message}`
      box.appendChild(mes)
    })
  }
  // sendMessage(message){
  //   const input = document.getElementById('chat-input')
  //   socket.emit()
  // }

  toggleForm(e) {
    e.preventDefault()
    let {showForm} = this.state
    this.setState({
      showForm: !showForm
    })
  }
  render() {
    // console.log('state course number ', this.props.location.state.number)
    // console.log('state course name ', this.props.location.state.name)
    // console.log('state course first ', this.props.location.state.firstName)
    console.log('On studentClassDashboard.js, the props are ', this.props)
    let courseIntro = []
    let courseDetails = []
    if (
      this.props.course.courseIntro &&
      this.props.course.courseMoreInformation
    ) {
      courseIntro = this.props.course.courseIntro.split('\n')
      courseDetails = this.props.course.courseMoreInformation.split('\n')
    }

    return (
      <div className="studentClassDashboard">
        <div>Local Time: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
        <div className="classTitle">
          {/* Welcome to {this.props.reduxState.courses.courseName} */}
          {/* Welcome to {this.props.location.state.name}! */}
        </div>
        <div className="introductionToTheCourse">
          {courseIntro.map((element, index) => {
            return <div key={index}>{element}</div>
          })}
        </div>
        <div className="liveLecture">
          Live Lecture
          {this.props.accountType === 'teacher' ? (
            <div>
              <button>Record</button>
              <button>Poll (survey)</button>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="liveChat">
          <button className="chatButtonCreate" onClick={this.toggleForm}>
            Create a New Group
          </button>
          <div>
          <p>Select Audience</p>
          </div>
          <select
            name="group"
            className="selectAudience"
            onChange={this.handleChange}
          >
            
            <option value='All'>All</option>
            <option value="Teacher">Teacher</option>
          </select>
          <br />
          Say something nice..
          <div id="message-main">
            <div id="chat-messages" />
            <input id="chat-input" type="text" overflow="auto" />
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
        <div className="moreClassInformationComponent">
          {this.props.course.courseMoreInformation ? (
            <MoreClassInformationComponent text={courseDetails} />
          ) : (
            <div>Course Information Not Available</div>
          )}
        </div>
        {this.state.showForm ? (
          <div className="newGroupFormComponent">
            <NewGroupFormComponent />
          </div>
        ) : (
          <div />
        )}

        {/* <div id='student-chat'>                 // STUDENT CHAT
          <ul id='student-messages'>

          </ul>
          <input id='student-chat-space' type='text'></input>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    course: state.course.single,
    accountType: state.user.me.accountType,
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getCourse: id => {
      dispatch(getSingleCourseThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  studentClassDashboard
)
