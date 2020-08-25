import React, {Component} from 'react'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import {getAssignmentsByCourseIdThunk} from '../store/assignment'

export class TeacherAssignmentView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    try {
      //this.props.location.pathname.slice(path.length - 1)
      this.props.getAssignmentsForCourse(this.props.courseIdInherited)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('on the teacherassignmentview, the props are ', this.props)
    console.log('so the courses array is ', this.props.reduxState.user.courses)

    return (
      <div className="assignmentViewMainDiv">
        <div className="assignment">Assignment</div>
        <div className="newAssignment">New Assignment</div>
        <div className="dropdownAssignment">Dropdown for assignment</div>
        <div>Assignments:</div>
        {this.props.reduxState.assignment.assignments.length > 0 ? (
          this.props.reduxState.assignment.assignments.map(element => {
            return (
              <div>
                {element.assignmentName}
                <div className="assignmentCheckBoxes">
                  <div className="checkbox">Deadline</div>
                  <div className="checkbox">Points</div>
                  <div className="checkbox">Total</div>
                  <div className="checkbox">Percent</div>
                  <div className="checkbox">Grade</div>
                </div>
              </div>
            )
          })
        ) : (
          <div />
        )}
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
  TeacherAssignmentView
)
