import React, {Component} from 'react'

export default class TeacherClassboard extends Component {
  render() {
    return (
      <div className="teacherClassBoard">
        <div className="classboardList">
          List of Students + Assignments + Grades
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
            <div className="classboardAttendance">Today's Attendance</div>

            <div className="classboardAssignments">Assignments</div>
            <button className="classboardAddAssignment">Add</button>

            <div className="classboardStudent">Student</div>
            <button className="classboardAddStudent">Add</button>
          </div>
        </div>
      </div>
    )
  }
}
