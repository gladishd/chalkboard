import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component
import {newGroupFormComponent as NewGroupFormComponent} from './newGroupFormComponent.js'
import socket from '../store/socket.js'
import {newChat, newMessage} from '../Utils'
export class studentClassDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this) // this binding
  }

  // componentDidMount() {                        // STUDENT CHAT
  //   const chat = document.getElementById('student-chat-space')
  //   chat.addEventListener('keypress', e => {
  //     newChat(e)
  //   })
  // }

  toggleForm(e) {
    e.preventDefault()
    let {showForm} = this.state
    this.setState({
      showForm: !showForm
    })
  }

  render() {
    return (
      <div className="studentClassDashboard">
        <div className="classTitle">Welcome to Econ 201!</div>
        <div className="introductionToTheCourse">
          Introduction to the Course
          <br></br>
          1. Keynesian Theory
          <br></br>
          2. The Solow Growth Model
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
          <br></br>
          Say something nice..
        </div>
        <div className="moreClassInformationComponent">
          <MoreClassInformationComponent />
        </div>

        {this.state.showForm ? (
          <div className="newGroupFormComponent">
            <NewGroupFormComponent />
          </div>
        ) : (
          <div></div>
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
    // currentCampus: state.singleCampus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(studentClassDashboard)
