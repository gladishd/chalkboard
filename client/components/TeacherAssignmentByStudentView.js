import React, {Component} from 'react'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import {getAssignmentsByCourseIdThunk} from '../store/assignment'

export class TeacherAssignmentByStudentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let selectedValue = e.target.value
    this.setState({
      selected: selectedValue
    })
  }

  async componentWillMount() {
    try {
      this.props.getAssignmentsForCourse(this.props.courseIdInherited)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(
      'the props on the TeacherAssignmentByStudentView are ',
      this.props
    )
    console.log(
      'the state on the TeacherAssignmentByStudentView is ',
      this.state
    )
    let listStudents = this.props.studentsForThisCourseInherited
    let allAssignments = this.props.reduxState.assignment.assignments || []

    return (
      <div className="assignmentsByStudent">
        <div className="student">
          Students
          <hr />
          {listStudents.map(student => {
            return (
              <div>
                {[student.firstName, student.lastName, student.email].join(' ')}
              </div>
            )
          })}
        </div>
        <div className="dropDown">
          <select name="students" onChange={this.handleChange}>
            <option value="" selected>
              Select a student
            </option>
            {listStudents.map(student => {
              return (
                <option value={student.id}>
                  {[student.firstName, student.lastName].join(' ')}
                </option>
              )
            })}
            <option value="all">Show All</option>
          </select>

          <select name="assignments" onChange={this.handleChangeAssignments}>
            <option value="" selected>
              Select an assignment
            </option>
            {allAssignments.map(assignment => {
              return (
                <option value={assignment.id}>
                  {assignment.assignmentName}
                </option>
              )
            })}
            <option value="all">All Assignments</option>
          </select>
        </div>
        Assignment Assignment A
        <div className="studentAssignmentBoxes">
          <div className="checkbox">Points Earned</div>
          <div className="checkbox">Total Points Available</div>
          <div className="checkbox">Percent of Total Points</div>
          <div className="checkbox">Grade</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentsForCourse: courseId =>
      dispatch(getAssignmentsByCourseIdThunk(courseId))
  }
}
const mapStateToProps = state => {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TeacherAssignmentByStudentView
)
