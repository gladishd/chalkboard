import React from 'react'
import {connect} from 'react-redux'
import {updateGradeThunk} from '../../store/assignment'

class AssignGrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.student.firstName + ' ' + this.props.student.lastName,
      status: this.props.student.gradebook.status,
      grade: this.props.student.gradebook.individualGrade
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const userId = this.props.studentId
    const assignmentId = this.props.assignmentId
    const status = this.state.status
    const grade = Number(this.state.grade)

    const payload = {userId, assignmentId, status, grade}
    console.log('something is being submitted', payload)
    this.props.updateGrade(payload)
  }

  render() {
    return (
      <div className="assignment-submission-form">
        <div className="assignment-submission-item">
          <div>Student Name: </div>
          <div> {this.state.name} </div>
        </div>

        <form
          className="assignment-submission-item"
          onSubmit={this.handleSubmit}
        >
          <div>
            <label>Status</label>
            <select
              onChange={this.handleChange}
              value={this.state.status}
              name="status"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
          </div>

          <div className="assignment-submission-item">
            <label>Grade</label>
            <input
              name="grade"
              type="number"
              defaultValue={this.state.grade || ''}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="assignment-submission-item">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateGrade: gradeInfo => {
      dispatch(updateGradeThunk(gradeInfo))
    }
  }
}

export default connect(null, mapDispatch)(AssignGrade)
