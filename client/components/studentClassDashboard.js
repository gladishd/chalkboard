import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class studentClassDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    //this binding
  }

  componentDidMount() {}

  render() {
    return (
      <div className="studentClassDashboard">
        Welcome to Econ 201!
        <div className="introductionToTheCourse">
          Introduction to the Course
          <br></br>
          1. Keynesian Theory
          <br></br>
          2. The Solow Growth Model
        </div>
        <div className="liveLecture">Live Lecture</div>
        <div className="liveChat">Say something nice..</div>
        <div className="moreClassInformationComponent">
          (More Class Information Component)
        </div>
        <div className="newGroupFormComponent">(New Group Form Component)</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // currentCampus: state.singleCampus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(studentClassDashboard)
