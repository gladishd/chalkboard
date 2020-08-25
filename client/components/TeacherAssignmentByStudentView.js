import React, {Component} from 'react'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'

export class TeacherAssignmentByStudentView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    try {
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="assignmentsByStudent">
        <div className="student">Students</div>
        <div className="newStudent">New Student</div>
        <div className="dropDown">Dropdown for all/Specific</div>
        Assignment Assignment A
        <div className="studentAssignmentBoxes">
          <div className="checkbox">Points</div>
          <div className="checkbox">Total</div>
          <div className="checkbox">Percent</div>
          <div className="checkbox">Grade</div>
        </div>
        Attendance Day XX/XX/XX
        <div className="studentAttendanceBoxes">
          <div className="checkbox">Present</div>
          <div className="checkbox">Absent</div>
          <div className="checkbox">Tardy</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getAssignmentsForCourse: (courseId) => dispatch(getAssignmentsByCourseIdThunk(courseId))
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TeacherAssignmentByStudentView
)
