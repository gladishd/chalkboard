import React, {Component} from 'react'

export default class TeacherClassboard extends Component {
  render() {
      const identification = this.props.location.state.number
      const courseName = this.props.location.state.name
    return (
      <div className="teacherClassBoard">
        <div className="classboardList">
          {courseName}:  List of Students + Assignments + Grades
        </div>

        <div className="scheduleDashBox">
          <div className="classboardSchedule">
            Schedule:
            <br />
            M, W, F
            <br />
            10am-11am
            <br />
            T, Th
            <br />
            1:30pm-3:00pm
          </div>

          <div>
            <button className="classboardStartLecture">Start Lecture</button>

            <button className="classboardAttendance">Today's Attendance</button>

            <button className="classboardAssignments">Assignments</button>

            <button className="classboardAddAssignment">Add</button>

            <button className="classboardStudent">Student</button>

            <button className="classboardAddStudent">Add</button>
          </div>
        </div>
      </div>
    )
  }
}
