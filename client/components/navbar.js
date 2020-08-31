import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, accountType}) => (
  <div id="navbar-component">
    <h1>Chalkboard</h1>
    <nav>
      {isLoggedIn && accountType === 'admin' && (
        <div>
          <Link className="react-router-link" to="/home">
            Home
          </Link>
          <Link className="react-router-link" to="/studentDashboard">
            Student Dashboard
          </Link>
          <Link className="react-router-link" to="/TeacherDash">
            Teacher Dashboard
          </Link>
          <Link className="react-router-link" to="/teacherDashboard">
            Old Teacher Dashboard
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {isLoggedIn && accountType === 'teacher' && (
        <div>
          <Link className="react-router-link" to="/home">
            Home
          </Link>
          <Link className="react-router-link" to="/TeacherDash">
            Teacher Dashboard
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {isLoggedIn && accountType === 'student' && (
        <div>
          <Link className="react-router-link" to="/home">
            Home
          </Link>
          <Link className="react-router-link" to="/studentDashboard">
            Student Dashboard
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="react-router-link" to="/login">
            Login
          </Link>
          <Link className="react-router-link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.me.id,
    accountType: state.user.me.accountType
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
