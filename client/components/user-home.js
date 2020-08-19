import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import socket from '../store/socket'
import openSocket from 'socket.io-client';
/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log('user props ', props)
  const {email} = props
  const socket = openSocket(`http://localhost:8080/`)
  socket.emit('login', email)

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
