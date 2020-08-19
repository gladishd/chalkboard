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
      <div>
        <div className="moreClassInformationTitle">The Solow Growth Model</div>

        <div>Expectations</div>
        <div>Grading</div>
        <div>Rubric</div>

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
