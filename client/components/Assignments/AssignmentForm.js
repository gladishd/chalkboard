import React from 'react'

//info given this.prams.params.id
const defaultState = {
  assignmentName: '',
  courseId: '',
  dueDate: '',
  totalPoints: '',
  dueTime: ''
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
    const date = new Date(this.dueDate + 'T' + this.dueTime + ':00-18:00')
    console.log({date})
    console.log('something is being submitted', {...this.state, courseId})
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
            onChange={this.handleChange}
            value={this.state.totalPoints}
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

export default AssignmentForm
