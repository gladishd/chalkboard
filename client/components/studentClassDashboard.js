import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component
import {default as NewGroupFormComponent} from './newGroupFormComponent.js'
// import socket from '../store/socket.js'
import {newChat, newMessage} from '../Utils'
import moment from 'moment'
import {getCourseThunk} from '../store/courses.js'
import emit from '../../public/emit'
import dashboardEmit from './dashboardEmit'
import socketIOClient from "socket.io-client";
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
    
    let path = this.props.location.pathname
    let courseId = path.slice(path.length - 1)
    this.props.getCourse(courseId)
    const socket = io()
    const input = document.getElementById('chat-input')
    // const input = document.getElementById('chat-input')
    input.addEventListener('keypress', (e) => {
      if(e.key === 'Enter'){
        socket.emit('message', e.target.value)
        e.target.value = ''
      }
    })
    socket.on('myMessage', (message) => {
      const box = document.getElementById('chat-messages')
      const mes = document.createElement('p')
      mes.innerHTML = message
      box.appendChild(mes)
    })
    socket.on('theirMessage', (message) => {
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
      this.props.reduxState.courses.courseIntro &&
      this.props.reduxState.courses.courseMoreInformation
    ) {
      courseIntro = this.props.reduxState.courses.courseIntro.split('newline')
      courseDetails = this.props.reduxState.courses.courseMoreInformation.split(
        'newline'
      )
    }
    
    
    return (
      <div className="studentClassDashboard">
        <div>Local Time: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
        <div className="classTitle">
          Welcome to {this.props.reduxState.courses.courseName}
          !
        </div>
        <div className="introductionToTheCourse">
          {courseIntro.map(element => {
            return <div>{element}</div>
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
            <option value="" selected>
              Select an Audience
            </option>
            <option value="Dean">Dean</option>
            <option value="Khuong">Khuong</option>
            <option value="Zach">Zach</option>
            <option value="Jonathan">Jonathan</option>
          </select>
          <br />
          Say something nice..
          <div id='message-main'>
          <div id='chat-messages'></div>
          <input id='chat-input' type='text' overflow='auto'/>
          </div>
        </div>
        <div className="moreClassInformationComponent">
          {this.props.reduxState.courses.courseMoreInformation ? (
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
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getCourse: id => {
      dispatch(getCourseThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  studentClassDashboard
)
