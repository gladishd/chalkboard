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
        {this.props.text.map((element, index) => {
          return <div key={index}>{element}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
  moreClassInformationComponent
)
