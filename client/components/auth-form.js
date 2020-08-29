import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const [loginerror, setLoginerror] = React.useState(false)

  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e)
          setLoginerror(true)
        }}
        name={name}
      >
        <input type="hidden" value="prayer" />

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input type="text" name="email" id="auth-form-email" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input type="password" name="password" id="auth-form-password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
          {/* {loginerror ? (
            <span style={{color: 'red', fontWeight: 'bold'}}>
              The username and password don't match!
            </span>
          ) : (
            <div />
          )} */}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
