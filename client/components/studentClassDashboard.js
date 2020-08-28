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
      showForm: true,
      socket: null,
      messages: []
    }
    this.toggleForm = this.toggleForm.bind(this)
  }
  componentWillMount(){
    console.log('will mount check socket props ', this.props)
    console.log('after set state look socket ', this.state)
  }
  componentDidMount(){

    const socket = this.props.reduxState.socket
    
    socket.emit('course', this.props.location.state.number)

    socket.on('room-chat', (message) => {
      console.log(`From Russia ${message}`)
    })
    socket.on('message', (message) => {
      this.setState({
        ...this.state,
        messages: [...this.state.messages, message]
      })
      console.log('state after update ', this.state)
    })
    const input = document.getElementById('chat-input')
    input.addEventListener('keypress', e => {
        const view = document.querySelector('.selectAudience').selectedIndex

      if(e.key === 'Enter'){
        if(view !== 1){
          socket.emit('message', {
            message: e.target.value,
            firstName: this.props.location.state.firstName,
            type: 'student',
            dm: false
          }) 
        }else {
          socket.emit('message',{
            message: e.target.value,
            firstName: this.props.location.firstName,
            type: 'student',
            dm: true
          })
        }
        e.target.value = ''
      }
    })
  }
  sendMessage(message){
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
            {
              this.state.messages.map((message, idx) => <p key={idx}className={message.type} className={message.person}>{message.message}</p>)
            }
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
    reduxState: state,
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
