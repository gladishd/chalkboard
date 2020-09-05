import React, {Component} from 'react'
import {getUserGradebookThunk} from '../../store/user'
import {connect} from 'react-redux'
import {getAssignmentsByCourseIdThunk} from '../../store/assignment'
import moment from 'moment' // so we can format the due date

export class TeacherAssignmentByStudentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student: '',
      assignment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeAssignments = this.handleChangeAssignments.bind(this)
  }

  handleChange(e) {
    this.setState({
      student: e.target.value
    })
    if (e.target.value !== 'all') {
      this.props.getUserGradebook(e.target.value)
    }
  }

  handleChangeAssignments(e) {
    this.setState({
      assignment: e.target.value
    })
  }

  componentDidMount() {
    this.props.getUserGradebook(this.state.student)
    this.props.getAssignmentsForCourse(this.props.courseIdInherited)
  }

  // componentWillMount() {
  //   try {
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  render() {
    let listStudents = this.props.studentsForThisCourseInherited
    let allAssignments = this.props.reduxState.assignment.assignments || []

    let selectedStudentGradebook = this.props.reduxState.user.gradebook || []

    // extract assignment Ids from the list of all assignments for this course
    let assignmentIds = []
    allAssignments.map(element => {
      assignmentIds.push(element.id)
    })

    let gradebookFilteredForClass = selectedStudentGradebook.filter(element => {
      return assignmentIds.includes(element.assignmentId)
    })

    // want to take the assignment id, and use it to find data about that assignment:
    gradebookFilteredForClass.map((elementGradebook, index) => {
      let singleAssignment = allAssignments.filter(element => {
        return element.id === elementGradebook.assignmentId
      })
      gradebookFilteredForClass[index].assignmentDataObject = singleAssignment
    })

    if (this.state.assignment) {
      // if we also want to filter by assignment
      gradebookFilteredForClass = gradebookFilteredForClass.filter(element => {
        return element.assignmentId === Number(this.state.assignment)
      })
    }

    return (
      <div className="assignmentsByStudent">
        <div className="student">
          Students
          <hr />
          {listStudents.map(student => {
            return (
              <div key={student.id}>
                {[student.firstName, student.lastName, student.email].join(' ')}
              </div>
            )
          })}
        </div>
        <div className="dropDown">
          <select name="students" onChange={this.handleChange}>
            <option value="" defaultValue>
              Select a student
            </option>
            {listStudents.map(student => {
              return (
                <option key={student.id} value={student.id}>
                  {[student.firstName, student.lastName].join(' ')}
                </option>
              )
            })}
            {/* <option value="all">Show All</option> */}
          </select>

          <select name="assignments" onChange={this.handleChangeAssignments}>
            <option value="" defaultValue>
              Select an assignment
            </option>
            {allAssignments.map(assignment => {
              return (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.assignmentName}
                </option>
              )
            })}
            <option value="">All Assignments</option>
          </select>
        </div>

        {gradebookFilteredForClass.map(assignment => {
          return (
            <div key={assignment.id}>
              <div className="studentAssignmentBoxes">
                <div className="checkbox">
                  Assignment Name
                  <hr />
                  {assignment.assignmentDataObject[0].assignmentName +
                    ' ' +
                    assignment.assignmentDataObject[0].assignmentType
                      .charAt(0)
                      .toUpperCase() +
                    assignment.assignmentDataObject[0].assignmentType.slice(1)}
                </div>
                <div className="checkbox">
                  Due Date
                  <hr />
                  {moment(assignment.assignmentDataObject[0].dueDate).format(
                    'dddd, MMMM Do YYYY, h:mm:ss a'
                  )}
                </div>
                <div className="checkbox">
                  Total Points
                  <hr />
                  {assignment.assignmentDataObject[0].totalPoints}
                </div>
                <div className="checkbox">
                  Weight
                  <hr />
                  {assignment.assignmentDataObject[0].weight}
                </div>
                <div className="checkbox">
                  Submission
                  <hr />
                  {assignment.status}
                </div>
                <div className="checkbox">
                  Individual Grade
                  <hr />
                  {assignment.individualGrade
                    ? assignment.individualGrade
                    : 'N/A'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentsForCourse: courseId =>
      dispatch(getAssignmentsByCourseIdThunk(courseId)),
    getUserGradebook: userId => dispatch(getUserGradebookThunk(userId))
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherAssignmentByStudentView)
