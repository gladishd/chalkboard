import React, { Component } from 'react'
import {setCourse, courseSet} from '../store/course'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import openSocket from 'socket.io-client'

export class TeacherDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: null,
            size: null,
            roomId: null
        }
        this.createCourse = this.createCourse.bind(this)
    }
    createCourse(e){
        e.preventDefault()
        const course = {
            name: e.target.name.value,
            size: e.target.size.value,
            roomId: e.target.roomId.value,
            courseId: e.target.courseId.value
        }
        console.log('course ', course)
        this.props.setCourse(course)
    }
    componentDidMount(){
        console.log(' lower props ', this.props)
    }
    render() {
        return ( 
            <div>
                <h1>Hello</h1>
                <form onSubmit={this.createCourse}>
                    <h3>Create New Course</h3>
                    <p>Name</p>
                    <input type='text' name='name' />
                    <p>Size</p>
                    <input type='text' name='size'/>
                    <p>Room Id</p>
                    <input type='text' name='roomId'/>
                    <p>*Course Id*</p>
                    <input type='text' name='courseId'/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCourse: (course) => dispatch(courseSet(course))
    }
}

export default connect(null, mapDispatchToProps)(TeacherDashboard)


