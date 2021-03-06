import React from 'react'
import {connect} from 'react-redux'
// import {createGroupThunk} from '../store/createGroup'
import {getAllUsersThunk, postGroupThunk} from '../store/user'
import {ToastContainer, toast} from 'react-toastify'

export class newGroupFormComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      groupName: '',
      selectedStudent: '',
      selectedTeacher: '',
      groupMembers: []
    }
    this.mapInputToState = this.mapInputToState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.selectStudent = this.selectStudent.bind(this)
    this.selectTeacher = this.selectTeacher.bind(this)
    this.addStudent = this.addStudent.bind(this)
    this.addTeacher = this.addTeacher.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  mapInputToState(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleReset(e) {
    e.preventDefault()
    this.setState({
      groupName: '',
      selectedStudent: '',
      selectedTeacher: '',
      groupMembers: []
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.postGroup({
      groupMembers: this.state.groupMembers,
      groupName: this.state.groupName
    })
    if (
      this.state.groupMembers &&
      this.state.groupName &&
      this.state.groupName[0] === this.state.groupName[0].toUpperCase()
    ) {
      toast('Success!')
    } else {
      toast('Need to fill out all fields!')
    }
  }

  selectStudent(e) {
    e.preventDefault()
    this.setState({selectedStudent: e.target.value})
  }

  selectTeacher(e) {
    e.preventDefault()
    this.setState({selectedTeacher: e.target.value})
  }

  addStudent(e) {
    e.preventDefault()
    let currentGroup = this.state.groupMembers
    currentGroup.push(this.state.selectedStudent + ' (Student)')
    this.setState({groupMembers: currentGroup})
  }

  addTeacher(e) {
    e.preventDefault()
    let currentGroup = this.state.groupMembers
    currentGroup.push(this.state.selectedTeacher + ' (Teacher)')
    this.setState({groupMembers: currentGroup})
  }

  render() {
    return (
      <div>
        <div className="localNewGroupForm">
          <div className="currentGroup">
            Currently in the group:
            {this.state.groupMembers.map(groupMember => {
              return <div>{groupMember}</div>
            })}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="groupName">
              <ToastContainer className="toastContainer" />
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
              onChange={this.selectStudent}
            >
              <option value="all">Show All</option>
              {this.props.studentsInCourse.map(element => {
                return (
                  <option
                    value={
                      '(' +
                      element.id +
                      ')' +
                      ' ' +
                      element.firstName +
                      ' ' +
                      element.lastName +
                      ' '
                    }
                    key={`Select${element.id}`}
                  >
                    {element.firstName + ' ' + element.lastName}
                  </option>
                )
              })}
            </select>

            <button
              type="button"
              onClick={this.addStudent}
              className="buttonAddStudentTeacher"
            >
              Add This Student
            </button>

            <br />

            <select
              name="group"
              className="selectGroupMembers"
              onChange={this.selectTeacher}
            >
              <option value="all">Show All</option>
              {this.props.teacherForCourse.map(element => {
                return (
                  <option
                    value={
                      '(' +
                      element.id +
                      ')' +
                      ' ' +
                      element.firstName +
                      ' ' +
                      element.lastName +
                      ' '
                    }
                    key={`Select${element.id}`}
                  >
                    {element.firstName + ' ' + element.lastName}
                  </option>
                )
              })}
            </select>

            <button
              type="button"
              onClick={this.addTeacher}
              className="buttonAddStudentTeacher"
            >
              Add This Teacher
            </button>
            <br />
            <button type="button" onClick={this.handleSubmit}>
              Submit!
            </button>
            <button type="button" onClick={this.handleReset}>
              Reset
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

const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     createGroup: data => {
//       dispatch(createGroupThunk(data))
//     }
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllUsers: () => {
      dispatch(getAllUsersThunk)
    },
    postGroup: groupData => {
      dispatch(postGroupThunk(groupData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(newGroupFormComponent)
