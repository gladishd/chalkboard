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
    // await this.props.getUserGradebook(this.state.student)
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
    console.log('need students for filter ', listStudents)
    let allAssignments = this.props.reduxState.assignment.assignments || []
    console.log('looking for assignment name ', allAssignments)
    console.log('connect assignment to assignment id ', this.state.assignment)
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

    const images = this.props.reduxState.submission.submissions
    console.log('image var ', images)
    return (
      
      <div className="assignmentsByStudent">
        {/* {submissions.length && <img src={convert(submissions[0].image.data)}/>}  */}
      
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

                <option key={assignment.id} value={assignment.assignmentName}>
                  {assignment.assignmentName}
                </option>
              )
            })}
            <option value="all">All Assignments</option>
          </select>
        </div>
        {/* <img src={images[0].image} width='140' height='2000'/>  */}
        <div>
        {(images) ? 
          images.filter((img) => {
            console.log('studentImg ', Number(img.studentId))
            console.log('state student ', this.state.student)

            if(this.state.student === 'all'){
              return true
            }
            if(Number(img.studentId) === Number(this.state.student)){
              return true
            }
            return false
          }).filter((img) => {
            console.log('second filter imgName ', img.assignmentName)
            console.log('state assiName ', this.state.assignment)
            if(this.state.assignment === 'all'){
              return true
            }
            if(img.assignmentName === this.state.assignment){
              console.log('success ', img)
              return true
            }
            return false
          }).map((img) => {
            const person = listStudents.filter((student) => {
              if(Number(student.id) === Number(img.studentId)){
                return true
              }
              return false
            })[0]
            console.log('person? ', person[0])
          return (
<<<<<<< HEAD
            <div className="student-submissions">
              <div className='student-submission'>
                <h4>{person.firstName} {person.lastName}</h4>
                <img src={img.image}/>
=======
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
>>>>>>> fa1eb7091b50672439e37497a88eef3b0d46ff67
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
