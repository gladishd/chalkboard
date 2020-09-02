import React from 'react'
import {connect} from 'react-redux'
import {getAllStudentsThunk} from '../../store/assignment'

class UpdateAssignment extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  componentDidMount() {
    this.props.setStudents(this.props.assignmentId)
  }

  render() {
    console.log(
      'all the students within the showstudents component',
      this.props.students
    )
    return (
      <div>
        {this.props.students.length ? (
          this.props.students.map(student => (
            <div key={student.id}>
              <span>Name: {`${student.firstName} ${student.lastName} `} </span>
              <span>
                Status:{' '}
                {student.gradebook.completed ? 'Completed' : 'Incomplete'}{' '}
              </span>
              <span>
                Grade:{' '}
                {student.gradebook.individualGrade
                  ? student.gradebook.individualGrade
                  : 'N/A'}
              </span>
            </div>
          ))
        ) : (
          <div> Assignment is not currently assigned to anyone </div>
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
