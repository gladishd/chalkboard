import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'
import {getAllCoursesThunk} from '../store/course.js'
import {getUserCoursesThunk} from '../store/user'
import {setSocket} from '../store/socket'
import {getStudentAssignments} from '../store/user'
import Submit from './Submit'

export class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coursesArray: [],
      selected: '',
      assignments: [],
      toggleAdd: false,
      focus: null
    }
    //this binding
    this.handleChange = this.handleChange.bind(this)
    this.showPanel = this.showPanel.bind(this)
  }
  async componentWillMount() {
    
  }
  async componentDidMount() {
    
    try {
      // const assignments = await axios.get('/api/users/user', {user: this.props.userId})
      await this.props.getMyCourses(this.props.userId)
      await this.props.myAssignments(this.props.userId)
      await this.props.getAllCourses()
      this.setState({
        coursesArray: this.props.courses,
        assignments: this.props.assignments.assignments

      })
    } catch (err) {
      console.log(err)
    }
  }
  handleChange(e) {
    e.preventDefault()
    let selectedValue = e.target.value
    this.setState({
      ...this.state,
      selected: selectedValue
    })
  }
  showPanel(e){
    e.preventDefault()
    let value = e.target.name
    console.log('pass down ', this.props.assignments)
    const correct = this.props.assignments.filter((a) => {
      console.log('as id', a.id, 'button id', value)
      return Number(a.id) === Number(value)
    })
    console.log('picked is ', correct)
    this.setState({
      ...this.state,
      focus: correct
    })
  }
  render() {
    // const assignments = this.props.assignments.assignments
    const assignments = this.props.assignments
    console.log('pass student', this.props)
    const courseList = this.props.courses || []
    const allCoursesList = this.props.allCourses || []
    const coursesToExclude = courseList.map(course => course.id)
    const notEnrolledList = allCoursesList.filter(element => {
      return !coursesToExclude.includes(element.id)
    })
    return (
        
      <div id='student-dashboard-container'>
        Currently Enrolled in:
        <div className="studentCourseList">
          {courseList.length > 0 && Object.keys(courseList[0].length > 0) ? (
            courseList.map((course, index) => {
              return (
                <div key={index}>
                  <Link
                    className="react-router-link"
                    to={{
                      pathname: './studentClassDashBoard',
                      state: {
                        number: course.id,
                        name: course.courseName,
                        firstName: this.props.firstName
                      }
                    }}
                  >
                    {course.courseName}
                  </Link>
                  <br />
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
        
     
        <div className='assignments'>
          <h3>Edit Assignments</h3>
          <select onChange={this.handleChange}>
            <option value='select'>Select</option>
          {this.props.courses.map(course => {
              return (
                <option value={course.id}>{course.courseName}</option>
              )
            })}
          </select>
          
          {assignments.length > 0 ? (
          assignments
            .filter(element => {
                

                // return Number(element.courseId) === Number(this.state.selected)
                return Number(element.courseId) === Number(this.state.selected)
               
            
            }).map(element => {
            return  (<div> 
                  <h1>{element.assignmentName}</h1>
                  <button name={element.id} type='button' onClick={this.showPanel}>View Assignment</button>
                  </div>)
            })
          ) :  <h1>Still Loading...</h1> 
          } 
        </div>
        <div id='submit-assignment'>
          {this.state.focus !== null ? (
            <div>
            <Submit user={{id:this.props.userId, firstName: this.props.firstName}}assignment={this.state.focus} />
            </div>
          ) : null
        
        }
        </div>
       
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    courses: state.user.courses,
    userId: state.user.me.id,
    firstName: state.user.me.firstName,
    allCourses: state.course.all,
    socket: state.socket,
    assignments: state.user.assignments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getSingleCampus: (id) => { dispatch(fetchSingleCampus(id)) },
    getAllCourses: () => {
      dispatch(getAllCoursesThunk())
    },
    getMyCourses: id => dispatch(getUserCoursesThunk(id)),
    newSocket: socket => dispatch(setSocket(socket)),
    myAssignments: id => dispatch(getStudentAssignments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
