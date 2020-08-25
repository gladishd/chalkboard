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
    this.props.getCourse(courseId)
    const socket = io(`/${this.props.location.state.number}`)
    const input = document.getElementById('chat-input')

    // socket.emit('login', {name: first, type: 'Student'})
    socket.emit('login', {name: first, type: first})
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        socket.emit('message', {
          message: e.target.value,
          firstName: this.props.location.state.firstName,
          type: 'Student'
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
    console.log('state course number ', this.props.location.state.number)
    console.log('state course name ', this.props.location.state.name)
    console.log('state course first ', this.props.location.state.firstName)
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
          Welcome to {this.props.location.state.name}!
        </div>
        <div className="introductionToTheCourse">
          {courseIntro.map((element, index) => {
            return <div key={index}>{element}</div>
          })}
        </div>
        <div className="liveLecture">Live Lecture</div>
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
    course: state.course.single
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
