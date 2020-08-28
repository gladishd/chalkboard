import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component
import {default as NewGroupFormComponent} from './newGroupFormComponent.js'
// import socket from '../store/socket.js'
import {newChat, newMessage} from '../Utils'
import moment from 'moment'
import course, {getSingleCourseThunk} from '../store/course.js'
import emit from '../../public/emit'
import dashboardEmit from './dashboardEmit'
import socketIOClient from 'socket.io-client'
import io from 'socket.io-client'
import JoinVideoButton from './Zoom/JoinVideoButton.js'

export class studentClassDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true
    }
    this.toggleForm = this.toggleForm.bind(this)
  }
  async componentDidMount() {
    let courseId
    let first = this.props.user.firstName
    if (this.props.course.id) {
    } else if (this.props.location) {
      // if we got there through a URL (when we're a student)
      let path = this.props.location.pathname
      courseId = this.props.location.state.number
    } else {
      courseId = this.props.courseIdInherited
    }

    await this.props.getCourse(courseId)

    let course = this.props.course
    let courseName = course.courseName

    let socket
    if (this.props.location) {
      socket = io(`/${this.props.location.state.number}`)
    } else {
      socket = io(`/${this.props.courseObjectInherited.id}`) // opening a socket on the course ID
    }

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
      if (e.key === 'Enter') {
        socket.emit('message', {
          message: e.target.value,
          firstName: firstNameForSocket, // changed to a dynamic variable instead of checking this.props.state.location, which may
          type: 'Student' // or may not exist depending on how we render the component.
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
        <div>
          <div>Local Time: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>

          <div className="classTitle">{/* {`Welcome to ${courseName}`} */}</div>

          <div className="introductionToTheCourse">
            {courseIntro.map((element, index) => {
              return <div key={index}>{element}</div>
            })}
          </div>

          <div>
            <JoinVideoButton />
          </div>
        </div>

        <div className="liveChat">
          <button className="chatButtonCreate" onClick={this.toggleForm}>
            Create a New Group
          </button>
          <select
            name="group"
            className="selectAudience"
            onChange={this.handleChange}
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
            <div>
              <MoreClassInformationComponent text={courseDetails} />
            </div>
          ) : (
            <div>Course Information Not Available</div>
          )}
        </div>

        <div>
          {this.state.showForm ? (
            <div className="newGroupFormComponent">
              <NewGroupFormComponent />
            </div>
          ) : (
            <div />
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
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCourse: id => dispatch(getSingleCourseThunk(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(studentClassDashboard)
