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
    console.log('the props are ', this.props)
    this.props.getCourse(courseId)
    //temp nsp
    const socket = io('/3')
    // const socket = io(`/${this.props.location.state.number}`)
    console.log('client socket nsp ', socket.nsp)
    const input = document.getElementById('chat-input')

    // I just commented these lines out so that I could render from the teacher's perspective

    // socket.emit('login', {name: first, type: 'Student'})
    socket.emit('login', {name: first, type: 'student'})
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
      mes.innerHTML = `${messsage}`
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
    console.log('the props are ', this.props)
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
        <div className="liveLecture">Live Lecture</div>
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
    accountType: state.user.me.accountType
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
