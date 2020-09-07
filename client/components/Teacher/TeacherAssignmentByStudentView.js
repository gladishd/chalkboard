import React, {Component} from 'react'
import {getUserGradebookThunk} from '../../store/user'
import {connect} from 'react-redux'
import {getAssignmentsByCourseIdThunk} from '../../store/assignment'
import {getCourseSubmissions} from '../../store/submission'

import moment from 'moment' // so we can format the due date

export class TeacherAssignmentByStudentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student: '',
      assignment: '',
      course: ''
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

  async componentDidMount() {

    await this.props.getAssignmentsForCourse(this.props.courseIdInherited)
    await this.props.getSubmissions(this.props.courseIdInherited)
  }

  render() {
    const submissions = this.props.reduxState.submission.submissions || []

    let listStudents = this.props.studentsForThisCourseInherited


    let allAssignments = this.props.reduxState.assignment.assignments || []
 


 

    // extract assignment Ids from the list of all assignments for this course

    

    const images = this.props.reduxState.submission.submissions
  

    return (
      <div className="assignmentsByStudent attendanceComponent">
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
            <option value="all">Show All</option>
          </select>

          <select name="assignments" onChange={this.handleChangeAssignments}>
            <option value="" defaultValue>
              Select an assignment
            </option>
            {allAssignments.map(assignment => {
              
              return (
                <option key={assignment.id} value={assignment.name}>
                  {assignment.assignmentName}
                </option>
              )
            })}
            <option value="all">All Assignments</option>
          </select>
        </div>
        {/* <img src={images[0].image} width='140' height='2000'/>  */}
        <div>
          {images
            ? images
                .filter(img => {
                  if (this.state.student === 'all') {
                    return true
                  }

                  if (Number(img.studentId) === Number(this.state.student)) {
                    return true
                  }
                  return false
                })
                .filter(img2 => {
                  if (this.state.assignment === 'all') {
                    return true
                  }
                  if (String(img2.assignmentName) === String(this.state.assignment)) {
                    return true
                  }
                  return false
                })
                .map(img => {
                  const person = listStudents.filter(student => {
                    if (Number(student.id) === Number(img.studentId)) {
                      return true
                    }
                    return false
                  })[0]

                  return (
                    <div className="student-submissions">
                      <div className="student-submission">
                        <h4>
                          {person.firstName} {person.lastName}
                        </h4>
                        <img src={img.image} />
                      </div>
                    </div>
                  )
                })
            : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentsForCourse: courseId =>
      dispatch(getAssignmentsByCourseIdThunk(courseId)),
    getUserGradebook: userId => dispatch(getUserGradebookThunk(userId)),
    getSubmissions: courseId => dispatch(getCourseSubmissions(courseId))
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
