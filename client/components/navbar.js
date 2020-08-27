import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, accountType}) => (
  <div>
    <h1>Chalkboard</h1>
    <nav>
      {isLoggedIn && accountType === 'admin' && (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/studentDashboard">Student Dashboard</Link>
          <Link to="/TeacherDash">Teacher Dashboard</Link>
          <Link to="/teacherDashboard">Old Teacher Dashboard</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {isLoggedIn && accountType === 'teacher' && (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/TeacherDash">Teacher Dashboard</Link>
          <Link to="/video">Video Room</Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {isLoggedIn && accountType === 'student' && (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/studentDashboard">Student Dashboard</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>

          {/* Testing purposes*/}
          <Link to="/video">Video Room</Link>

          {/* <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
    </nav>
    <hr />
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
