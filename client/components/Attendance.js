import React, {Component} from 'react'
import openSocket from 'socket.io-client'
import {roster} from '../Utils'
// let's just pass down all the students for this current course
// from props
import moment from 'moment'

export default class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendanceArray: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let currentDate = moment().format()

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

      currentAttendanceArray.push([student.id, value, currentDate])
      this.setState({
        attendanceArray: currentAttendanceArray
      })
    })

    console.log('the state is ', this.state)
  }
  componentDidMount() {
    // const group = props.classId
    const socket = openSocket(`http://localhost:8080/`)
    console.log('in mount')
    // const socket = io()
    socket.on('roster', memory => {
      console.log('hello memory ', memory)
      roster(memory)
    })
    const list = document.getElementById('attendance-list')
    const check = document.getElementById('test')
    const yes = document.querySelectorAll('.student')
    console.log('arr', Array.from(yes))
  }
  render() {
    return (
      <div>
        <h1>Attendance</h1>
        <h3>Students Online:</h3>
        {/* So for now this is just going to be all students */}
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
      </div>
    )
  }
}
