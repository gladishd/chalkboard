import React from 'react'
import {connect} from 'react-redux'

class UpdateAssignment extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  render() {
    return <div>{this.props.assignmentId}</div>
  }
}

export default connect(null, null)(UpdateAssignment)
