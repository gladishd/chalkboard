import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class moreClassInformationComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    //this binding
  }

  componentDidMount() {}

  render() {
    return (
      <div className="localClassInformation">
        <div className="moreClassInformationTitle">The Solow Growth Model</div>

        <div>
          What you can expect from me: I'll always be on time, prepared and
          available for office hours, and I will be fair.
        </div>
        <div>
          What I expect from you: When assigned to a group project, work
          cooperatively.
        </div>
        <div>Grading will be done on the following scale:</div>
        <div>
          Rubric: (A) Attends class regularly and contributes, (B), attends
          class and sometimes analyzes relevant issues, (C) attends class
          regularly but almost never contributes, (D/R) attends class regularly
          but never contributes.
        </div>

        <div>
          Assignment description: This is just a short intro to the Solow model
          of economic growth and how it relates to our modern conception of
          money as a form of fiat currency as well as the departure from
          traditional neoclassical economics.
        </div>
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
)(moreClassInformationComponent)
