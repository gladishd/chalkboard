import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {moreClassInformationComponent as MoreClassInformationComponent} from './moreClassInformationComponent.js' // need to change case to render the component

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
        <div className="classTitle">Welcome to Econ 201!</div>

        <div className="introductionToTheCourse">
          Introduction to the Course
          <br></br>
          1. Keynesian Theory
          <br></br>
          2. The Solow Growth Model
        </div>
        <div className="liveLecture">Live Lecture</div>
        <div className="liveChat">
          <button className="chatButtonCreate">Create a New Group</button>
          <button className="chatButtonSelectAudience">
            Select an Audience
          </button>
          <br></br>
          Say something nice..
        </div>
        <div className="moreClassInformationComponent">
          <MoreClassInformationComponent />
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
