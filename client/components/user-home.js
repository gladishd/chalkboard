import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import openSocket from 'socket.io-client'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, accountType} = props
  const socket = openSocket(`http://localhost:8080/`)
  socket.emit('login', email)

  return (
    <div>
      <h1>{`Welcome ${firstName} ${lastName}`}</h1>
      <h2>{`email: ${email}`}</h2>
      <h2>{`account type: ${accountType}`}</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.me.email,
    firstName: state.user.me.firstName,
    lastName: state.user.me.lastName,
    accountType: state.user.me.accountType
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
