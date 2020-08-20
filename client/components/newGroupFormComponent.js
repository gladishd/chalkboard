import React from 'react'
import {connect} from 'react-redux'
// import {createGroupThunk} from '../store/createGroup'

export class newGroupFormComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      groupName: ''
    }
    this.mapInputToState = this.mapInputToState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  mapInputToState(e) {
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault()
    // const {
    //   groupName
    // } = this.state
    // this.props.createGroup({ {/* this should come from props */}
    //   groupName
    // })
    console.log('need to submit student group')
  }

  render() {
    return (
      <div>
        <div className="localNewGroupForm">
          <div className="currentGroup">
            Currently in the group:
            {/* this could come from state */}
            <br></br>
            Zach Bryce
            <br></br>
            Khuong Le
            <br></br>
            Dean Gladish
            <br></br>
            Jonathan Arreola
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="groupName">
              {this.state.groupName !== '' &&
              this.state.groupName[0] !==
                this.state.groupName[0].toUpperCase() ? (
                <span className="validationText">
                  The group name needs to be capitalized!
                </span>
              ) : (
                <span />
              )}
            </label>
            <input
              name="groupName"
              className="groupNameInput"
              onChange={this.mapInputToState}
              placeholder="Type in a group name.."
            />
            <br />
            <select
              name="group"
              className="selectGroupMembers"
              onChange={this.handleChange}
            >
              <option value="" selected>
                Select an option
              </option>
              <option value="Dean">Dean</option>
              <option value="Khuong">Khuong</option>
              <option value="Zach">Zach</option>
              <option value="Jonathan">Jonathan</option>
            </select>
            <button
              type="button"
              onClick={this.addStudent}
              className="buttonAddStudentTeacher"
            >
              Add This Student
            </button>

            <br></br>
            <select
              name="group"
              className="selectGroupMembers"
              onChange={this.handleChange}
            >
              <option value="" selected>
                Select an option
              </option>
              <option value="Dean">Dean</option>
              <option value="Khuong">Khuong</option>
              <option value="Zach">Zach</option>
              <option value="Jonathan">Jonathan</option>
            </select>
            <button
              type="button"
              onClick={this.addStudent}
              className="buttonAddStudentTeacher"
            >
              Add This Teacher
            </button>
            <br></br>
            <button type="button" onClick={this.handleSubmit}>
              Submit!
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// need this so that we can only show the form if the person is logged in
// const mapStateToProps = state => {
//   return {
//     state: state
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     createGroup: data => {
//       dispatch(createGroupThunk(data))
//     }
//   }
// }

export default connect(null, null)(newGroupFormComponent)
