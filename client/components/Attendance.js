import React, {Component} from 'react'
import {roster} from '../Utils'
// let's just pass down all the students for this current course
// from props
import moment from 'moment'
// we want to submit the attendance from state to the attendance table on the database
import {
  takeAttendanceThunk,
  getAllAttendanceByCourseThunk,
  getAllUsersThunk
} from '../store/user.js'
import {connect} from 'react-redux' // need this to map state to props

export class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendanceArray: [],
      showPastAttendance: false,
      onlineStudents: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePastAttendance = this.togglePastAttendance.bind(this)
  }

  togglePastAttendance(e) {
    e.preventDefault()
    this.setState({
      showPastAttendance: !this.state.showPastAttendance
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    let currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

    this.props.studentsForThisCourseInherited.forEach(student => {
      let currentAttendanceArray = this.state.attendanceArray
      let present = document.getElementById(student.id + 'present')
      let absent = document.getElementById(student.id + 'absent')
      let tardy = document.getElementById(student.id + 'tardy')

      let value
      if (present.checked) {
        value = 'present'
      } else if (tardy.checked) {
        value = 'tardy'
      } else if (absent.checked) {
        value = 'absent'
      } else {
        value = 'an error occurred'
      }

      currentAttendanceArray.push({
        studentId: student.id,
        status: value,
        currentDate: currentDate,
        courseId: this.props.courseIdInherited
      })

      this.setState({
        attendanceArray: currentAttendanceArray
      }) // this will just be something which makes the component re-render.
      // what we want to do is actually make an axios request using the thunk we imported
      //{ studentId: 5, status: 'present', currentDate: '2020-08-26T13:23:27-05:00' }
    })

    this.state.attendanceArray.forEach(attendanceRow => {
      this.props.takeAttendance(attendanceRow)
    })

    // this.props.getAllAttendanceForThisCourse(this.props.courseIdInherited) // so the show past attendance button/data is updated without having to refresh the page
  }
  componentDidMount() {
    const socket = this.props.reduxState.socket
    const courseId = this.props.reduxState.course.single.id
    setInterval(function(){socket.emit('attendance', (courseId))}, 3000);
    socket.on('roll', (student) => {
      console.log('student in')
      this.setState({
        ...this.state,
        onlineStudents: [...this.state.onlineStudents, student]
      })
    })
    // socket.on('roster', memory => {
    //   console.log('hello memory ', memory)
    //   roster(memory)
    // })
    const list = document.getElementById('attendance-list')
    const check = document.getElementById('test')
    const yes = document.querySelectorAll('.student')
    console.log('arr', Array.from(yes))

    this.props.getAllAttendanceForThisCourse(courseId)
  }
  render() {
    console.log('the student are ', this.state.onlineStudents)
    let pastAttendanceList = this.props.reduxState.user.pastAttendance
    let studentsInCourse = this.props.studentsForThisCourseInherited
    const students = this.state.onlineStudents || []
    return (
      <div className="attendanceComponent">
        <h1>Attendance</h1>
        <h3 id='online'>Students Online:</h3>
        {/* So for now this is just going to be all students */}
        {
          students.map((student) => {
          return (
          <div>
          <p className="online-student">{student.name} {student.time}</p>
          </div>
          ) 
        })}
        {/* <h1>{students[0].name || 'hello'}</h1> */}
        <ul id="attendance-list" />
        <h3>Class Roster</h3>

        <form onSubmit={this.handleSubmit} className="attendanceForm">
          Present Absent Tardy
          {this.props.studentsForThisCourseInherited.map(student => {
            return (
              <div>
                <div
                  id={student.id}
                  key={student.id}
                  className="attendanceFormOptions"
                >
                  <input
                    type="radio"
                    id={student.id + 'present'}
                    name={student.firstName + ' ' + student.lastName}
                    value="present"
                  />
                  <label for="contactChoice1">&nbsp;&nbsp;&nbsp;</label>

                  <input
                    type="radio"
                    id={student.id + 'absent'}
                    name={student.firstName + ' ' + student.lastName}
                    value="absent"
                  />
                  <label for="contactChoice2">&nbsp;&nbsp;&nbsp;</label>

                  <input
                    type="radio"
                    id={student.id + 'tardy'}
                    name={student.firstName + ' ' + student.lastName}
                    value="tardy"
                  />
                  <label for="contactChoice3">&nbsp;&nbsp;&nbsp;</label>
                </div>
                <p>{student.firstName + ' ' + student.lastName}</p>
              </div>
            )
          })}
          <button id="submit-attendance">Submit</button>
        </form>

        <button onClick={this.togglePastAttendance}>Attendance History</button>

        {this.state.showPastAttendance ? (
          <div>
            Past Attendance:
            {pastAttendanceList.map(entry => {
              return (
                <div id={entry.id}>
                  <div>{entry.currentDate}</div>
                  <div>
                    {// converting student ids to student names
                    studentsInCourse.find(
                      student => student.id === entry.studentId
                    ).firstName +
                      ' ' +
                      studentsInCourse.find(
                        student => student.id === entry.studentId
                      ).lastName}
                  </div>
                  <div>{entry.status}</div>
                  <hr />
                </div>
              )
            })}
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state // simplest way to do it
  }
}

const mapDispatchToProps = dispatch => {
  return {
    takeAttendance: data => {
      dispatch(takeAttendanceThunk(data))
    },
    getAllAttendanceForThisCourse: courseId => {
      dispatch(getAllAttendanceByCourseThunk(courseId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance)
