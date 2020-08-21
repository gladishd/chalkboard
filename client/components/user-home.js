import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import socket from '../store/socket'
import openSocket from 'socket.io-client';
import { StudentDashboard } from './StudentDashboard';
import { TeacherDashboard } from '.';
/**
 * COMPONENT
 */
export const UserHome = props => {

  const {email, id} = props.person
  console.log('filtered props ', props)
  const socket = openSocket(`http://localhost:8080/`)
  socket.emit('login', email)

  console.log('cred ', credential)
  return (
    //replace with accountType
  email === 'Student@gmail.com' ? <StudentDashboard props={email, id}/>: (
    <TeacherDashboard props={email, id}/>
  )
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    person: state.user,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
