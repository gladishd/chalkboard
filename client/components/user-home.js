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

  const {email, credential, id} = props.person
  console.log('filtered props ', id)
  const socket = openSocket(`http://localhost:8080/`)
  socket.emit('login', email)

  console.log('cred ', credential)
  return (
  credential === 'Student' ? <StudentDashboard props={email, credential, id}/>: (
    <TeacherDashboard props={email, credential, id}/>
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
