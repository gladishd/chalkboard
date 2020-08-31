import React, {Component} from 'react'
import {getUserCoursesThunk} from '../store/user'
import {connect} from 'react-redux'
import {getAssignmentsByCourseIdThunk} from '../store/assignment'
import moment from 'moment' // so we can format the due date

export class TeacherAssignmentView extends Component {
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
    let allAssignments = this.props.reduxState.assignment.assignments || []
    console.log('the value of allAssignments is ', allAssignments)
    console.log('the props on the TeacherAssignmentView are ', this.props)
    return (
      <div className="assignmentViewMainDiv">
        <div className="dropdownAssignment">
          Dropdown for assignment
          <select name="assignments" onChange={this.handleChange}>
            <option value="" defaultValue>
              Select an option
            </option>
            {this.props.reduxState.assignment.assignments.map(element => {
              return (
                <option key={element.id} value={element.id}>
                  {element.assignmentName}
                </option>
              )
            })}
            <option value="all">Show All</option>
          </select>
        </div>

        <div>Assignments:</div>
        {allAssignments.length > 0 ? (
          allAssignments
            .filter(element => {
              if (this.state.selected === 'all') {
                return true
              } else {
                return element.id + '' === this.state.selected // to filter by the selected drop down menu value
              }
            })

            .map(element => {
              return (
                <div key={element.id} className="assignmentCheckBoxesSection">
                  {element.assignmentName}
                  <div className="assignmentCheckBoxes">
                    <div className="checkbox">
                      Due Date
                      <hr />
                      {moment(element.dueDate).format(
                        'dddd, MMMM Do YYYY, h:mm:ss a'
                      )}
                    </div>
                    <div className="checkbox">
                      Total Points
                      <hr />
                      {element.totalPoints}
                    </div>
                    <div className="checkbox">
                      Weight
                      <hr />
                      {element.weight}
                    </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherAssignmentView)
