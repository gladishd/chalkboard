import React from 'react'
import {connect} from 'react-redux'
import {getAllStudentsThunk} from '../../store/assignment'
import {AssignGrade} from '.'

class UpdateAssignment extends React.Component {
  componentDidMount() {
    this.props.setStudents(this.props.assignmentId)
  }

  render() {
    console.log(
      'all the students within the showstudents component',
      this.props.students
    )
    return (
      <div className="attendanceComponent">
        {this.props.students.length ? (
          this.props.students.map(student => (
            <div key={student.id}>
              <AssignGrade
                student={student}
                assignmentId={this.props.assignmentId}
                studentId={student.id}
              />
            </div>
          ))
        ) : (
          <div className="not-found">
            {' '}
            Assignment is not currently assigned to anyone{' '}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  students: state.assignment.students
})

const mapDispatch = dispatch => {
  return {
    setStudents: assignmentId => {
      dispatch(getAllStudentsThunk(assignmentId))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateAssignment)
