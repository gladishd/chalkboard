import React from 'react'
import {connect} from 'react-redux'
// import {createGroupThunk} from '../store/createGroup'
import {getAllUsersThunk} from '../store/user'

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
    // const {
    //   groupName
    // } = this.state
    // this.props.createGroup({ {/* this should come from props */}
    //   groupName
    // })
    console.log(
      'need to submit student group',
      e.target.value,
      this.state,
      this.props.reduxState.users
    )
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
              <option value="">Select an option</option>
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

            <br />
            <select
              name="group"
              className="selectGroupMembers"
              onChange={this.selectTeacher}
            >
              <option value="">Select an option</option>
              <option value="Dean">Dean</option>
              <option value="Khuong">Khuong</option>
              <option value="Zach">Zach</option>
              <option value="Jonathan">Jonathan</option>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  newGroupFormComponent
)
