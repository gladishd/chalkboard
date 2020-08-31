import React from 'react'
import {connect} from 'react-redux'
import {addAssignmentThunk} from '../../store/assignment'

//info given this.prams.params.id
const defaultState = {
  assignmentName: '',
  date: '',
  totalPoints: '',
  time: '',
  weight: '',
  description: ''
}

class AssignmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...defaultState, assignmentType: 'homework'}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const dueDate = new Date(this.state.date + ' ' + this.state.time)

    const {
      weight,
      assignmentType,
      assignmentName,
      totalPoints,
      description
    } = this.state

    const payload = {
      courseId: this.props.courseId,
      dueDate,
      assignmentName,
      totalPoints: Number(totalPoints),
      weight: Number(weight),
      assignmentType,
      description
    }

    this.props.addAssignment(payload)
    console.log(this.setState)
    this.setState({...defaultState})
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
            value={this.state.assignmentName}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </div>

        <div>
          <label>Assignment Type</label>
          <select
            onChange={this.handleChange}
            value={this.state.assignmentType}
            name="assignmentType"
          >
            <option value="homework">Homework</option>
            <option value="project">Project</option>
            <option value="test">Test</option>
            <option value="classwork">Classwork</option>
            <option value="quiz">Quiz</option>
          </select>
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
            name="date"
            type="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
        </div>
        <div>
          <label>Due Time</label>
          <input
            name="time"
            type="time"
            onChange={this.handleChange}
            value={this.state.time}
          />
        </div>

        <button type="submit"> Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addAssignment: assignmentInfo => {
      dispatch(addAssignmentThunk(assignmentInfo))
    }
  }
}

export default connect(null, mapDispatch)(AssignmentForm)
