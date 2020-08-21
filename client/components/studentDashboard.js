import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'

export class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    //this binding
  }

  componentDidMount() {
    console.log('welcome ', this.props)
    const socket = openSocket(`http://localhost:8080/`)
  }

  render() {
    return (
      <div>
        Currently Enrolled in:
        <div className="studentCourseList">
          <Link to="./studentClassDashboard">Biology (Professor Name)</Link>
          <br></br>
          <Link to="./studentClassDashboard">Chemistry (Professor Name)</Link>
          <br></br>
          <Link to="./studentClassDashboard">Economics (Professor Name)</Link>
        </div>
        Not Enrolled in:
        <div className="studentCourseList">
          <Link to="./studentClassDashboard">Physics</Link>
          <br></br>
          <Link to="./studentClassDashboard">Art History</Link>
        </div>
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

export default connect(null, null)(StudentDashboard)
