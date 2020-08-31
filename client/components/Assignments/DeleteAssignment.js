import React from 'react'
import {connect} from 'react-redux'
import {removeAssignmentThunk} from '../../store/assignment'

class DeleteAssignmentButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(evt) {
    evt.preventDefault()
    this.props.deleteAssignment(this.props.assignmentId)
  }

  render() {
    return (
      <button type="button" onClick={this.handleDelete}>
        Delete
      </button>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteAssignment: assignmentId => {
      dispatch(removeAssignmentThunk(assignmentId))
    }
  }
}

export default connect(null, mapDispatch)(DeleteAssignmentButton)
