import React from 'react'
import {connect} from 'react-redux'

//info given this.prams.params.id
const defaultState = {
  assignmentName: '',
  dueDate: '',
  totalPoints: '',
  dueTime: '',
  weight: ''
}

class AssignmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const courseId = this.props.match.params.courseId
    const date = new Date(this.state.dueDate + ' ' + this.state.dueTime)

    console.log('something is being submitted', {...this.state, courseId, date})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Assignment name</label>
          <input
            name="assignmentName"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>

        <div>
          <label>Total Points</label>
          <input
            name="totalPoints"
            type="number"
            min="0"
            onChange={this.handleChange}
            value={this.state.totalPoints}
          />
        </div>

        <div>
          <label>Weight</label>
          <input
            name="weight"
            type="number"
            min="1"
            onChange={this.handleChange}
            value={this.state.weight}
          />
        </div>

        <div>
          <label>Due Date</label>
          <input
            name="dueDate"
            type="date"
            onChange={this.handleChange}
            value={this.state.dueDate}
          />
        </div>
        <div>
          <label>Due Time</label>
          <input
            name="dueTime"
            type="time"
            onChange={this.handleChange}
            value={this.state.dueTime}
          />
        </div>

        <button type="submit"> Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    // getAllAttendanceForThisCourse: courseId => {
    //   dispatch(getAllAttendanceByCourseThunk(courseId))
    // }
  }
}

export default connect(null, mapDispatch)(AssignmentForm)
