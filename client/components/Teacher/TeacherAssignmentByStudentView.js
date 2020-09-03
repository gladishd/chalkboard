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

  async componentDidMount() {
    await this.props.getUserGradebook(this.state.student)
    await this.props.getAssignmentsForCourse(this.props.courseIdInherited)
    await this.props.getSubmissions(this.props.courseIdInherited)
  }

  // componentWillMount() {
  //   try {
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  
  
  render() {

    const submissions = this.props.reduxState.submission.submissions || []
    console.log('new submissions ', this.props)
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
  //   const blobToImage = (blob) => {
  //     return new Promise(resolve => {
  //       const url = window.URL.createObjectURL(blob)
  //       let img = new Image()
  //       img.onload = () => {
  //         URL.revokeObjectURL(url)
  //         resolve(img)
  //       }
  //       img.src = url
  //     })
  //   // }
  // const afterpic = blobToImage(submissions[0])
  // console.log('afterpic ', afterpic)
//   function convert(buffer) { 

//     const bytes = new Uint8Array(buffer);
//     btoa(bytes)
//    console.log('btoa ', btoa(bytes))
//     return 'data:image/png;base64,'+btoa(bytes);
// }
// if(submissions.length){
  
//   convert(submissions[0].image.data)
//   console.log('sub ',submissions)
//   console.log('0', submissions[0].image.data)

// }
    const images = this.props.reduxState.submission.submissions
    console.log('image var ', images)
    return (
      
      <div className="assignmentsByStudent">
        {/* {submissions.length && <img src={convert(submissions[0].image.data)}/>}  */}
      
        <div className="student">
          Students
          <hr />
          {listStudents.map((student) => {
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
        {(images) ? <img src={images[0].image} width='140' height='2000'/> : null}
        {gradebookFilteredForClass.map((assignment) => {
          return (

            <div key={assignment.id}>

              
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
